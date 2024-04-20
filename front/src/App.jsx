import Login from "./pages/Log/Login"
import "./App.css"
import ReactDOM from "react-dom/client";
import {   BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./pages/admin/admin";

function App() {
  return (
    <>
   
<BrowserRouter>

      <Routes>
        <Route >
          <Route index element={<Login/>} />
          <Route path="/admin" element={<Admin/>} />  
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
export default App
