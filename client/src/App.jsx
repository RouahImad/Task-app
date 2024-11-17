import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import FormTask from "./components/FormTask";
import Tasks from "./components/Tasks";
import BarAction from "./components/BarAction";
import TaskUpdateForm from "./components/TaskUpdateForm";

function App() {
    const [tasks, setTasks] = useState([]);
    const [filterType, setFilterType] = useState("all");
    const [inputTask, setInputTask] = useState();
    const [updateTask, setUpdateTask] = useState({});
    const [isUpdating, setIsUpdating] = useState(false);

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

    const handleUpdate = (e) => {
        e.preventDefault();
        const id = updateTask.id;
        const task = e.target[0].value;
        const status = e.target[1].value;
        axios
            .patch("/tasks", { id, task, status })
            .then(() => {
                setTasks(
                    tasks.map((task) =>
                        task.id === id ? { ...task, task, status } : task
                    )
                );
                setIsUpdating(false);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setUpdateTask({});
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
                setIsUpdating={setIsUpdating}
                setUpdateTask={setUpdateTask}
            />
            {isUpdating && (
                <TaskUpdateForm
                    updateTask={updateTask}
                    setIsUpdating={setIsUpdating}
                    handleUpdate={handleUpdate}
                    setUpdateTask={setUpdateTask}
                />
            )}
        </div>
    );
}

export default App;
