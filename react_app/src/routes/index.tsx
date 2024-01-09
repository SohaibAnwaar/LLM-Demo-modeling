import App from "../App";
import QA from "../components/QA";

export const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <QA />,
      },
    ],
  },
];
