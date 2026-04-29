import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTask, toggleTask, editTask } from "../redux/slices/taskSlice";

function TaskItem({ task }) {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [priority, setPriority] = useState(task.priority);

    const handleSave = () => {
        if (!title.trim()){
            return;
        } 
        dispatch(editTask({ id: task.id, title, priority }));
        setIsEditing(false);
    };

    const priorityColors = {
        High: "bg-red-100 text-red-700",
        Medium: "bg-amber-100 text-amber-700",
        Low: "bg-emerald-100 text-emerald-700"
    };

    return (
        <div className={`group flex flex-col sm:flex-row gap-3 sm:items-center justify-between p-4 rounded-xl border transition-all duration-200 ${task.completed ? "bg-slate-50 border-slate-200" : "bg-white border-slate-200 hover:border-indigo-300 hover:shadow-md"}`}>
            {isEditing ? (
                <div className="flex-1 flex flex-col sm:flex-row gap-3 w-full">
                    <input 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        className="flex-1 px-3 py-1.5 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-indigo-50"
                        autoFocus
                    />
                    <div className="flex gap-2">
                        <select 
                            value={priority} 
                            onChange={(e) => setPriority(e.target.value)}
                            className="px-3 py-1.5 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                        <button onClick={handleSave} className="px-3 py-1.5 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition-colors">
                            Save
                        </button>
                        <button onClick={() => setIsEditing(false)} className="px-3 py-1.5 bg-slate-200 text-slate-700 text-sm font-medium rounded-md hover:bg-slate-300 transition-colors">
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                        <button 
                            onClick={() => dispatch(toggleTask(task.id))}
                            className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                                task.completed ? "bg-indigo-500 border-indigo-500" : "border-slate-300 hover:border-indigo-400"
                            }`}
                        >
                            {task.completed && (
                                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                        </button>
                        <span 
                            onClick={() => dispatch(toggleTask(task.id))}
                            className={`truncate cursor-pointer select-none text-base ${
                                task.completed ? "text-slate-400 line-through" : "text-slate-700 font-medium"
                            }`}
                        >
                            {task.title}
                        </span>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide ${priorityColors[task.priority]}`}>
                            {task.priority}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                            onClick={() => setIsEditing(true)} 
                            className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-md hover:bg-indigo-50 transition-colors"
                            aria-label="Edit task"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </button>
                        <button 
                            onClick={() => dispatch(deleteTask(task.id))} 
                            className="p-1.5 text-slate-400 hover:text-red-600 rounded-md hover:bg-red-50 transition-colors"
                            aria-label="Delete task"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default TaskItem;
