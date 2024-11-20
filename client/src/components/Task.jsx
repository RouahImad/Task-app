import PropTypes from "prop-types";
import { MdDelete } from "react-icons/md";
import { IoMdCheckboxOutline } from "react-icons/io";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { FiEdit } from "react-icons/fi";

const Task = ({
    taskData,
    handleStatus,
    handleDelete,
    setIsUpdating,
    setUpdateTask,
}) => {
    return (
        <li
            className={taskData.status ? "task completed" : "task"}
            data-id={taskData.id}
        >
            <p>{taskData.task}</p>
            <div className="actions">
                {taskData.status ? (
                    <IoMdCheckboxOutline
                        className="check"
                        onClick={() => handleStatus(taskData.id, 0)}
                    />
                ) : (
                    <MdCheckBoxOutlineBlank
                        className="check"
                        onClick={() => handleStatus(taskData.id, 1)}
                    />
                )}
                <FiEdit
                    className="edit"
                    onClick={() => {
                        setIsUpdating(true);
                        setUpdateTask(taskData);
                    }}
                />
                <MdDelete
                    className="delete"
                    onClick={() => handleDelete(taskData.id)}
                />
            </div>
        </li>
    );
};

Task.propTypes = {
    taskData: PropTypes.shape({
        id: PropTypes.number.isRequired,
        task: PropTypes.string.isRequired,
        status: PropTypes.number.isRequired,
    }).isRequired,
    handleStatus: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    setIsUpdating: PropTypes.func.isRequired,
    setUpdateTask: PropTypes.func.isRequired,
};

export default Task;
