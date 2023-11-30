import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import MapPage from "./pages/MapPage";
import WritingPage from "./pages/WritingPage";
import VariationPage from "./pages/VariationPage";
import MainDetailPage from "./pages/MainDetailPage";
import VariationDetailPage from "./pages/VariationDetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, path: "/", element: <LoginPage /> },
      { path: "/main", element: <MainPage /> },
      { path: "/detail", element: <MainDetailPage /> },
      { path: "/map", element: <MapPage /> },
      { path: "/writing", element: <WritingPage /> },
      { path: "/variation", element: <VariationPage /> },
      { path: "/variation/detail", element: <VariationDetailPage /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
