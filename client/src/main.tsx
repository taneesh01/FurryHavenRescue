import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Set document title
document.title = "FurryHaven - A Home for Every Stray";

// Set favicon
const link = document.createElement('link');
link.rel = 'icon';
link.href = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🐾</text></svg>';
document.head.appendChild(link);

createRoot(document.getElementById("root")!).render(<App />);
