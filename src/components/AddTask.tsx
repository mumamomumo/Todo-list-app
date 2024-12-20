import { TaskInfo, useTasksStore } from "@/store/TasksStore";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { setPage } from "@/store/PageStore";

function AddTask(props: any) {
  const task = props.task as TaskInfo;
  const addTask = useTasksStore((state) => state.addTask);
  const updateTask = useTasksStore((state) => state.updateTask);

  const [addedTags, setAddedTags] = useState<string[]>(
    task?.tags ? task!.tags : []
  );
  var titleRef = useRef<HTMLInputElement>(null);
  var descriptionRef = useRef<HTMLTextAreaElement>(null);
  var tagRef = useRef<HTMLInputElement>(null);
  var priorityRef = useRef<HTMLSelectElement>(null);
  var handleAddTask = () => {
    addTask({
      title: titleRef.current?.value || "",
      completed: false,
      tags: addedTags,
      priority: priorityRef.current?.value as "low" | "medium" | "high",
      id: uuidv4(),
      description: descriptionRef.current?.value || "",
    });
    setPage("todoList");
  };

  useEffect(() => {
    if (task) {
      titleRef.current!.value = task.title;
      descriptionRef.current!.value = task.description;
      priorityRef.current!.value = task.priority;
      handleAddTask = () => {
        updateTask(task.id, {
          title: titleRef.current?.value || "",
          completed: task.completed,
          tags: addedTags,
          priority: priorityRef.current?.value as "low" | "medium" | "high",
          description: descriptionRef.current?.value || "",
        });
        setPage("todoList");
      };
      setAddedTags(task.tags);
      console.log(`{
          title: ${task.title},
          description: ${task.description},
          priority: ${task.priority},
          tags: ${task.tags}
        }`);
    }
  }, []);

  return (
    <>
      <div className="flex justify-between add-task-header mb-[5%] mt-[2%]">
        <div className="flex flex-1 cursor-pointer justify-self-start content-center">
          <ArrowLeft
            className=""
            width={50}
            height={50}
            onClick={() => setPage("todoList")}
          />
        </div>
        <h1 className="flex-1 text-4xl w-full text-center font-bold">
          {task ? "Edit Task" : "Add Task"}
        </h1>
        <div className="flex-1" />
      </div>
      <div className="add-task-container">
        <form
          className="add-task-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleAddTask();
          }}
        >
          <input
            className="add-task-title"
            type="text"
            placeholder="Title"
            ref={titleRef}
            maxLength={40}
          />
          <textarea
            maxLength={100}
            className="add-task-description"
            placeholder="Description"
            ref={descriptionRef}
          />
          <div className="task-tags">
            <input
              className="add-task-tags"
              type="text"
              placeholder="Tags"
              ref={tagRef}
              onKeyDown={(e) => {
                if (
                  e.key === "Enter" ||
                  e.key === " " ||
                  e.key === "," ||
                  e.key === ";"
                ) {
                  e.preventDefault();
                  const tag = tagRef.current?.value;
                  if (tag && !addedTags.includes(tag)) {
                    setAddedTags((prevTags) => [...prevTags, tag]);
                  }
                  tagRef.current!.value = "";
                }
              }}
            />
            {addedTags.map((tag) => (
              <span
                key={tag}
                className="task-tags-tag cursor-pointer"
                onClick={() => {
                  setAddedTags((prevTags) => prevTags.filter((t) => t !== tag));
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <select
            className="add-task-priority"
            ref={priorityRef}
            defaultValue={task?.priority || "low"}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button className="add-task-button" type="submit">
            Add Task
          </button>
        </form>
      </div>
    </>
  );
}

export default AddTask;
