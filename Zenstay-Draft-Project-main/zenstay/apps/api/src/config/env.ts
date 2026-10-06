import dotenv from 'dotenv';
dotenv.config();

export const env = {
  PORT: process.env.PORT || 4000,
  JWT_SECRET: process.env.JWT_SECRET || 'dev-secret-key-change-in-prod',
  DATABASE_URL: process.env.DATABASE_URL,
  GUESTY_API_KEY: process.env.GUESTY_API_KEY || ''
};
