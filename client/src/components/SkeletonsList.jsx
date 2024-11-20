import TaskSkeleton from "./TaskSkeleton";
import "./task_skeleton.css";

const SkeletonsList = () => {
    return (
        <div className="skeletons">
            <TaskSkeleton />
            <TaskSkeleton />
            <TaskSkeleton />
        </div>
    );
};

export default SkeletonsList;
