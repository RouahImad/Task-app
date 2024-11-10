import { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
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
        axios.post("/tasks", { inputTask }).then(({ data }) => {
            setTasks((old) => [...old, data]);
            setInputTask("");
        });
    };
    const handleDelete = (id) => {
        axios
            .delete(`/tasks/${id}`)
            .then(() => {
                document
                    .querySelector(`[data-id="${id}"]`)
                    .classList.add("delete");

                setTimeout(() => {
                    // setTasks(tasks.filter((task) => task.id != id));
                }, 500);
            })
            .catch((err) => console.log(err));
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
                        <li className="task" key={id} data-id={id}>
                            <p>{task}</p>
                            <div className="actions">
                                <span
                                    style={{
                                        backgroundColor: status
                                            ? "#F44336"
                                            : "#4CAF50",
                                    }}
                                >
                                    {status ? "finished" : "active"}
                                </span>
                                <MdDelete
                                    className="delete"
                                    onClick={() => handleDelete(id)}
                                />
                                <FaCheck className="finish" />
                            </div>
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
