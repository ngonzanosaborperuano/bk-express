import pgPromise from 'pg-promise';

const pgp = pgPromise();

const databaseConfig = {
    host: '127.0.0.1',
    port: 5433,
    database: 'db_cocinando',
    user: 'postgres',
    password: '2go9fanFPSWCLXGu5JyMmeAMSem1',
};

const db = pgp(databaseConfig);

try {
    const connection = await db.connect();
    console.log('Conexión exitosa a PostgreSQL');
    connection.done(); // cerrar conexión
} catch (error) {
    console.error('Error al conectar:', error);
}
