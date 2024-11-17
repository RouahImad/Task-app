import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import FormTask from "./components/FormTask";
import Tasks from "./components/Tasks";
import BarAction from "./components/BarAction";

function App() {
    const [tasks, setTasks] = useState([]);
    const [filterType, setFilterType] = useState("all");
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
            .then(() => {
                setTasks(
                    tasks.map((task) =>
                        task.id === id ? { ...task, status } : task
                    )
                );
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const filteredTasks = useMemo(() => {
        switch (filterType) {
            case "active":
                return tasks.filter((task) => task.status === 0);
            case "completed":
                return tasks.filter((task) => task.status === 1);
            default:
                return tasks;
        }
    }, [tasks, filterType]);

    const handleSelect = (e) => {
        setFilterType(e.target.value);
    };
    return (
        <div className="container">
            <FormTask
                handleSubmit={handleSubmit}
                inputTask={inputTask}
                setInputTask={setInputTask}
            />
            <BarAction handleSelect={handleSelect} />
            <Tasks
                tasks={filteredTasks}
                handleStatus={handleStatus}
                handleDelete={handleDelete}
            />
        </div>
    );
}

export default App;
