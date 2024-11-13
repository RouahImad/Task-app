import PropTypes from "prop-types";
const FormTask = ({ handleSubmit, inputTask, setInputTask }) => {
    return (
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
    );
};

FormTask.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    inputTask: PropTypes.string,
    setInputTask: PropTypes.func.isRequired,
};

export default FormTask;
