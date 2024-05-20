import { Outlet } from "react-router-dom";
import Sidebar from "./componant/Sidebar";
import Header from "./componant/Header";

export default function App() {
  return (
    <>
      <section className="flex-col w-full font">
        <Header />
        <div style={{ display: "flex", marginTop: 3, gap: 3 }}>
          <Sidebar />
          <Outlet  />
        </div>
      </section>
    </>
  );
}
