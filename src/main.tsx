import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { getCurrentWindow } from "@tauri-apps/api/window";
const app = getCurrentWindow();

document.onkeydown = (e) => {
  // Prevented keys
  if (e.ctrlKey && (e.key === "p" || e.key === "r")) {
    e.preventDefault();
  }

  if (e.key === "Escape") {
    e.preventDefault();
    app.close();
  }
};

createRoot(document.getElementById("root")!).render(<App />);
