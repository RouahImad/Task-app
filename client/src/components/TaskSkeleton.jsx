import "./task_skeleton.css";

const TaskSkeleton = () => {
    return (
        <div className="skeleton">
            <div className="skeleton_task"></div>
            <div className="skeleton_actions">
                <div className="skeleton_check"></div>
                <div className="skeleton_edit"></div>
                <div className="skeleton_delete"></div>
            </div>
        </div>
    );
};

export default TaskSkeleton;
