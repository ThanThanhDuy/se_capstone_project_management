import React from "react";
import { Outlet } from "react-router-dom";
function MainLayout() {
  return (
    <div className="App">
      <Outlet />
    </div>
  );
}

export default MainLayout;
