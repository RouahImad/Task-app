import PropTypes from "prop-types";
import { MdDelete } from "react-icons/md";
import { IoMdCheckboxOutline } from "react-icons/io";
import { MdCheckBoxOutlineBlank } from "react-icons/md";

const Task = ({ task, handleStatus, handleDelete, id, status }) => {
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
                <MdDelete className="delete" onClick={() => handleDelete(id)} />
                <span
                    style={{
                        backgroundColor: status ? "#F44336" : "#4CAF50",
                    }}
                >
                    {status ? "finished" : "active"}
                </span>
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
};

export default Task;
