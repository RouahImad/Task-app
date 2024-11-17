import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql
    .createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    })
    .promise();

export const getTasks = async () => {
    const [rows] = await pool.query("SELECT * FROM tasks");
    return rows;
};

export const getTask = async (id) => {
    const [rows] = await pool.query("SELECT * FROM tasks WHERE id = ?", [id]);
    return rows[0];
};
export const addTask = async (task) => {
    const [row] = await pool.execute("INSERT INTO tasks (task) VALUES (?)", [
        task,
    ]);
    return getTask(row.insertId);
};
export const updateTask = async (id, status) => {
    await pool.execute("UPDATE tasks SET status = ? WHERE id = ?", [
        status,
        id,
    ]);
};
export const deleteTask = async (id) => {
    await pool.execute("DELETE FROM tasks WHERE id = ?", [id]);
};
export const deleteAll = async (id) => {
    await pool.execute("");
};
