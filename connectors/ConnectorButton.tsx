/**
 * ConnectorButton - زر الموصلات في شريط الإدخال
 * يفتح قائمة الموصلات المنسدلة
 */
import React, { useState, useEffect } from 'react';
import ConnectorsMenuCard from './ConnectorsMenuCard';
import { useConnectors } from './ConnectorsContext';

interface ConnectorButtonProps {
  browserStatus?: 'connected' | 'disconnected' | 'checking';
}

const ConnectorButton: React.FC<ConnectorButtonProps> = ({ 
  browserStatus = 'disconnected' 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { activeConnectors, toggleConnector, connectOAuth, getActiveConnectorIds } = useConnectors();

  const activeCount = getActiveConnectorIds().length;

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={`
          w-8 h-8 rounded-full flex items-center justify-center
          transition-all duration-200 hover:bg-[#2a2a4a]
          ${isMenuOpen ? 'bg-[#2a2a4a]' : 'bg-transparent'}
          ${activeCount > 0 ? 'text-purple-400' : 'text-gray-400'}
        `}
        title="الموصلات"
      >
        {/* Connector Icon - Chain/Link icon */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>

        {/* Active count badge */}
        {activeCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-purple-600 text-white text-[10px] rounded-full flex items-center justify-center font-bold">
            {activeCount}
          </span>
        )}

        {/* Browser connected indicator */}
        {browserStatus === 'connected' && (
          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border border-[#1a1a2e]" />
        )}
      </button>

      {/* Menu Card */}
      <ConnectorsMenuCard
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        activeConnectors={activeConnectors}
        onToggleConnector={toggleConnector}
        onConnectOAuth={connectOAuth}
        browserStatus={browserStatus}
      />
    </div>
  );
};

export default ConnectorButton;
