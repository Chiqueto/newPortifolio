'use client';

import Header from "@/components/header";
import MainContent from "@/components/main-content";
import Navbar from "@/components/navbar";
import Presentation from "@/components/presentation";
import { useState } from "react";
import { TabContext } from "@/hooks/useTab";





export default function Home() {
  const [selectedTab, setSelectedTab] = useState("home");

  return (
    <TabContext.Provider value={{ selectedTab, setSelectedTab }}>
      <div className="">
        <Header />
        <div className="mx-4 flex flex-col items-center justify-between gap-4 md:flex-row md:items-start" >
          <Presentation />
          <div className="hidden md:block flex-1"><MainContent /></div>
          <Navbar />
          <div className="md:hidden"><MainContent /></div>
        </div>

      </div>
    </TabContext.Provider>
  );
}


