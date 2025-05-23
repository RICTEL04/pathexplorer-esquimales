import { createContext, useContext, useState } from "react";

const SkillRefreshContext = createContext<{
  refreshFlag: number;
  refreshSkills: () => void;
}>({
  refreshFlag: 0,
  refreshSkills: () => {},
});

export const useSkillRefresh = () => useContext(SkillRefreshContext);

export function SkillRefreshProvider({ children }: { children: React.ReactNode }) {
  const [refreshFlag, setRefreshFlag] = useState(0);

  const refreshSkills = () => setRefreshFlag((f) => f + 1);

  return (
    <SkillRefreshContext.Provider value={{ refreshFlag, refreshSkills }}>
      {children}
    </SkillRefreshContext.Provider>
  );
}