import React from "react";
import ReactDOM from "react-dom/client";
import Login from "./pages/Log/Login";
import "./index.css";
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import Admin from "./pages/admin/admin";
import Compagnes from "./pages/compagnes/compagnes.jsx";
import "./index.css";
import App from "./App";
import CompagneDetails from "./CompagneDetails";
import Auth from "./pages/auth";
import NoteOrientation from "./pages/compagnes/NoteOrientation.jsx";
import {
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
// import ReactDOM from "react-dom";
import Besoin from "./pages/compagnes/Besoins.jsx";
import Elaboration from "./pages/compagnes/Elaboration.jsx";
import TableauDeBord from "./pages/compagnes/TableauDeBord";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Login />} />
      <Route path="auth" element={<App />}>
        <Route index element={<Auth />} />
        <Route path="admin" element={<Admin />} />
        <Route path="compagnes" element={<Compagnes />} />
      </Route>
      <Route path="compagnes/:compagneId" element={<CompagneDetails />}>
        <Route index element={<NoteOrientation />} />
        <Route path="noteOrientation" element={<NoteOrientation />} />
        <Route path="besoins" element={<Besoin role="Manager" />} />
        <Route path="elaboration" element={<Elaboration />} />
        <Route path="dashboard" element={<TableauDeBord />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(

  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>

);
