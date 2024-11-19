import PropTypes from "prop-types";
import Task from "./Task";
import "./tasks.css";

const Tasks = ({
    tasks,
    handleStatus,
    handleDelete,
    setIsUpdating,
    setUpdateTask,
}) => {
    return (
        <ul className="tasks">
            {tasks.length ? (
                tasks.map((task) => (
                    <Task
                        key={task.id}
                        taskData={task}
                        handleStatus={handleStatus}
                        handleDelete={handleDelete}
                        setIsUpdating={setIsUpdating}
                        setUpdateTask={setUpdateTask}
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
    setIsUpdating: PropTypes.func.isRequired,
    setUpdateTask: PropTypes.func.isRequired,
};

export default Tasks;
