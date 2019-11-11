import * as Joi from 'joi';

import { RegExpEnum } from '../constants';

export const emailValidator = Joi.object().keys({
    email: Joi.string().regex(RegExpEnum.email).required()
});
