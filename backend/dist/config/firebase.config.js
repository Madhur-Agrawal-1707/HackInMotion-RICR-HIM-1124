"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.firebaseAppInitialized = void 0;
const app_1 = require("firebase-admin/app");
const logger_1 = require("../utils/logger");
const env_config_1 = require("./env.config");
let firebaseAppInitialized = false;
exports.firebaseAppInitialized = firebaseAppInitialized;
if (env_config_1.env.FIREBASE_PROJECT_ID && env_config_1.env.FIREBASE_CLIENT_EMAIL && env_config_1.env.FIREBASE_PRIVATE_KEY) {
    try {
        (0, app_1.initializeApp)({
            credential: (0, app_1.cert)({
                projectId: env_config_1.env.FIREBASE_PROJECT_ID,
                clientEmail: env_config_1.env.FIREBASE_CLIENT_EMAIL,
                privateKey: env_config_1.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
            }),
        });
        exports.firebaseAppInitialized = firebaseAppInitialized = true;
        logger_1.logger.info('✅ Firebase Admin initialized successfully');
    }
    catch (error) {
        logger_1.logger.error('❌ Firebase Admin initialization error:', error);
    }
}
else {
    logger_1.logger.warn('⚠️ Firebase configuration is missing. Google Login will not work.');
}
