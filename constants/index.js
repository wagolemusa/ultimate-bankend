import { config } from "dotenv";
config()

export const DB = process.env.APP_DB;
export const SECRECT = process.env.APP_SECRECT;
export const DOMAIN = process.env.APP_DOMIAN;
export const SENDGRID_API = process.env.APP_SENDGRID_API;
export const HOST_EMAIL = process.env.APP_HOST_EMAIL;
export const AFRICAN = process.env.AFRICAN_TALKING;
export const AFRICAN_USERNAME = process.env.AFRICAN_TALKING_USERNAME;
export const PORT  = process.env.PORT || process.env.APP_PORT;


