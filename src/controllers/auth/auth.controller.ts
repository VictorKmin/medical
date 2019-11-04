import { Response } from 'express';

import { IRequestExtended } from '../../models';

class AuthController {

    loginUser(req: IRequestExtended, res: Response) {

        //TODO create tokens

        res.json({
            data: {}
        })
    }
}


export const authController = new AuthController();
