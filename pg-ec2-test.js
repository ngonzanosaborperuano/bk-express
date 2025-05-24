import dotenv from 'dotenv';
import pg from 'pg';
const { Client } = pg;

dotenv.config({ path: './.env' });

const client = new Client({
    host: process.env.host,
    port: Number(process.env.port),
    database: process.env.database,
    user: process.env.user,
    password: process.env.password,
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

