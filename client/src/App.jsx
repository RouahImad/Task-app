import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import FormTask from "./components/FormTask";
import Tasks from "./components/Tasks";
import BarAction from "./components/BarAction";
import TaskUpdateForm from "./components/TaskUpdateForm";
import SkeletonsList from "./components/SkeletonsList";

function App() {
    const [tasks, setTasks] = useState([]);
    const [filterType, setFilterType] = useState("all");
    const [inputTask, setInputTask] = useState();
    const [updateTask, setUpdateTask] = useState({});
    const [isUpdating, setIsUpdating] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios
            .get("/tasks")
            .then(({ data }) => {
                setIsLoading(false);
                setTasks(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleSubmit = (e) => {
        setInputTask(inputTask.trim());
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
        setUpdateTask({ ...updateTask, task: updateTask.task.trim() });
        const newId = updateTask.id;
        const newTask = updateTask.task;
        const newStatus = updateTask.status;

        axios
            .put("/tasks", { newId, newTask, newStatus })
            .then(() => {
                setTasks(
                    tasks.map((task) => (task.id == newId ? updateTask : task))
                );
                setIsUpdating(false);
                console.log("Task updated");
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
            {isLoading ? (
                <SkeletonsList />
            ) : (
                <Tasks
                    tasks={filteredTasks}
                    handleStatus={handleStatus}
                    handleDelete={handleDelete}
                    setIsUpdating={setIsUpdating}
                    setUpdateTask={setUpdateTask}
                />
            )}
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
