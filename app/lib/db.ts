let Pool: any;

// Ensure this code only runs on the server side
if (typeof window === 'undefined') {
    // Dynamically import 'pg' only on the server side
    const { Pool: PgPool } = require('pg');
    Pool = PgPool;
} else {
    throw new Error('Database operations are not allowed on the client side.');
}

// Database connection
export const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
    max: 20,
    idleTimeoutMillis: 30000,
});