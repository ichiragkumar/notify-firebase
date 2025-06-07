import { Router } from "express";
import { sendPushNotification } from "../services/fcm.service";
import { UserModel } from "../models/user.model";
import { messaging } from "firebase-admin";

const router = Router();

router.post("/notify", async (req, res): Promise<any> => {
  const { token, title, body } = req.body;

  if (!token || !title || !body) {
    return res
      .status(400)
      .json({ message: "token, title and body are required" });
  }

  await sendPushNotification({ token, title, body });
  res.json({ success: true, message: "Notification request sent" });
});

router.post("/send-bulk", async (req, res): Promise<any> => {
  const { title, body } = req.body;
  if (!title || !body) {
    return res.status(400).json({
      message: "title and body are required",
    });
  }

  const users = await UserModel.find();
  const tokens = users.flatMap((user) => user.fcmTokens);

  const response = await messaging().sendEach(
    tokens.map((token) => ({
      token,
      notification: { title, body },
    }))
  );

  const invalidTokens = response.responses
    .map((resp: any, i: any) => (!resp.success ? tokens[i] : null))
    .filter((token: any) => token !== null);

  if (invalidTokens.length) {
    await Promise.all(
      users.map(async (user) => {
        const newTokens = user.fcmTokens.filter(
          (token) => !invalidTokens.includes(token)
        );
        if (newTokens.length !== user.fcmTokens.length) {
          user.fcmTokens = newTokens;
          await user.save();
        }
      })
    );
  }
  return res.json({
    success: true,
    sentCount: response.successCount,
    failedCount: response.failureCount,
  });
});

export default router;
