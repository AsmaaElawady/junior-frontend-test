import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasks: JSON.parse(localStorage.getItem("tasks")) || [],
    filter: "All",
};

const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.tasks.push(action.payload);
        },
        editTask: (state, action) => {
            const { id, title, priority } = action.payload;
            const task = state.tasks.find((task) => task.id === id);
            if (task) {
                task.title = title;
                task.priority = priority;
            }
        },
        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter(
                (task) => task.id !== action.payload
            );
        },
        toggleTask: (state, action) => {
            const task = state.tasks.find(
                (task) => task.id === action.payload
            );
            if (task) {
                task.completed = !task.completed;
            }
        },
        setFilter: (state, action) => {
            state.filter = action.payload;
        },
    },
});

export const { addTask, deleteTask, toggleTask, editTask, setFilter } = taskSlice.actions;

export default taskSlice.reducer;