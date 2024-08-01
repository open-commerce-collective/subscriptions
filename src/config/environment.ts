import dotenv from 'dotenv'

dotenv.config();

export const environment = {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    databaseUrl: process.env.DATABASE_URL,
    jwtSecret: process.env.JWT_SECRET,
    shopifyClientId: process.env.SHOPIFY_CLIENT_ID || '',
    shopifyClientSecret: process.env.SHOPIFY_CLIENT_SECRET || '',
    shopifyAppUrl: process.env.SHOPIFY_APP_URL || '',
    shopifyAuthCallbackUrl: process.env.SHOPIFY_AUTH_CALLBACK_URL || '',
    shopifyDomain: process.env.SHOPIFY_DOMAIN || ''
}
