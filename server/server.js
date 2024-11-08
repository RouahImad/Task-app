import { getTasks, getTask, addTask, deleteTask } from "./configure.js";
import express from "express";

const app = express();

app.use(express.json());

const PORT = process.env.PORT;

app.get("/tasks", async (req, res) => {
    console.log("requested get");

    const result = await getTasks();
    res.statusCode = 200;
    res.json(result);
});

app.get("/tasks/:id", async (req, res) => {
    console.log("requested get by id");

    const id = req.params.id;
    const result = await getTask(id);
    res.statusCode = 200;
    res.json(result);
});

app.post("/tasks", async (req, res) => {
    console.log("requested post");

    const { inputTask } = req.body;

    const resp = await addTask(inputTask);
    res.statusCode = 200;
    res.json(resp);
});

app.delete("/tasks/:id", async (req, res) => {
    console.log("requested delete");

    const id = req.params.id;
    await deleteTask(id);
    res.statusCode = 200;
    res.send(true);
});

app.listen(PORT, (err) => {
    if (err) console.log("there was an error ", err);
    console.log("listenning on port : " + PORT);
});
