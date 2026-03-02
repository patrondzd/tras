/**
 * ConnectorsMenuCard - قائمة الموصلات المنسدلة
 * مستوحاة من تصميم Manus
 */
import React, { useEffect, useRef } from 'react';
import CONNECTORS from '../../config/connectors.config';
import ConnectorRow from './ConnectorRow';

interface ConnectorsMenuCardProps {
  isOpen: boolean;
  onClose: () => void;
  activeConnectors: Record<string, boolean>;
  onToggleConnector: (id: string, active: boolean) => void;
  onConnectOAuth: (id: string) => Promise<void>;
  browserStatus?: 'connected' | 'disconnected' | 'checking';
}

const ConnectorsMenuCard: React.FC<ConnectorsMenuCardProps> = ({
  isOpen,
  onClose,
  activeConnectors,
  onToggleConnector,
  onConnectOAuth,
  browserStatus = 'disconnected'
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const activeCount = Object.values(activeConnectors).filter(Boolean).length;

  return (
    <div
      ref={menuRef}
      className="absolute bottom-full left-0 mb-2 w-72 rounded-xl overflow-hidden shadow-2xl z-50"
      style={{
        background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
      }}
    >
      {/* Header */}
      <div
        className="px-4 py-3 border-b"
        style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
      >
        <h3 className="text-white font-semibold text-sm flex items-center gap-2">
          <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          الموصلات
          <span className="text-gray-400 text-xs font-normal">
            ({activeCount} نشط)
          </span>
        </h3>
      </div>

      {/* Connectors List */}
      <div className="py-2 max-h-80 overflow-y-auto custom-scrollbar">
        {CONNECTORS.map((connector) => (
          <ConnectorRow
            key={connector.id}
            connector={connector}
            isActive={activeConnectors[connector.id] || false}
            onToggle={onToggleConnector}
            onConnect={onConnectOAuth}
            browserStatus={connector.id === 'browser' ? browserStatus : undefined}
          />
        ))}
      </div>

      {/* Footer hint */}
      <div
        className="px-4 py-2 border-t text-center"
        style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
      >
        <span className="text-gray-500 text-xs">
          اضغط على الموصل لتفعيله أو تعطيله
        </span>
      </div>
    </div>
  );
};

export default ConnectorsMenuCard;
