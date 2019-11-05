import { UserActionEnum } from '../constants';
import { IDictionary } from '../database';

interface IEmailTemplateItem {
    subject: string;
    templateFileName: string;
}

export const htmlTemplates: IDictionary<IEmailTemplateItem> = {
    [UserActionEnum.CONFIRM_EMAIL]: {
        subject: 'Confirm registration',
        templateFileName: 'confirmRegistration'
    },
    [UserActionEnum.RESET_PASS]: {
        subject: 'Reset password',
        templateFileName: 'resetPassword'
    },
    [UserActionEnum.SUCCESS_REG]: {
        subject: 'Success registration',
        templateFileName: 'successRegistration'
    },
    [UserActionEnum.ACCOUNT_BLOCKED]: {
        subject: 'Account was blocked',
        templateFileName: 'userAccountBlocked'
    },
    [UserActionEnum.ACCOUNT_UNBLOCKED]: {
        subject: 'Account was unblocked',
        templateFileName: 'userAccountUnblocked'
    }
};
