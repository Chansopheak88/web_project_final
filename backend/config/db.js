import mysql from 'mysql2';
import 'dotenv/config';

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const db = pool.promise();

db.getConnection()
    .then(connection => {
        console.log('Successfully connected to the ExploitX database.');
        connection.release();
    })
    .catch(err => {
        console.error('Database connection failed:', err.message);
    });

export default db;