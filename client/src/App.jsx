import { useState, useEffect } from "react";
import axios from "axios";
import FormTask from "./components/FormTask";
import Tasks from "./components/Tasks";

function App() {
    const [tasks, setTasks] = useState([]);
    const [inputTask, setInputTask] = useState();

    useEffect(() => {
        axios
            .get("/tasks")
            .then(({ data }) => {
                setTasks(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("/tasks", { inputTask })
            .then(({ data }) => {
                setTasks((old) => [...old, data]);
                setInputTask("");
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const handleDelete = (id) => {
        axios
            .delete(`/tasks/${id}`)
            .then(() => {
                document
                    .querySelector(`[data-id="${id}"]`)
                    .classList.add("deleted");
                const timeoutId = setTimeout(() => {
                    setTasks((currentTasks) =>
                        currentTasks.filter((task) => task.id !== id)
                    );
                }, 1000);

                return () => clearTimeout(timeoutId);
            })
            .catch((err) => console.log(err));
    };
    const handleStatus = (id, status) => {
        axios
            .patch("/tasks", { id, status })
            .then(({ data }) => {
                setTasks(
                    tasks.map((task) =>
                        task.id === id ? { ...task, status } : task
                    )
                );
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="container">
            <FormTask
                handleSubmit={handleSubmit}
                inputTask={inputTask}
                setInputTask={setInputTask}
            />
            <Tasks
                tasks={tasks}
                handleStatus={handleStatus}
                handleDelete={handleDelete}
            />
        </div>
    );
}

export default App;
