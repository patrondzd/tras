import React, { useState, useRef, useEffect } from 'react';
import { Plus, Mic, ArrowUp, FileText, ChevronRight, Globe, Mail, Calendar, HardDrive, Github, Settings } from 'lucide-react';
import { ReactTyped } from 'react-typed';

// أيقونة الرابط المخصصة - طبق الأصل
const LinkIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

// أيقونات الخدمات
const GoogleDriveIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M12 11L6 21h12l-6-10z"/>
    <path fill="#FBBC04" d="M6 21l6-10L6 1l-6 10 6 10z"/>
    <path fill="#34A853" d="M12 11L6 1h12l-6 10z"/>
  </svg>
);

const OneDriveIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24">
    <path fill="#0078D4" d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/>
  </svg>
);

const FigmaIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M8 24c2.2 0 4-1.8 4-4v-4H8c-2.2 0-4 1.8-4 4s1.8 4 4 4z" fill="#0ACF83"/>
    <path d="M4 12c0-2.2 1.8-4 4-4h4v8H8c-2.2 0-4-1.8-4-4z" fill="#A259FF"/>
    <path d="M4 4c0-2.2 1.8-4 4-4h4v8H8C5.8 8 4 6.2 4 4z" fill="#F24E1E"/>
    <path d="M12 0h4c2.2 0 4 1.8 4 4s-1.8 4-4 4h-4V0z" fill="#FF7262"/>
    <path d="M20 12c0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4 4 1.8 4 4z" fill="#1ABCFE"/>
  </svg>
);

const GmailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24">
    <path fill="#EA4335" d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
  </svg>
);

const GoogleCalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10z"/>
    <rect fill="#EA4335" x="7" y="12" width="3" height="3"/>
    <rect fill="#FBBC04" x="11" y="12" width="3" height="3"/>
  </svg>
);

const OutlookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24">
    <path fill="#0078D4" d="M24 7.387v10.478c0 .23-.08.424-.238.576-.158.154-.352.23-.578.23h-8.37v-6.66l1.903 1.163c.063.04.132.059.207.059s.144-.02.207-.059L24 7.387z"/>
    <path fill="#0078D4" d="M15.758 8.003l8.227 5.004.015-.046V7.387c0-.227-.077-.42-.23-.576-.154-.156-.348-.234-.578-.234h-7.434v1.472z"/>
    <ellipse fill="#0078D4" cx="8.5" cy="12" rx="5.5" ry="6"/>
    <path fill="#fff" d="M8.5 8c-1.38 0-2.5 1.79-2.5 4s1.12 4 2.5 4 2.5-1.79 2.5-4-1.12-4-2.5-4z"/>
  </svg>
);

interface TaskInputBarProps {
  onSubmit?: (value: string) => void;
  onSendMessage?: (value: string) => void;
  placeholder?: string;
  isLoading?: boolean;
  showExtras?: boolean;
}

export const TaskInputBar: React.FC<TaskInputBarProps> = ({
  onSubmit,
  onSendMessage,
  placeholder = "Assign a task or ask anything",
  isLoading = false,
  showExtras = true
}) => {
  const [value, setValue] = useState('');
  const [showPlusMenu, setShowPlusMenu] = useState(false);
  const [showConnectorsMenu, setShowConnectorsMenu] = useState(false);
  const [connectedApps, setConnectedApps] = useState<string[]>(['browser']); // Start with browser connected
  const plusMenuRef = useRef<HTMLDivElement>(null);
  const connectorsMenuRef = useRef<HTMLDivElement>(null);

  // Auto-close menus when mouse leaves the component area
  useEffect(() => {
    // Menus will close automatically via onMouseLeave handlers
    // No need for click outside detection since we use hover
  }, []);

  const handleSubmit = () => {
    if (value.trim()) {
      if (onSubmit) {
        onSubmit(value);
      }
      if (onSendMessage) {
        onSendMessage(value);
      }
      setValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Toggle connector connection
  const toggleConnector = (connectorId: string) => {
    setConnectedApps(prev => 
      prev.includes(connectorId) 
        ? prev.filter(id => id !== connectorId)
        : [...prev, connectorId]
    );
  };

  // Connectors data with icons for display
  const connectorsData = [
    { id: 'browser', name: 'My Browser', icon: <Globe className="w-4 h-4 text-[#999999]" />, smallIcon: <Globe className="w-3.5 h-3.5 text-[#999999]" /> },
    { id: 'gmail', name: 'Gmail', icon: <GmailIcon />, smallIcon: <GmailIcon /> },
    { id: 'gcalendar', name: 'Google Calendar', icon: <GoogleCalendarIcon />, smallIcon: <GoogleCalendarIcon /> },
    { id: 'gdrive', name: 'Google Drive', icon: <GoogleDriveIcon />, smallIcon: <GoogleDriveIcon /> },
    { id: 'outlook', name: 'Outlook Mail', icon: <OutlookIcon />, smallIcon: <OutlookIcon /> },
    { id: 'ocalendar', name: 'Outlook Calendar', icon: <Calendar className="w-4 h-4 text-[#0078D4]" />, smallIcon: <Calendar className="w-3.5 h-3.5 text-[#0078D4]" /> },
    { id: 'github', name: 'GitHub', icon: <Github className="w-4 h-4 text-white" />, smallIcon: <Github className="w-3.5 h-3.5 text-white" /> },
  ];

  // Get connected apps data for display
  const getConnectedAppsIcons = () => {
    return connectorsData.filter(c => connectedApps.includes(c.id));
  };

  // Count remaining connected apps beyond what's shown
  const maxIconsToShow = 3;
  const connectedIcons = getConnectedAppsIcons();
  const visibleIcons = connectedIcons.slice(0, maxIconsToShow);
  const remainingCount = connectedIcons.length - maxIconsToShow;

  return (
    <div 
      className="relative flex flex-col rounded-xl bg-[#353535] border border-[#4a4a4a] focus-within:border-[#6a6a6a] transition-colors duration-200 max-w-3xl mx-auto"
      style={{ minHeight: '120px' }}
    >
      {/* Input Field - في الأعلى */}
      <div className="flex-1 px-4 pt-4 pb-3 relative">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder=""
          className="w-full bg-transparent border-none outline-none text-white placeholder:text-[#808080] text-[15px] relative z-10"
        />
        {/* 🎯 Animated Placeholder with react-typed */}
        {!value && (
          <div className="absolute inset-0 flex items-center px-4 pt-4 pointer-events-none text-[#808080] text-[15px]">
            <ReactTyped
              strings={[
                'Assign a task or ask a question...',
                'Design a 3D logo for my brand.',
                'Analyze this financial report for me.',
                'Write a Python script to automate emails.',
                'What are the latest trends in AI?',
                'Draft a marketing proposal.',
                'Create a React component.',
                'Help me write a professional email.',
                'Build a landing page for my startup.',
              ]}
              typeSpeed={15}
              backSpeed={8}
              backDelay={1200}
              startDelay={300}
              loop
              cursorChar="|"
              showCursor={true}
            />
          </div>
        )}
      </div>

      {/* Bottom Bar - الأزرار في الأسفل - تختفي عند showExtras = false */}
      {showExtras && (
      <div className="flex items-center justify-between px-3 pb-3">
        {/* Left Icons */}
        <div className="flex items-center gap-0.5">
          {/* Plus Button with Menu */}
          <div 
            className="relative" 
            ref={plusMenuRef}
            onMouseEnter={() => {
              setShowPlusMenu(true);
              setShowConnectorsMenu(false);
            }}
          >
            <button
              className="p-2 rounded-lg hover:bg-[#454545] transition-colors"
              aria-label="Add"
            >
              <Plus className="w-5 h-5 text-[#808080]" />
            </button>

            {/* Plus Menu Dropdown */}
            {showPlusMenu && (
              <div 
                className="absolute top-full left-0 mt-2 w-72 bg-[#353535] rounded-xl border border-[#4a4a4a] shadow-xl max-h-[350px] overflow-y-auto z-[100] transition-all duration-300 ease-in-out"
                style={{
                  opacity: showPlusMenu ? 1 : 0,
                  transform: showPlusMenu ? 'translateY(0)' : 'translateY(-10px)'
                }}
                onMouseEnter={() => setShowPlusMenu(true)}
                onMouseLeave={() => {
                  setTimeout(() => setShowPlusMenu(false), 150);
                }}
              >
                <div className="py-1">
                  <button 
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#454545] transition-colors text-left"
                  >
                    <div className="flex items-center justify-center w-5 h-5">
                      <FileText className="w-5 h-5 text-[#999999]" />
                    </div>
                    <span className="text-white text-sm flex-1">Ajouter depuis les fichiers locaux</span>
                  </button>
                  <button 
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#454545] transition-colors text-left"
                  >
                    <div className="flex items-center justify-center w-5 h-5">
                      <GoogleDriveIcon />
                    </div>
                    <span className="text-white text-sm flex-1">Ajouter à partir des fichiers Google Drive</span>
                    <ChevronRight className="w-4 h-4 text-[#666666]" />
                  </button>
                  <button 
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#454545] transition-colors text-left"
                  >
                    <div className="flex items-center justify-center w-5 h-5">
                      <OneDriveIcon />
                    </div>
                    <span className="text-white text-sm flex-1">Ajouter à partir des fichiers OneDrive</span>
                    <ChevronRight className="w-4 h-4 text-[#666666]" />
                  </button>
                  <button 
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#454545] transition-colors text-left"
                  >
                    <div className="flex items-center justify-center w-5 h-5">
                      <FigmaIcon />
                    </div>
                    <span className="text-white text-sm flex-1">Ajouter depuis Figma</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Connectors Button with Menu */}
          <div 
            className="relative" 
            ref={connectorsMenuRef}
            onMouseEnter={() => {
              setShowConnectorsMenu(true);
              setShowPlusMenu(false);
            }}
          >
            <button
              className="flex items-center gap-1 px-2 py-1.5 rounded-lg hover:bg-[#454545] transition-colors"
              aria-label="Connectors"
            >
              {/* Show connected apps icons or integration icon */}
              {connectedApps.length === 0 ? (
                // No apps connected - show integration icon
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#808080" strokeWidth="2">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                  </svg>
                </>
              ) : (
                // Show connected app icons
                <>
                  {visibleIcons.map((app, index) => (
                    <span key={app.id} className="flex items-center">
                      {app.smallIcon}
                    </span>
                  ))}
                  {remainingCount > 0 && (
                    <span className="text-[#666666] text-xs ml-0.5">+{remainingCount}</span>
                  )}
                </>
              )}
            </button>

            {/* Connectors Menu Dropdown */}
            {showConnectorsMenu && (
              <div 
                className="absolute top-full left-0 mt-2 w-64 bg-[#353535] rounded-xl border border-[#4a4a4a] shadow-xl max-h-[400px] overflow-y-auto z-[100] transition-all duration-300 ease-in-out"
                style={{
                  opacity: showConnectorsMenu ? 1 : 0,
                  transform: showConnectorsMenu ? 'translateY(0)' : 'translateY(-10px)'
                }}
                onMouseEnter={() => setShowConnectorsMenu(true)}
                onMouseLeave={() => {
                  setTimeout(() => setShowConnectorsMenu(false), 150);
                }}
              >
                <div className="py-1">
                  {connectorsData.map((connector) => {
                    const isConnected = connectedApps.includes(connector.id);
                    return (
                      <div 
                        key={connector.id} 
                        className="flex items-center justify-between px-3 py-2.5 hover:bg-[#454545] transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          {connector.icon}
                          <span className="text-white text-sm">{connector.name}</span>
                        </div>
                        <button
                          onClick={() => toggleConnector(connector.id)}
                          className={`w-9 h-5 rounded-full relative transition-colors ${
                            isConnected ? 'bg-blue-500' : 'bg-[#4a4a4a]'
                          }`}
                        >
                          <div className={`w-3.5 h-3.5 bg-white rounded-full absolute top-[3px] transition-all ${
                            isConnected ? 'right-[3px]' : 'left-[3px]'
                          }`}></div>
                        </button>
                      </div>
                    );
                  })}
                  
                  {/* Divider */}
                  <div className="border-t border-[#4a4a4a] my-1"></div>
                  
                  {/* Add connectors */}
                  <button className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-[#454545] transition-colors">
                    <div className="flex items-center gap-3">
                      <Plus className="w-4 h-4 text-[#999999]" />
                      <span className="text-white text-sm">Add connectors</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-red-500 text-xs">N</span>
                      <span className="text-orange-500 text-xs">⚙</span>
                      <span className="text-[#666666] text-xs">+42</span>
                    </div>
                  </button>
                  
                  {/* Manage connectors */}
                  <button className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-[#454545] transition-colors">
                    <Settings className="w-4 h-4 text-[#999999]" />
                    <span className="text-white text-sm">Manage connectors</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-0.5">
          {/* Microphone Button - Always white */}
          <button
            className="p-2 rounded-full bg-white hover:bg-gray-100 transition-colors"
            aria-label="Voice input"
          >
            <Mic className="w-4 h-4 text-[#2b2b2b]" />
          </button>

          {/* Submit Button - Changes based on input */}
          <button
            onClick={handleSubmit}
            className={`p-2 rounded-full transition-colors ml-1 ${
              value.trim() 
                ? 'bg-white hover:bg-gray-100' 
                : 'bg-[#4a4a4a] hover:bg-[#5a5a5a]'
            }`}
            aria-label="Submit"
          >
            <ArrowUp className={`w-4 h-4 ${value.trim() ? 'text-[#2b2b2b]' : 'text-[#808080]'}`} />
          </button>
        </div>
      </div>
      )}
    </div>
  );
};
