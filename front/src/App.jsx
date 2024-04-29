import Login from "./pages/Log/Login"
import "./index.css"
import 'tw-elements-react/dist/css/tw-elements-react.min.css';
// import ReactDOM from "react-dom/client";
import Testbesoin from "./pages/testbesoin";
import {   BrowserRouter, Routes, Route } from "react-router-dom";


export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route>
             <Route  />
            <Route path="/" element={<Login/>} />
            <Route path="/admin" element={<Testbesoin/>} />
          </Route>
        </Routes>
      </BrowserRouter>
   


    </>
  );
}

