import React, { useState } from 'react';
import { 
  Monitor, 
  Smartphone, 
  Home, 
  ExternalLink, 
  RefreshCw, 
  Maximize2,
  Minimize2,
  X,
  Clock,
  Settings,
  FileText,
  FolderOpen,
  Upload
} from 'lucide-react';

// أيقونة Code مخصصة
const CodeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="16,18 22,12 16,6" />
    <polyline points="8,6 2,12 8,18" />
  </svg>
);

// أيقونة Preview مخصصة
const PreviewIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

// أيقونة Edit مخصصة
const EditIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
  </svg>
);

interface PreviewPanelProps {
  isLoading?: boolean;
  loadingMessage?: string;
  downloadLink?: string;
  currentPath?: string;
  activeTab?: 'preview' | 'code' | 'files' | 'console' | 'settings';
  previewUrl?: string;  // URL for live preview iframe
  projectName?: string; // Name of the current project
  isFullscreen?: boolean; // Fullscreen mode
  onTabChange?: (tab: string) => void;
  onPublish?: () => void;
  onClose?: () => void;
  onRefresh?: () => void;
  onEdit?: () => void;
  onFullscreen?: () => void;
  onOpenInNewTab?: () => void;
  children?: React.ReactNode;
}

export const PreviewPanel: React.FC<PreviewPanelProps> = ({
  isLoading = true,
  loadingMessage = "Manus is building the website. Hang tight!",
  downloadLink = "Download app",
  currentPath = "/",
  activeTab = 'preview',
  previewUrl,
  projectName,
  isFullscreen = false,
  onTabChange,
  onPublish,
  onClose,
  onRefresh,
  onEdit,
  onFullscreen,
  onOpenInNewTab,
  children
}) => {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [iframeKey, setIframeKey] = useState(0);

  // Function to refresh the iframe
  const handleRefresh = () => {
    setIframeKey(prev => prev + 1);
    onRefresh?.();
  };

  return (
    <div className="flex flex-col h-full">
      
      {/* === Header Bar - خارج البطاقة === */}
      <div className="flex items-center justify-between px-2 py-2 bg-transparent">
        
        {/* Left Side - Tabs */}
        <div className="flex items-center gap-1">
          {/* Preview Tab - Active */}
          <button 
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors ${
              activeTab === 'preview' 
                ? 'bg-[#3a3a3a] text-white' 
                : 'text-[#808080] hover:text-white hover:bg-[#353535]'
            }`}
            onClick={() => onTabChange?.('preview')}
          >
            <PreviewIcon />
            <span>Preview</span>
          </button>

          {/* Code Button */}
          <button 
            className="p-2 rounded-md text-[#808080] hover:text-white hover:bg-[#353535] transition-colors"
            onClick={() => onTabChange?.('code')}
          >
            <CodeIcon />
          </button>

          {/* Refresh Button */}
          <button 
            className="p-2 rounded-md text-[#808080] hover:text-white hover:bg-[#353535] transition-colors"
            onClick={handleRefresh}
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          {/* Files Button */}
          <button 
            className="p-2 rounded-md text-[#808080] hover:text-white hover:bg-[#353535] transition-colors"
            onClick={() => onTabChange?.('files')}
          >
            <FolderOpen className="w-4 h-4" />
          </button>

          {/* Document Button */}
          <button 
            className="p-2 rounded-md text-[#808080] hover:text-white hover:bg-[#353535] transition-colors"
            onClick={() => onTabChange?.('console')}
          >
            <FileText className="w-4 h-4" />
          </button>

          {/* Settings Button */}
          <button 
            className="p-2 rounded-md text-[#808080] hover:text-white hover:bg-[#353535] transition-colors"
            onClick={() => onTabChange?.('settings')}
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>

        {/* Right Side - Actions */}
        <div className="flex items-center gap-1">
          {/* Clock/History */}
          <button className="p-2 rounded-md text-[#808080] hover:text-white hover:bg-[#353535] transition-colors">
            <Clock className="w-4 h-4" />
          </button>

          {/* Open in new tab - زر فتح في نافذة جديدة */}
          {previewUrl && (
            <button 
              className="p-2 rounded-md text-[#808080] hover:text-blue-400 hover:bg-[#353535] transition-colors"
              onClick={onOpenInNewTab}
              title="فتح في نافذة جديدة"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
          )}

          {/* Fullscreen Toggle - زر التكبير */}
          <button 
            className="p-2 rounded-md text-[#808080] hover:text-green-400 hover:bg-[#353535] transition-colors"
            onClick={onFullscreen}
            title={isFullscreen ? "تصغير" : "ملء الشاشة"}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Publish Button - أبيض مثل Manus */}
          <button 
            className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm bg-white text-black font-medium hover:bg-gray-100 transition-colors"
            onClick={onPublish}
          >
            <Upload className="w-4 h-4" />
            <span>Publish</span>
            {/* Blue dot indicator */}
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
          </button>

          {/* Close Button */}
          <button 
            className="p-2 rounded-md text-[#808080] hover:text-white hover:bg-[#353535] transition-colors"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* === البطاقة الرئيسية - لون موحد === */}
      <div className="flex-1 flex flex-col rounded-lg overflow-hidden bg-[#353535] border border-[#4a4a4a]">
        
        {/* === Navigation Bar - داخل البطاقة === */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-[#4a4a4a]">
          
          {/* Left Side - Device Toggle */}
          <div className="flex items-center gap-1 bg-[#2b2b2b] rounded-md p-1">
            <button 
              className={`p-1.5 rounded transition-colors ${
                viewMode === 'desktop' 
                  ? 'bg-[#4a4a4a] text-white' 
                  : 'text-[#808080] hover:text-white'
              }`}
              onClick={() => setViewMode('desktop')}
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button 
              className={`p-1.5 rounded transition-colors ${
                viewMode === 'mobile' 
                  ? 'bg-[#4a4a4a] text-white' 
                  : 'text-[#808080] hover:text-white'
              }`}
              onClick={() => setViewMode('mobile')}
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>

          {/* Center - URL Bar with Open Button */}
          <div className="flex items-center gap-2 bg-[#2b2b2b] rounded-md px-2 py-1">
            <button className="p-1 rounded text-[#808080] hover:text-white transition-colors">
              <Home className="w-3.5 h-3.5" />
            </button>
            <span className="text-[#a0a0a0] text-sm max-w-[200px] truncate">{previewUrl || currentPath}</span>
            {/* زر فتح الرابط في نافذة جديدة */}
            {previewUrl && (
              <button 
                onClick={onOpenInNewTab}
                className="p-1 rounded text-[#808080] hover:text-blue-400 transition-colors"
                title="فتح في نافذة جديدة"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Center Right - Refresh */}
          <div className="flex items-center gap-1">
            <button 
              className="p-1.5 rounded-md text-[#808080] hover:text-white hover:bg-[#4a4a4a] transition-colors"
              onClick={handleRefresh}
              title="تحديث"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          {/* Right Side - Edit & Fullscreen */}
          <div className="flex items-center gap-1">
            <button 
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-sm text-[#808080] hover:text-white hover:bg-[#4a4a4a] transition-colors"
              onClick={onEdit}
            >
              <EditIcon />
              <span>Edit</span>
            </button>
            <button 
              className="p-1.5 rounded-md text-[#808080] hover:text-white hover:bg-[#4a4a4a] transition-colors"
              onClick={onFullscreen}
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* === Content Area - منطقة المحتوى === */}
        <div className="flex-1 flex items-center justify-center overflow-hidden">
          {isLoading ? (
            <div className="flex flex-col items-center gap-4">
              {/* Loading Animation - Website Skeleton */}
              <div className="w-[200px] p-4 rounded-lg border border-[#4a4a4a] bg-[#4a4a4a]">
                {/* Browser dots */}
                <div className="flex gap-1 mb-3">
                  <div className="w-2 h-2 rounded-full bg-[#5a5a5a]"></div>
                  <div className="w-2 h-2 rounded-full bg-[#5a5a5a]"></div>
                  <div className="w-2 h-2 rounded-full bg-[#5a5a5a]"></div>
                </div>
                {/* Skeleton content */}
                <div className="flex gap-3 mb-3">
                  <div className="w-16 h-12 rounded bg-[#5a5a5a]"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-3 rounded bg-[#5a5a5a] w-full"></div>
                    <div className="h-3 rounded bg-[#5a5a5a] w-3/4"></div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1 h-8 rounded bg-[#5a5a5a]"></div>
                  <div className="flex-1 h-8 rounded bg-[#5a5a5a]"></div>
                </div>
              </div>

              {/* Loading Text */}
              <div className="text-center">
                <p className="text-[#808080] text-sm">{loadingMessage}</p>
                {projectName && (
                  <p className="text-blue-400 text-xs mt-1">Project: {projectName}</p>
                )}
                <a href="#" className="text-blue-400 text-sm hover:underline">
                  {downloadLink} and get notified when it's ready.
                </a>
              </div>
            </div>
          ) : previewUrl ? (
            /* Live Preview iframe */
            <div className={`h-full bg-white transition-all duration-300 ${
              viewMode === 'mobile' ? 'w-[375px] rounded-lg shadow-xl' : 'w-full'
            }`}>
              <iframe
                key={iframeKey}
                src={previewUrl}
                className="w-full h-full border-0"
                title="Live Preview"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              />
            </div>
          ) : (
            children || (
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="w-16 h-16 rounded-full bg-[#4a4a4a] flex items-center justify-center">
                  <Monitor className="w-8 h-8 text-[#808080]" />
                </div>
                <div>
                  <p className="text-white font-medium">No Preview Available</p>
                  <p className="text-[#808080] text-sm mt-1">
                    Send a message to build a website and see the preview here
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};
