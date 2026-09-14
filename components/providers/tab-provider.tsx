"use client"

import { ReactNode, useState } from "react"
import { TabContext } from "@/hooks/useTab"

export function TabProvider({ children }: { children: ReactNode }) {
  const [selectedTab, setSelectedTab] = useState("home")

  return (
    <TabContext.Provider value={{ selectedTab, setSelectedTab }}>
      {children}
    </TabContext.Provider>
  )
}
