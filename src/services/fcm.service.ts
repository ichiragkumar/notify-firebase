import { messaging } from '../config/firebase';
import { handleFcmError } from '../handlers/fcm-error-handler';
import { logger } from '../config/logger';

export const sendPushNotification = async ({
  token,
  title,
  body,
}: {
  token: string;
  title: string;
  body: string;
}) => {
  try {
    const message = {
      token,
      notification: { title, body },
    };

    const response = await messaging.send(message);
    logger.info({ response }, 'Push notification sent');
  } catch (error: any) {
    handleFcmError(error, token);
  }
};
