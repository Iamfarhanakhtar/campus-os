import React, { createContext, useContext, useMemo } from 'react';

export interface AIEngineContextType {
  isAIEnabled: boolean;
}

const AIEngineContext = createContext<AIEngineContextType | undefined>(undefined);

export const AIEngineProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const value = useMemo(() => ({ isAIEnabled: false }), []);
  return (
    <AIEngineContext.Provider value={value}>
      {children}
    </AIEngineContext.Provider>
  );
};

export const useAIEngine = (): AIEngineContextType => {
  const context = useContext(AIEngineContext);
  if (!context) {
    throw new Error('useAIEngine must be used within an AIEngineProvider');
  }
  return context;
};
