import * as admin from 'firebase-admin';

admin.initializeApp({
  credential: admin.credential.cert(require('../../firebase-service-account.json')),
});

export const messaging = admin.messaging();
