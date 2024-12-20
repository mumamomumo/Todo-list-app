import { TaskInfo } from "@/store/TasksStore";
import { useTasksStore } from "@/store/TasksStore";
import {
  GripVertical,
  Trash,
  CircleAlert,
  OctagonAlert,
  TriangleAlert,
  PenLine,
} from "lucide-react";
import { useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { setPage } from "@/store/PageStore";

function Task({ task }: { task: TaskInfo}) {
  const { id, title, description, completed, tags, priority } = task;

  const { updateTask, deleteTask } = useTasksStore();

  const [isCompleted, setIsCompleted] = useState(completed);

  const toggleTask = () => {
    setIsCompleted(!isCompleted);
    updateTask(id, { completed: isCompleted });
  };

  const tagsElement = tags
    ? tags.map((tag) => (
        <span key={tag} className="task-tags-tag">
          {tag}
        </span>
      ))
    : null;
  const priorityElement =
    priority === "low" ? (
      <CircleAlert color={isCompleted ? "grey" : "white"} />
    ) : priority === "medium" ? (
      <OctagonAlert color={isCompleted ? "grey" : "orange"} />
    ) : (
      <TriangleAlert color={isCompleted ? "grey" : "red"} />
    );

  return (
    <div className={`task task-priority-${priority} completed-${isCompleted}`}>
      <Checkbox
        checked={isCompleted}
        onCheckedChange={toggleTask}
        className="task-checkbox"
      />
      <div className="task-content">
        <div className="flex gap-4 items-center">
          <h1 className="task-title text-lg">{title || "No title"}</h1>
          <div className="task-tags">{tagsElement}</div>
        </div>

        <p>{description || "No description"}</p>
      </div>
      <div className="flex gap-2 items-center">
        {priorityElement}
        <PenLine
          onClick={() => {
            setPage("addTask", task);
          }}
        />
        <Trash
          onClick={isCompleted ? () => deleteTask(id) : () => {}}
          color={isCompleted ? "red" : "grey"}
        />
      </div>
    </div>
  );
}

export default Task;
