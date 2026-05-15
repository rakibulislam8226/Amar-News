import 'reflect-metadata';
import dotenv from 'dotenv';

dotenv.config();

const REQUIRED_ENV_VARS = [
    'JWT_SECRET',
    'JWT_REFRESH_SECRET',
    'DB_HOST',
    'DB_PORT',
    'DB_USERNAME',
    'DB_PASSWORD',
    'DB_NAME',
];

const missingVars = REQUIRED_ENV_VARS.filter((key) => !process.env[key]);
if (missingVars.length > 0) {
    console.error(
        `Missing required environment variables: ${missingVars.join(', ')}\nCheck your .env file.`,
    );
    process.exit(1);
}

import app from './app';
import { AppDataSource } from './database/data-source';

const PORT = process.env.PORT || 5000;

AppDataSource.initialize()
    .then(() => {
        console.log('Database Connected');

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log('DB Error', error);
    });