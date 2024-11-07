import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get("/tasks").then(({ data }) => {
            console.log(data);
            setTasks(data);
        });
    }, []);

    return (
        <ul className="tasks">
            {tasks ? (
                tasks.map(({ id, task, status }) => (
                    <li className="task" key={id}>
                        <p>{task}</p>
                        <span
                            style={{
                                backgroundColor: status ? "green" : "grey",
                            }}
                        >
                            {status ? "active" : "finished"}
                        </span>
                    </li>
                ))
            ) : (
                <span>no task found</span>
            )}
        </ul>
    );
}

export default App;
