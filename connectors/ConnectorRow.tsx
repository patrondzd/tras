/**
 * ConnectorRow - Single row for connector with browser modal support
 * 
 * عند محاولة تفعيل المتصفح وهو غير متصل، يفتح BrowserConnectorModal
 */

import React, { useState } from 'react';
import { ConnectorConfig } from '../../config/connectors.config';
import { getConnectorIcon } from './ConnectorIcons';
import ToggleSwitch from './ToggleSwitch';
import BrowserConnectorModal from './BrowserConnectorModal';

interface ConnectorRowProps {
  connector: ConnectorConfig;
  isActive: boolean;
  onToggle: (id: string, active: boolean) => void;
  onConnect: (id: string) => void;
  browserStatus?: 'connected' | 'disconnected' | 'checking'; // حالة المتصفح من WebSocket
}

const ConnectorRow: React.FC<ConnectorRowProps> = ({
  connector,
  isActive,
  onToggle,
  onConnect,
  browserStatus = 'disconnected'
}) => {
  const [showBrowserModal, setShowBrowserModal] = useState(false);
  const IconComponent = getConnectorIcon(connector.icon);

  // معالجة النقر على صف المتصفح
  const handleBrowserToggle = (newState: boolean) => {
    // إذا كان المستخدم يحاول التفعيل والمتصفح غير متصل
    if (newState && browserStatus !== 'connected') {
      // افتح نموذج الإعداد بدلاً من التفعيل المباشر
      setShowBrowserModal(true);
    } else {
      // المتصفح متصل فعلاً، فقط قم بالتبديل
      onToggle(connector.id, newState);
    }
  };

  // عند اكتشاف الاتصال بنجاح
  const handleBrowserConnected = () => {
    onToggle(connector.id, true); // فعّل المتصفح
    setShowBrowserModal(false);
  };

  // هل هذا موصل المتصفح؟
  const isBrowserConnector = connector.id === 'browser';

  // حالة الموصل الفعلية (للمتصفح: تعتمد على browserStatus)
  const effectiveActive = isBrowserConnector 
    ? browserStatus === 'connected' 
    : isActive;

  return (
    <>
      <div
        className="flex items-center justify-between px-3 py-2.5 hover:bg-white/5 transition-colors cursor-pointer"
        onClick={() => {
          if (connector.type === 'toggle') {
            if (isBrowserConnector) {
              handleBrowserToggle(!effectiveActive);
            } else {
              onToggle(connector.id, !isActive);
            }
          } else {
            onConnect(connector.id);
          }
        }}
      >
        {/* Left side: Icon + Name */}
        <div className="flex items-center gap-2.5">
          <div className="w-4 h-4 flex items-center justify-center">
            <IconComponent size={16} className="text-gray-300" />
          </div>
          <span className="text-[13px] text-gray-200">{connector.name}</span>
          
          {/* مؤشر الاتصال للمتصفح */}
          {isBrowserConnector && browserStatus === 'connected' && (
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          )}
        </div>

        {/* Right side: Toggle or Connect button */}
        <div onClick={(e) => e.stopPropagation()}>
          {connector.type === 'toggle' ? (
            <ToggleSwitch
              checked={effectiveActive}
              onChange={(checked) => {
                if (isBrowserConnector) {
                  handleBrowserToggle(checked);
                } else {
                  onToggle(connector.id, checked);
                }
              }}
            />
          ) : (
            <span className="text-[13px] text-gray-400 hover:text-gray-200 transition-colors">
              Connecter
            </span>
          )}
        </div>
      </div>

      {/* نموذج إعداد المتصفح */}
      {isBrowserConnector && (
        <BrowserConnectorModal
          isOpen={showBrowserModal}
          onClose={() => setShowBrowserModal(false)}
          onConnected={handleBrowserConnected}
          browserStatus={browserStatus}
        />
      )}
    </>
  );
};

export default ConnectorRow;
