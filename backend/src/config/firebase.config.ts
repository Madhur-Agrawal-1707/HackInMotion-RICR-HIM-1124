import { initializeApp, cert } from 'firebase-admin/app';
import { logger } from '../utils/logger';
import { env } from './env.config';

let firebaseAppInitialized = false;

if (env.FIREBASE_PROJECT_ID && env.FIREBASE_CLIENT_EMAIL && env.FIREBASE_PRIVATE_KEY) {
  try {
    initializeApp({
      credential: cert({
        projectId: env.FIREBASE_PROJECT_ID,
        clientEmail: env.FIREBASE_CLIENT_EMAIL,
        privateKey: env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      }),
    });
    firebaseAppInitialized = true;
    logger.info('✅ Firebase Admin initialized successfully');
  } catch (error) {
    logger.error('❌ Firebase Admin initialization error:', error);
  }
} else {
  logger.warn('⚠️ Firebase configuration is missing. Google Login will not work.');
}

export { firebaseAppInitialized };
