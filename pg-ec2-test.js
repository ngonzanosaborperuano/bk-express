import pg from 'pg';
import { config } from './src/config/config.js';

const { Client } = pg;

const client = new Client({
    host: config.host,
    port: Number(config.port),
    database: config.database,
    user: config.user,
    password: config.password,
    ssl: {
        rejectUnauthorized: false
    },
});

client.connect()
    .then(() => {
        console.log('✅ Conectado a PostgreSQL en EC2');
        return client.end();
    })
    .catch(err => {
        console.error('❌ Error al conectar:');
        console.error(err);
    });

