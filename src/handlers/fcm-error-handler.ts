
import { logger } from '../config/logger';
export const handleFcmError = (error: any, token: string) => {
  if (error.code === 'messaging/registration-token-not-registered' || error.code === 'messaging/invalid-registration-token') {
    logger.warn({ token, code: error.code }, 'Invalid token, should be removed');
    // Here you would remove the token from DB if implemented
  } else {
    logger.error({ error }, 'Failed to send push notification');
  }
};
