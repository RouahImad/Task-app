import PropTypes from "prop-types";
import "./bar_action.css";

const BarAction = ({ handleSelect }) => {
    return (
        <div className="barAction">
            <span>Tasks: </span>
            <div className="actions">
                <select name="filter" id="filter" onChange={handleSelect}>
                    <option value="all">All</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                </select>
            </div>
        </div>
    );
};

BarAction.propTypes = {
    handleSelect: PropTypes.func.isRequired,
};

export default BarAction;
