import {
    getTasks,
    getTask,
    addTask,
    deleteTask,
    updateTask,
    deleteAll,
} from "./configure.js";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/tasks", async (req, res) => {
    const result = await getTasks();
    res.statusCode = 200;
    res.json(result);
});

app.get("/tasks/:id", async (req, res) => {
    const id = req.params.id;
    const result = await getTask(id);
    res.statusCode = 200;
    res.json(result);
});

app.post("/tasks", async (req, res) => {
    const { inputTask } = req.body;
    const resp = await addTask(inputTask);
    res.statusCode = 200;
    res.json(resp);
});

app.patch("/tasks", async (req, res) => {
    const { id, status } = req.body;
    await updateTask(id, status);
    res.statusCode = 200;
    res.send(true);
});

app.delete("/tasks/:id", async (req, res) => {
    const id = req.params.id;
    await deleteTask(id);
    res.statusCode = 200;
    res.send(true);
});

app.delete("/tasks/", async (req, res) => {
    await deleteAll();
    res.statusCode = 200;
    res.send(true);
});

app.use((err, req, res, next) => {
    console.error("Error:", err.message);
    res.status(500).json({
        error: "Internal Server Error",
        message: err.message,
    });
});

app.listen(PORT, (err) => {
    if (err) console.log("there was an error ", err);
    console.log("listenning on port : " + PORT);
});
