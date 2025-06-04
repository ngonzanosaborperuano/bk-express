import admin from 'firebase-admin';

export class AppCheckService {
    constructor() { }
    async verificar(req, res, next) {
        const appCheckToken = req.header('X-Firebase-AppCheck');
        if (!appCheckToken) {
            return res.status(401).send('Missing App Check token');
        }

        try {
            const decodedToken = await admin.appCheck().verifyToken(appCheckToken);
            // console.log('✅ App Check verified:', decodedToken.appId);
            next();
        } catch (error) {
            console.error('❌ Invalid App Check token:', error.message);
            return res.status(401).send('Invalid App Check token');
        }
    }
}
