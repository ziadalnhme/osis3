import React, { createContext, useContext, ReactNode } from 'react';
import { useNetlifyCMS } from '../hooks/useNetlifyCMS';

interface NetlifyCMSContextType {
  data: any;
  loading: boolean;
  error: string | null;
  updateData: (key: string, newData: any) => void;
  reloadData: () => void;
}

const NetlifyCMSContext = createContext<NetlifyCMSContextType | undefined>(undefined);

interface NetlifyCMSProviderProps {
  children: ReactNode;
}

export const NetlifyCMSProvider: React.FC<NetlifyCMSProviderProps> = ({ children }) => {
  const cmsData = useNetlifyCMS();

  return (
    <NetlifyCMSContext.Provider value={cmsData}>
      {children}
    </NetlifyCMSContext.Provider>
  );
};

export const useNetlifyCMSContext = (): NetlifyCMSContextType => {
  const context = useContext(NetlifyCMSContext);
  if (!context) {
    throw new Error('useNetlifyCMSContext must be used within a NetlifyCMSProvider');
  }
  return context;
};

// Hook مخصص لاستخدام بيانات معينة
export const useCMSData = (key: string) => {
  const { data, loading, error } = useNetlifyCMSContext();
  return {
    data: data[key] || null,
    loading,
    error
  };
};