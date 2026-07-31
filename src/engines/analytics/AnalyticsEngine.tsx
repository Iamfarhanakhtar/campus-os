import React, { createContext, useContext, useMemo } from 'react';

export interface AnalyticsEngineContextType {
  isAnalyticsReady: boolean;
}

const AnalyticsEngineContext = createContext<AnalyticsEngineContextType | undefined>(undefined);

export const AnalyticsEngineProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const value = useMemo(() => ({ isAnalyticsReady: true }), []);
  return (
    <AnalyticsEngineContext.Provider value={value}>
      {children}
    </AnalyticsEngineContext.Provider>
  );
};

export const useAnalyticsEngine = (): AnalyticsEngineContextType => {
  const context = useContext(AnalyticsEngineContext);
  if (!context) {
    throw new Error('useAnalyticsEngine must be used within an AnalyticsEngineProvider');
  }
  return context;
};
