import React from "react";
import ReactDOM from "react-dom/client";
import Login from "./pages/Log/Login";
import "./index.css";
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import Admin from "./pages/admin/admin";
import Compagnes from "./pages/compagnes/compagnes";
import "./index.css";
import App from "./App";
import Auth from "./pages/auth"
import {
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Login />} />

      <Route path="auth" element={<App />}>
        <Route index element={<Auth />} />
         <Route path="admin" element={<Admin/>} />
         <Route path="compagnes" element={<Compagnes/>} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
