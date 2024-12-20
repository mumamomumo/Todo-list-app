import "./App.css";
import TitleBar from "./TitleBar";
import usePageStore from "./store/PageStore";

import AddTask from "./components/AddTask";
import TodoList from "./components/TodoList";

function App() {
  console.log("App render");

  const page = usePageStore((state) => state.page);
  const pageProps = usePageStore((state) => state.pageProps);

  return (
    <>
      <TitleBar />
      {page === "todoList" ? <TodoList /> : page === "addTask" && <AddTask task={pageProps} />}
    </>
  );
}

export default App;
