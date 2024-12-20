import { useTasksStore } from "@/store/TasksStore";
import Task from "./Task";
import usePageStore from "@/store/PageStore";

function TodoList() {
  const tasks = useTasksStore((state) => state.tasks);

  return (
    <>
      {/* TODO: Add search bar */}
      <ul className="todo-list">
        {tasks.map((task) => (
          <>
            <li key={task.id}>
              <Task task={task} />
            </li>
          </>
        ))}
      </ul>
      <button
        className="add-task-nav m-2 "
        onClick={() => usePageStore.getState().setPage("addTask")}
      >
        Add Task
      </button>
    </>
  );
}

export default TodoList;
