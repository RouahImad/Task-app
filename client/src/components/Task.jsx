import PropTypes from "prop-types";
import { MdDelete } from "react-icons/md";
import { IoMdCheckboxOutline } from "react-icons/io";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { FiEdit } from "react-icons/fi";

const Task = ({
    id,
    task,
    handleStatus,
    handleDelete,
    status,
    setIsUpdating,
    setUpdateTask,
}) => {
    return (
        <li className={status ? "task completed" : "task"} data-id={id}>
            <p>{task}</p>
            <div className="actions">
                {status ? (
                    <IoMdCheckboxOutline
                        className="check"
                        onClick={() => handleStatus(id, 0)}
                    />
                ) : (
                    <MdCheckBoxOutlineBlank
                        className="check"
                        onClick={() => handleStatus(id, 1)}
                    />
                )}
                <FiEdit
                    className="edit"
                    onClick={() => {
                        setIsUpdating(true);
                        setUpdateTask({ id, task, status });
                    }}
                />
                <MdDelete className="delete" onClick={() => handleDelete(id)} />
                <span>{status ? "finished" : "active"}</span>
            </div>
        </li>
    );
};

Task.propTypes = {
    task: PropTypes.string,
    handleStatus: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    id: PropTypes.number,
    status: PropTypes.number,
    setIsUpdating: PropTypes.func.isRequired,
    setUpdateTask: PropTypes.func.isRequired,
};

export default Task;
