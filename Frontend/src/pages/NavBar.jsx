import React, { useState } from "react";
import "./NavBar.css";

export default function NavBar() {
  return (
    <>
      <div className="Container ui flex ">
        <div className="logo ui w-60 mx-10 mt-3">
          <a href="#" className="text-2xl ui ">
            WorkerDAY 
          </a>
        </div>
        <div className="navbar  ui px-10 py-4 flex justify-end">
          <ul className="navBarItem flex space-x-14">
            <li>
              <a href="#">Home</a>
            </li>
          
            <li>
              <a href="#about">About</a>{" "}
            </li>
           
            <li>
              <a href="#signup">Register </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
