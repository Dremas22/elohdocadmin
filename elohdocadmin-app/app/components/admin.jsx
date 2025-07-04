"use client";

import React from "react";
import { useState } from "react";
import Doctors from "./doctors";

const Admin = () => {
  const [activeView, setActiveView] = useState(null);

  return (
    <div className="flex flex-col items-center justify-center text-white px-4 mt-100 w-[50%]">
      <h1 className=" text-black text-4xl font-bold mb-10">Eloh Admin</h1>

      <div className="flex flex-row space-x-6 w-full max-w-md">
        <button
          className="w-full py-4 text-lg font-bold bg-[#10002b] hover:bg-[#5a189a] 
        transition duration-300 ease-in-out rounded-xl cursor-pointer"
          onClick={() => setActiveView("doctors")}
        >
          Doctors
        </button>
        <button
          className="w-full py-4 text-lg font-bold bg-[#10002b] hover:bg-[#5a189a]
         transition duration-300 ease-in-out rounded-xl cursor-pointer"
        >
          Nurses
        </button>
       
      </div>
       <div className="w-full max-w-4xl mt-10">
          {activeView === "doctors" && <Doctors />}
        </div>
    </div>
  );
};

export default Admin;
