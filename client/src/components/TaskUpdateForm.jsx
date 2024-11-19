import PropTypes from "prop-types";
import { MdClose } from "react-icons/md";
import "./form_update.css";

const TaskUpdateForm = ({
    updateTask,
    setIsUpdating,
    handleUpdate,
    setUpdateTask,
}) => {
    const handleChange = (e) => {
        const value =
            e.target.name === "status"
                ? parseInt(e.target.value)
                : e.target.value;
        setUpdateTask({
            ...updateTask,
            [e.target.name]: value,
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
                    <label htmlFor="updateTask">Task : </label>
                    <input
                        name="task"
                        type="text"
                        id="updateTask"
                        value={updateTask.task || ""}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="box">
                    <label htmlFor="updateStatus">Status : </label>
                    <select
                        name="status"
                        id="updateStatus"
                        defaultValue={updateTask.status}
                        onChange={handleChange}
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
