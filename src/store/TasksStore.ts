import { create } from "zustand";

export type TaskInfo = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  tags: string[];
  priority: "low" | "medium" | "high";
};

type TasksStore = {
  tasks: TaskInfo[];
  addTask: (task: TaskInfo) => void;
  updateTask: (id: string, task: Partial<TaskInfo>) => void;
  deleteTask: (id: string) => void;
  // Function that allows the user to change the list entirely. Parameters will be a function that takes the current list as a parameter and returns a new list
  updateList: (listUpdater: (prev: TaskInfo[]) => TaskInfo[]) => void;
};

export const useTasksStore = create<TasksStore>((set) => ({
  tasks: [],
  addTask: (task) => {
    set((state) => ({ tasks: [...state.tasks, task] }));
  },
  updateTask: (id, task) => {
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...task } : t)),
    }));
  },
  deleteTask: (id) => {
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== id),
    }));
  },
  updateList: (listUpdater) => {
    set((state) => ({ tasks: listUpdater(state.tasks) }));
  },
}));
