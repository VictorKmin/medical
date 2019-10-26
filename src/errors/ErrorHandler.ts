export class ErrorHandler extends Error {
    name = 'Controller Error';
    status: number;
    message: string;
    code?: number;
    data?: any;

    constructor(status: number, msg: string, code?: number, data?: any) {
        super(msg);
        this.message = msg;
        this.status = status;
        this.code = code;
        this.data = data;
        Error.captureStackTrace(this, this.constructor);
    }
}
