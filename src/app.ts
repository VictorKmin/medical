import * as cors from 'cors';
import * as express from 'express';
import { NextFunction, Request, Response } from 'express';
import * as fileUpload from 'express-fileupload';
import * as RateLimit from 'express-rate-limit';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import { resolve as resolvePath } from 'path';

import { config } from './configs';
import { ResponseStatusCodesEnum } from './constants';
import { apiRouter, notFoundRouter, authRouter } from './routers';

const serverRequestLimiter = new RateLimit({
    windowMs: config.serverRateLimits.period,
    max: config.serverRateLimits.maxRequests
});

class App {
    public readonly app: express.Application = express();

    constructor() {
        (global as any).appRoot = resolvePath(__dirname, '../');

        this.app.use(fileUpload());
        this.app.use(morgan('dev'));
        this.app.use(helmet());
        this.app.set('jwtTokenSecret', config.JWT_SECRET);
        this.app.use(cors());
        this.app.use(serverRequestLimiter);
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(express.static(resolvePath((global as any).appRoot + '/public')));

        this.mountRoutes();

        this.app.use(this.logErrors);
        this.app.use(this.clientErrorHandler);
        this.app.use(this.customErrorHandler);
    }

    private mountRoutes(): void {
        this.app.use('/auth', authRouter);
        this.app.use('/api', apiRouter);
        this.app.use('*', notFoundRouter);
    }

    private logErrors(err: any, req: Request, res: Response, next: NextFunction): void {
        next(err);
    }

    private customErrorHandler(err: any, req: Request, res: Response, next: NextFunction): void {
        if (err.parent) {
            err.message = err.parent.sqlMessage;
        }

        res
            .status(err.status || ResponseStatusCodesEnum.SERVER_ERROR)
            .json({
                error: {
                    message: err.message || 'Unknown Error',
                    code: err.code,
                    data: err.data
                }
            });
    }

    private clientErrorHandler(err: any, req: Request, res: Response, next: NextFunction): void {
        if (req.xhr) {
            res
                .status(ResponseStatusCodesEnum.SERVER_ERROR)
                .send({
                    error: {
                        message: 'Request dependent error!',
                        code: err.code,
                        data: err.data
                    }
                });
        } else {
            next(err);
        }
    }
}

export const app = new App().app;
