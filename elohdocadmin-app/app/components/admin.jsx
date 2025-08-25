"use client";

import React, { useState } from "react";
import Doctors from "./doctors";
import Nurses from "./nurses";

const Admin = () => {
  const [activeView, setActiveView] = useState(null);

  return (
    <div className="flex flex-col items-center justify-center px-4 mt-10 w-full">
      <h1 className="text-black text-2xl sm:text-4xl font-bold mt-40  text-center">
        Eloh Admin
      </h1>

      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 w-full max-w-md mt-10">
        <button
          className="w-full py-3 sm:py-4 text-white sm:text-lg font-bold bg-[#10002b] hover:bg-[#5a189a] 
          transition duration-300 ease-in-out rounded-xl cursor-pointer"
          onClick={() => setActiveView("doctors")}
        >
          Doctors
        </button>
        <button
          className="w-full py-3 sm:py-4 text-white sm:text-lg font-bold bg-[#10002b] hover:bg-[#5a189a]
          transition duration-300 ease-in-out rounded-xl cursor-pointer"
          onClick={() => setActiveView("nurses")}
        >
          Nurses
        </button>
      </div>

      <div className="w-full max-w-4xl mt-10 sm:mt-20">
        {activeView === "doctors" && <Doctors />}
        {activeView === "nurses" && <Nurses />}
      </div>
    </div>
  );
};

export default Admin;

