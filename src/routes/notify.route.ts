import { Router } from 'express';
import { sendPushNotification } from '../services/fcm.service';

const router = Router();

router.post('/notify', async (req, res):Promise<any> => {
  const { token, title, body } = req.body;

  if (!token || !title || !body) {
    return res.status(400).json({ message: 'token, title and body are required' });
  }

  await sendPushNotification({ token, title, body });
  res.json({ success: true, message: 'Notification request sent' });
});

export default router;
