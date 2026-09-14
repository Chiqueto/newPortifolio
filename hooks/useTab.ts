import { createContext, useContext } from "react";

type TabContextType = {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
};

export const TabContext = createContext<TabContextType | undefined>(undefined);

export const useTab = () => {
  const context = useContext(TabContext);
  if (!context) throw new Error("useTab deve ser usado dentro de TabProvider");
  return context;
};
