import * as Joi from '@hapi/joi';

// Definir variáveis de ambiente obrigatórias
// Irá gerar um erro caso alguma delas não esteja definida no .env
export const configValidationSchema = Joi.object({
    PORT: Joi.number().default(3000),
    STAGE: Joi.string().required(),
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().default(5432).required(),
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_DATABASE: Joi.string().required(),
    JWT_SECRET: Joi.string().required(),
});