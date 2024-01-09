import ReactDOM from "react-dom/client";
import "./index.css";

const router = createBrowserRouter(routes);

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { routes } from "./routes/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(<RouterProvider router={router} />);
