// import 'dotenv/config';
import * as dotenv from 'dotenv';
import * as path from 'path';

// use .prod.env or .test.env depending on environment
const configKey = process.env.NODE_ENV === 'production'
    ? 'prod'
    : 'test';
const configFile = path.resolve(process.cwd(), `./.${configKey}.env`);
dotenv.config({ path: configFile});

// Port the server runs on
export const SERVER_PORT = 3000;

// API key for openweathermap api
export const WEATHER_APP_ID = process.env.WEATHER_APP_ID;
