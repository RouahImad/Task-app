import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
    const [tasks, setTasks] = useState([]);
    const [inputTask, setInputTask] = useState();

    useEffect(() => {
        axios.get("/tasks").then(({ data }) => {
            setTasks(data);
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputTask);
        axios.post("/tasks", { inputTask }).then(({ data }) => {
            setTasks((old) => [...old, data]);
            setInputTask("");
        });
    };

    return (
        <div className="container">
            <form id="taskForm" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter new task"
                    required
                    value={inputTask}
                    onChange={(e) => setInputTask(e.target.value)}
                />
                <button>Add</button>
            </form>
            <ul className="tasks">
                {tasks ? (
                    tasks.map(({ id, task, status }) => (
                        <li className="task" key={id}>
                            <p>{task}</p>
                            <span
                                style={{
                                    backgroundColor: status
                                        ? "#F44336"
                                        : "#4CAF50",
                                }}
                            >
                                {status ? "finished" : "active"}
                            </span>
                        </li>
                    ))
                ) : (
                    <span>no task found</span>
                )}
            </ul>
        </div>
    );
}

export default App;
