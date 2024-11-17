import PropTypes from "prop-types";
import { MdClose } from "react-icons/md";
import "./TaskUpdateForm.css";

const TaskUpdateForm = ({
    updateTask,
    setIsUpdating,
    handleUpdate,
    setUpdateTask,
}) => {
    const handleInputChange = (e) => {
        setUpdateTask({
            ...updateTask,
            task: e.target.value,
        });
    };
    const handleSelectChange = (e) => {
        setUpdateTask({
            ...updateTask,
            status: parseInt(e.target.value),
        });
    };

    return (
        <div className="updateContainer">
            <h2>Task Update Form</h2>
            <button
                className="close"
                onClick={() => {
                    setIsUpdating(false);
                    setUpdateTask({});
                }}
            >
                <MdClose />
            </button>
            <form id="updateForm" onSubmit={handleUpdate}>
                <div className="box">
                    <label htmlFor="updateTask">Update Task : </label>
                    <input
                        type="text"
                        id="updateTask"
                        value={updateTask.task || ""}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="box">
                    <label htmlFor="updateStatus">Update Status : </label>
                    <select
                        id="updateStatus"
                        defaultValue={updateTask.status}
                        onChange={handleSelectChange}
                    >
                        <option value="0">Active</option>
                        <option value="1">Completed</option>
                    </select>
                </div>
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

TaskUpdateForm.propTypes = {
    updateTask: PropTypes.shape({
        id: PropTypes.number.isRequired,
        task: PropTypes.string.isRequired,
        status: PropTypes.number.isRequired,
    }),
    setIsUpdating: PropTypes.func.isRequired,
    handleUpdate: PropTypes.func.isRequired,
    setUpdateTask: PropTypes.func.isRequired,
};

export default TaskUpdateForm;
