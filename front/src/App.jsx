import Login from "./pages/Log/Login"
import "./index.css"
// import Besoins from "./pages/besoins/besoins";
import ReactDOM from "react-dom/client";
import Testbesoin from "./pages/testbesoin";
import {   BrowserRouter, Routes, Route } from "react-router-dom";
// import Admin from "./pages/admin/admin";

function App() {
  return (
    <>
      {/* {<BrowserRouter>
        <Routes>
          <Route>
            {/* <Route index element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/besoins" element={<Besoins />} /> }
            <Route path="/" element={<Testbesoin/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </> } */}
<Testbesoin></Testbesoin>

    </>
  );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
export default App
