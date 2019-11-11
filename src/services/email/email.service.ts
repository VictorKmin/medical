import * as EmailTemplates from 'email-templates';
import * as nodemailer from 'nodemailer';
import { resolve as resolvePath } from 'path';

import { config } from '../../configs';
import { ResponseStatusCodesEnum, UserActionEnum } from '../../constants';
import { htmlTemplates } from '../../email-templates';
import { ErrorHandler } from '../../errors';

export interface IMailContext {
    [key: string]: string | number;
}

if (
    !config.FRONTEND_URL
    || !config.ROOT_EMAIL_SERVICE
    || !config.ROOT_EMAIL
    || !config.ROOT_EMAIL_PASSWORD
) {
    throw Error('Root email credentials are not defined!');
}

const contextExtention: any = {
    frontendUrl: config.FRONTEND_URL
};

const transporter = nodemailer.createTransport({
    service: config.ROOT_EMAIL_SERVICE,
    auth: {
        user: config.ROOT_EMAIL,
        pass: config.ROOT_EMAIL_PASSWORD
    }
});

const emailTemplates = new EmailTemplates({
    message: null,
    views: {
        root: resolvePath(__dirname, '../../email-templates/')
    }
});

export class EmailService {
    async sendEmail(email_address: string, action: UserActionEnum, context: IMailContext = {}): Promise<any> {
        const templateInfo = htmlTemplates[action];

        Object.assign(context, contextExtention);

        if (!templateInfo) {
            throw new ErrorHandler(
                ResponseStatusCodesEnum.SERVER_ERROR,
                'Email template not found'
            );
        }

        const html = await emailTemplates.render(templateInfo.templateFileName, context);

        const mailOptions = {
            from: `Admin<${config.ROOT_EMAIL}>`,
            to: email_address,
            subject: templateInfo.subject,
            html
        };

        await transporter.sendMail(mailOptions);
    }
}

export const emailService = new EmailService();
