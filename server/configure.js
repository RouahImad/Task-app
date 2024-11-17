import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

// ! this is for local database
const pool = mysql
    .createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    })
    .promise();

// ! this is for remote database
// const pool = mysql
//     .createPool({
//         host: process.env.DB_HOST,
//         port: process.env.DB_PORT,
//         user: process.env.DB_USERNAME,
//         password: process.env.DB_PASSWORD,
//         database: process.env.DB_NAME,
//     })
//     .promise();

export const getTasks = async () => {
    const [rows] = await pool.query("SELECT * FROM tasks");
    return rows;
};

export const getTask = async (id) => {
    const [rows] = await pool.query("SELECT * FROM tasks WHERE id = ?", [id]);
    return rows[0];
};
// ! this is for local database
export const addTask = async (task) => {
    const [row] = await pool.execute("INSERT INTO tasks (task) VALUES (?)", [
        task,
    ]);
    return getTask(row.insertId);
};

// ! this is for remote database
// export const addTask = async (task) => {
//     const [rows] = await pool.query("SELECT MAX(id) AS maxId FROM tasks");
//     const newId = rows[0].maxId ? rows[0].maxId + 1 : 1;

//     await pool.execute("INSERT INTO tasks (id, task) VALUES (?, ?)", [
//         newId,
//         task,
//     ]);

//     return getTask(newId);
// };

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
