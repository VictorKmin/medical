import * as Joi from 'joi';

import { RegExpEnum } from '../constants';

export const userValidator = Joi.object().keys({
    name: Joi.string().max(255).required(),
    email: Joi.string().regex(RegExpEnum.email).required(),
    password: Joi.string().regex(RegExpEnum.password).required(),
    role_id: Joi.number().integer().min(1).required(),
    course: Joi.number().allow(null, ''),
    group_id: Joi.number().integer().min(1).allow('', null)
});
