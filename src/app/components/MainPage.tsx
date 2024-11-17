"use client";

import React  from "react";
import { Header } from "./Header";
import { useLocalStorage } from "../lib/useLocalStorage";
import { InvoiceIndex } from "./InvoiceIndex";
import { ThemeContext } from "./ThemeContext";

export const MainPage: React.FC = () => {
  const [dark, setDark] = useLocalStorage("dark", true);

  return (
    <ThemeContext.Provider value={dark}>
      <div className={`flex flex-row ${dark ? "bg-dark-purple" : "bg-gray-50"}`}>
        <Header dark={dark} setDark={setDark} />
        <InvoiceIndex/>
      </div>  
    </ThemeContext.Provider>
  );
};
