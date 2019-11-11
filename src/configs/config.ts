export const config = {
    PORT: process.env.PORT || 3000,
    HOST: process.env.PORT || 'http://localhost',

    FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:4200',

    JWT_SECRET: process.env.PORT || 'uf7e^Wai8efj32-&&620O10fm-32jfdj',
    ACCESS_TOKEN_LIFETIME: process.env.ACCESS_TOKEN_LIFETIME || '10m',

    JWT_REFRESH_SECRET: process.env.PORT || '3f7e^fdf(*kjsd-&&620O10fm-333222fsd',
    REFRESH_TOKEN_LIFETIME: process.env.REFRESH_TOKEN_LIFETIME || '1h',

    JWT_CONFIRM_EMAIL_SECRET: process.env.JWT_CONFIRM_EMAIL_SECRET || 'dshfsfeh283r01912e021ijod[0sfe0fo',
    JWT_CONFIRM_EMAIL_LIFETIME: process.env.JWT_CONFIRM_EMAIL_LIFETIME || '24h',

    JWT_PASS_RESET_SECRET: process.env.JWT_PASS_RESET_SECRET || '4234234refsUh_683wr78',
    JWT_PASS_RESET_LIFETIME: process.env.JWT_PASS_RESET_LIFETIME || '24h',

    serverRateLimits: {
        period: 15 * 60 * 1000, // 15 minutes
        maxRequests: 10000
    },
    DB_NAME: process.env.DB_NAME || 'medical',
    DB_USER: process.env.DB_USER || 'user',
    DB_PASS: process.env.DB_PASS || 'user',
    DB_HOST: process.env.DB_HOST || 'localhost',

    ROOT_EMAIL_SERVICE: process.env.ROOT_EMAIL_SERVICE || 'gmail',
    ROOT_EMAIL: process.env.ROOT_EMAIL || 'EMAIL',
    ROOT_EMAIL_PASSWORD: process.env.ROOT_EMAIL_PASSWORD || 'PASSWORD'

};
