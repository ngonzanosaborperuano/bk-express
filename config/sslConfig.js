import fs from 'fs';
import path from 'path';

export class SslConfig {
    constructor() {
        this.certPath = '/etc/letsencrypt/live/cocinando.shop';
    }

    getCredentials() {
        return {
            key: fs.readFileSync(path.join(this.certPath, 'privkey.pem')),
            cert: fs.readFileSync(path.join(this.certPath, 'fullchain.pem')),
        };
    }
}
