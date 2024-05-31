import { config } from "dotenv";
config();

export const FIRE_BASE_API_KEY = process.env.FIRE_BASE_API_KEY;
export const FIRE_BASE_AUTH_DOMAIN = process.env.FIRE_BASE_AUTH_DOMAIN;
export const FIRE_BASE_PROJECT_ID = process.env.FIRE_BASE_PROJECT_ID;
export const FIRE_BASE_STORAGE_BUCKET = process.env.FIRE_BASE_STORAGE_BUCKET;
export const FIRE_BASE_MESSAGING_SENDER_ID =
  process.env.FIRE_BASE_MESSAGING_SENDER_ID;
export const FIRE_BASE_APP_ID = process.env.FIRE_BASE_APP_ID;
export const FIRE_BASE_MEASUREMENT_ID = process.env.FIRE_BASE_MEASUREMENT_ID;
export const PORT = process.env.SERVER_PORT;
export const HOST = process.env.SERVER_HOST;
export const SWAGGER_SERVER= process.env.SWAGGER_SERVER;
export const GOOGLE_CLIENT_ID= process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET= process.env.GOOGLE_CLIENT_SECRET;