import { pool } from './db';

// Get all users with a limit
export async function getUsers(limit: number) {
    const query = 'SELECT "ID_Usuario", "Username", "Password" FROM "Usuario" LIMIT $1';
    const values = [limit];
    const result = await pool.query(query, values);
    return result.rows;
}

// Create a new user
export async function createUser(username: string, password: string) {
    const query = 'INSERT INTO "Usuario" ("Username", "Password") VALUES ($1, $2) RETURNING *';
    const values = [username, password];
    const result = await pool.query(query, values);
    return result.rows[0];
}

// Update a user by ID
export async function updateUser(id: number, username: string, password: string) {
    const query = 'UPDATE "Usuario" SET "Username" = $1, "Password" = $2 WHERE "ID_Usuario" = $3 RETURNING *';
    const values = [username, password, id];
    const result = await pool.query(query, values);
    return result.rows[0];
}

// Delete a user by ID
export async function deleteUser(id: number) {
    const query = 'DELETE FROM "Usuario" WHERE "ID_Usuario" = $1 RETURNING *';
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0];
}