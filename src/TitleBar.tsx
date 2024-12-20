import { getCurrentWindow } from "@tauri-apps/api/window";
import { Minus, X, Square } from "lucide-react";
const app = getCurrentWindow();

function TitleBar() {
  const title = "To-do";
  app.setTitle(title);
  return (
    <>
      <header data-tauri-drag-region className="titlebar">
        <h1 className="title" data-tauri-drag-region>
          {title}
        </h1>
        <div className="buttons">
          <button onClick={() => app.minimize()} className="app-minimize">
            <Minus />
          </button>
          <button onClick={() => app.toggleMaximize()} className="app-mize">
            <Square />
          </button>
          <button onClick={() => app.close()} className="app-close">
            <X />
          </button>
        </div>
      </header>
      <div className="w-full h-[40px] m-[2px]" />
    </>
  );
}

export default TitleBar;
