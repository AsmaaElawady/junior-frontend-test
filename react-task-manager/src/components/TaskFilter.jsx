import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../redux/slices/taskSlice";

function TaskFilter() {
    const dispatch = useDispatch();
    const filter = useSelector((state) => state.tasks.filter);
    const priorities = ["All", "High", "Medium", "Low"];

    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
            <span className="text-sm font-medium text-slate-500">Filter tasks by priority:</span>
            <div className="flex flex-wrap gap-2">
                {priorities.map((priority) => (
                    <button
                        key={priority}
                        onClick={() => dispatch(setFilter(priority))}
                        className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${
                            filter === priority 
                                ? "bg-indigo-100 text-indigo-700 shadow-sm" 
                                : "text-slate-500 hover:bg-slate-100 bg-transparent"
                        }`}
                    >
                        {priority}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default TaskFilter;
