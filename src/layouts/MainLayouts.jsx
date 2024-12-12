import React from "react";
import Header from "../components/Header";

function MainLayouts({ children }) {
  return (
    <div className="box-border p-0 m-0">
      <main>{children}</main>
    </div>
  );
}

export default MainLayouts;
