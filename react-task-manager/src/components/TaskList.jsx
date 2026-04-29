import { useSelector } from "react-redux";
import TaskItem from "./TaskItem";

function TaskList() {
    const tasks = useSelector((state) => state.tasks.tasks);
    const filter = useSelector((state) => state.tasks.filter);

    const filteredTasks = tasks.filter((task) => {
        if (filter === "All"){
            return true;
        } 
        return task.priority === filter;
    });

    if (tasks.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="text-slate-300 mb-3">
                    <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                </div>
                <p className="text-slate-500 font-medium">No tasks yet</p>
                <p className="text-slate-400 text-sm mt-1">Add a task above to get started.</p>
            </div>
        );
    }

    if (filteredTasks.length === 0) {
        return (
            <div className="text-center py-10 text-slate-500">
                No {filter.toLowerCase()} priority tasks found.
            </div>
        );
    }

    return (
        <div className="space-y-2">
            {filteredTasks.map((task) => (
                <TaskItem key={task.id} task={task} />
            ))}
        </div>
    );
}

export default TaskList;