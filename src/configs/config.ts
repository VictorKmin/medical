export const config = {
    PORT: process.env.PORT || 3000,
    HOST: process.env.PORT || 'http://localhost',
    JWT_SECRET: process.env.PORT || 'uf7e^Wai8efj32-&&620O10fm-32jfdj',
    serverRateLimits: {
        period: 15 * 60 * 1000, // 15 minutes
        maxRequests: 10000
    },
    DB_NAME: process.env.DB_NAME || 'medical',
    DB_USER: process.env.DB_USER || 'user',
    DB_PASS: process.env.DB_PASS || 'user',
    DB_HOST: process.env.DB_HOST || 'localhost',
};
