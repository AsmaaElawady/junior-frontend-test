import { useEffect } from "react";
import { useSelector } from "react-redux";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskFilter from "./components/TaskFilter";

function App() {
  const tasks = useSelector((state) => state.tasks.tasks);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-start justify-center p-4 pt-12 md:pt-24">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-6 md:p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            Task Manager
          </h1>
        </div>
        <TaskForm />
        <TaskFilter />
        <TaskList />
      </div>
    </div>
  );
}

export default App;