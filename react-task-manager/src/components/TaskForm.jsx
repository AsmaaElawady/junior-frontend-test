import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/slices/taskSlice";
import { v4 as uuidv4 } from "uuid";

function TaskForm() {
    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState("Low");
    const dispatch = useDispatch();


    const handleSubmit = (event) => {
        event.preventDefault();
        if (!title.trim()) {
            return;    
        } 
        dispatch(addTask({ id: uuidv4(), title, priority, completed: false }));
        setTitle("");
        setPriority("Low");
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-6">
            <input 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="What needs to be done?" 
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder-slate-400"
            />
            <div className="flex gap-3">
                <select 
                    value={priority} 
                    onChange={(e) => setPriority(e.target.value)}
                    className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white transition-all cursor-pointer"
                >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                <button 
                    type="submit"
                    className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    Add
                </button>
            </div>
        </form>
    );
}

export default TaskForm;