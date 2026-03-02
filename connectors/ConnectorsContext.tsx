// Connectors Context - State management for connectors
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { CONNECTORS_CONFIG } from '../../config/connectors.config';

interface ConnectorsContextType {
  activeConnectors: Record<string, boolean>;
  toggleConnector: (id: string, active: boolean) => void;
  connectOAuth: (id: string) => Promise<void>;
  getActiveConnectorIds: () => string[];
  isConnectorActive: (id: string) => boolean;
}

const ConnectorsContext = createContext<ConnectorsContextType | undefined>(undefined);

export const ConnectorsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize state from config
  const [activeConnectors, setActiveConnectors] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    CONNECTORS_CONFIG.forEach(c => {
      initial[c.id] = c.connected || false;
    });
    return initial;
  });

  const toggleConnector = useCallback((id: string, active: boolean) => {
    setActiveConnectors(prev => ({
      ...prev,
      [id]: active,
    }));
  }, []);

  const connectOAuth = useCallback(async (id: string) => {
    // TODO: Implement OAuth flow
    // For now, just toggle the state
    console.log(`Connecting to ${id}...`);
    
    // Simulate OAuth connection
    // In production, this would open OAuth popup and handle callback
    setActiveConnectors(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  }, []);

  const getActiveConnectorIds = useCallback(() => {
    return Object.entries(activeConnectors)
      .filter(([_, active]) => active)
      .map(([id]) => id);
  }, [activeConnectors]);

  const isConnectorActive = useCallback((id: string) => {
    return activeConnectors[id] || false;
  }, [activeConnectors]);

  return (
    <ConnectorsContext.Provider
      value={{
        activeConnectors,
        toggleConnector,
        connectOAuth,
        getActiveConnectorIds,
        isConnectorActive,
      }}
    >
      {children}
    </ConnectorsContext.Provider>
  );
};

export const useConnectors = () => {
  const context = useContext(ConnectorsContext);
  if (!context) {
    throw new Error('useConnectors must be used within ConnectorsProvider');
  }
  return context;
};

export default ConnectorsContext;
