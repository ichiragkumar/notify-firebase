import { Router } from "express";
import { messaging } from "firebase-admin";

const router = Router();

router.post("/subscribe-topic", async (req, res): Promise<any> => {
  const { fcmToken, topic } = req.body;
  if (!fcmToken || !topic) {
    return res.status(400).json({
      message: "fcmToken , topic are required",
    });
  }

  await messaging().subscribeToTopic([fcmToken], topic);
  res.json({
    message: `Subscribed to topic ${topic}`,
  });
});

router.post("/send-topic", async (req, res): Promise<any> => {
  const { topic, title, body } = req.body;
  if (!topic || !title || !body) {
    return res.status(400).json({
      success: true,
      message: "topic , title , body are required",
    });
  }

  await messaging().send({
    topic,
    notification: {
      title,
      body,
    },
  });
  res.json({
    success: true,
    message: `Sent message to topic ${topic}`,
  });
});


export default router;