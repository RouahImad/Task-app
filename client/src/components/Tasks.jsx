import PropTypes from "prop-types";
import Task from "./Task";
import "./Tasks.css";

const Tasks = ({ tasks, handleStatus, handleDelete }) => {
    return (
        <ul className="tasks">
            {tasks.length ? (
                tasks.map(({ id, task, status }) => (
                    <Task
                        key={id}
                        task={task}
                        handleStatus={handleStatus}
                        handleDelete={handleDelete}
                        id={id}
                        status={status}
                    />
                ))
            ) : (
                <span>no task found</span>
            )}
        </ul>
    );
};

Tasks.propTypes = {
    tasks: PropTypes.array,
    handleStatus: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
};

export default Tasks;
