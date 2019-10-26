import { Request } from 'express-serve-static-core';

export interface IRequestExtended extends Request {
    user?: any;
    files?: any;
}
