

import { Outlet } from "react-router-dom";
import Sidebar2 from "./componant/Sidebar2";
import Header from "./componant/Header";



import React from 'react'

function CompagneDetails() {
  return (
    <section className="flex-col w-full font">
      <Header />
      <div style={{ display: "flex", marginTop: 3, gap: 3 }}>
        <Sidebar2 />
        <Outlet />
      </div>
    </section>
  );
}

export default CompagneDetails