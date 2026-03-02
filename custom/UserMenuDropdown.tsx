import React, { useState } from 'react';
import { 
  Bell, 
  Sparkles, 
  Brain, 
  User, 
  Settings, 
  Home, 
  HelpCircle, 
  LogOut,
  ChevronRight
} from 'lucide-react';

interface UserMenuDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
  userEmail?: string;
  avatarLetter?: string;
  avatarColor?: string;
  credits?: number;
  planName?: string;
  onNavigate?: (page: string) => void;
  onLogout?: () => void;
  onUpgrade?: () => void;
}

export const UserMenuDropdown: React.FC<UserMenuDropdownProps> = ({
  isOpen,
  onClose,
  userName = 'Nassim farid Guemri',
  userEmail = 'guemrinassimfarid@gmail.com',
  avatarLetter,
  avatarColor = '#6b7280',
  credits = 237,
  planName = 'Gratuit',
  onNavigate,
  onLogout,
  onUpgrade
}) => {
  const letter = avatarLetter || userName.charAt(0).toUpperCase();

  if (!isOpen) return null;

  return (
    <>
      {/* Dropdown */}
      <div 
        className="absolute top-full right-0 mt-2 z-50 bg-[#353535] border border-[#4a4a4a] rounded-xl shadow-xl w-[280px] overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? 'translateY(0)' : 'translateY(-10px)',
          pointerEvents: isOpen ? 'auto' : 'none'
        }}
        onMouseEnter={() => {}}
      >
        {/* User Profile Section */}
        <div className="p-4 border-b border-[#4a4a4a]">
          <div className="flex items-center gap-3 mb-3">
            {/* Avatar */}
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
              style={{ backgroundColor: avatarColor }}
            >
              {letter}
            </div>
            
            {/* Name & Switch Account */}
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-white text-[14px] font-medium">{userName}</h4>
                <button className="text-[#606060] hover:text-white transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 3h5v5M8 21H3v-5M21 3l-7.5 7.5M3 21l7.5-7.5"/>
                  </svg>
                </button>
              </div>
              <p className="text-[#606060] text-[12px]">{userEmail}</p>
            </div>
          </div>

          {/* Plan & Upgrade */}
          <div className="flex items-center justify-between">
            <span className="text-white text-[14px] font-medium">{planName}</span>
            <button
              onClick={onUpgrade}
              className="px-3 py-1 bg-white text-black text-[12px] font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              Mise à niveau
            </button>
          </div>

          {/* Credits */}
          <button 
            onClick={() => { onNavigate?.('utilisation'); onClose(); }}
            className="flex items-center justify-between w-full mt-3 py-1 text-[14px] group"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#808080]" />
              <span className="text-white">Crédits</span>
            </div>
            <div className="flex items-center gap-1 text-white">
              <span>{credits}</span>
              <ChevronRight className="w-4 h-4 text-[#808080] group-hover:text-white transition-colors" />
            </div>
          </button>
        </div>

        {/* Menu Items */}
        <div className="py-2">
          <MenuButton 
            icon={<Brain className="w-[18px] h-[18px]" />} 
            label="Connaissance"
            onClick={() => { onNavigate?.('knowledge'); onClose(); }}
          />
          <MenuButton 
            icon={<User className="w-[18px] h-[18px]" />} 
            label="Compte"
            onClick={() => { onNavigate?.('compte'); onClose(); }}
          />
          <MenuButton 
            icon={<Settings className="w-[18px] h-[18px]" />} 
            label="Paramètres"
            onClick={() => { onNavigate?.('parametres'); onClose(); }}
          />
          <MenuButton 
            icon={<Home className="w-[18px] h-[18px]" />} 
            label="Page d'accueil"
            onClick={() => { onNavigate?.('home'); onClose(); }}
          />
          <MenuButton 
            icon={<HelpCircle className="w-[18px] h-[18px]" />} 
            label="Obtenir de l'aide"
            onClick={() => { onNavigate?.('help'); onClose(); }}
          />
        </div>

        {/* Logout */}
        <div className="py-2 border-t border-[#4a4a4a]">
          <MenuButton 
            icon={<LogOut className="w-[18px] h-[18px]" />} 
            label="Se déconnecter"
            onClick={() => { onLogout?.(); onClose(); }}
            variant="danger"
          />
        </div>
      </div>
    </>
  );
};

// Menu Button Helper
const MenuButton: React.FC<{
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  variant?: 'default' | 'danger';
}> = ({ icon, label, onClick, variant = 'default' }) => (
  <button
    onClick={onClick}
    className={`
      w-full flex items-center gap-3 px-4 py-2.5 transition-colors text-left
      ${variant === 'danger' 
        ? 'text-red-400 hover:bg-red-500/10' 
        : 'text-white hover:bg-[#404040]'
      }
    `}
  >
    <span className={variant === 'danger' ? 'text-red-400' : 'text-white'}>
      {icon}
    </span>
    <span className="text-[14px]">{label}</span>
  </button>
);

// Header Notification Bar
interface HeaderNotificationBarProps {
  credits?: number;
  userName?: string;
  avatarColor?: string;
  hasNotifications?: boolean;
  onNotificationClick?: () => void;
  onCreditsHover?: (show: boolean) => void;
  onAvatarHover?: (show: boolean) => void;
}

export const HeaderNotificationBar: React.FC<HeaderNotificationBarProps> = ({
  credits = 237,
  userName = 'N',
  avatarColor = '#6b7280',
  hasNotifications = false,
  onNotificationClick,
  onCreditsHover,
  onAvatarHover
}) => {
  const letter = userName.charAt(0).toUpperCase();

  return (
    <div className="flex items-center gap-6 relative">
      {/* Notification Bell */}
      <button
        onClick={onNotificationClick}
        onMouseEnter={() => {
          onCreditsHover?.(false);
          onAvatarHover?.(false);
        }}
        className="relative p-2 rounded-lg hover:bg-[#353535] transition-colors"
      >
        <Bell className="w-5 h-5 text-white" />
        {hasNotifications && (
          <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        )}
      </button>

      {/* Separator */}
      <div className="w-px h-5 bg-[#404040]" />

      {/* Credits */}
      <button
        onMouseEnter={() => {
          onCreditsHover?.(true);
          onAvatarHover?.(false);
        }}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-[#353535] transition-colors"
      >
        <Sparkles className="w-4 h-4 text-white" />
        <span className="text-white text-[14px]">{credits}</span>
      </button>

      {/* Separator */}
      <div className="w-px h-5 bg-[#404040]" />

      {/* Avatar */}
      <button
        onMouseEnter={() => {
          onAvatarHover?.(true);
          onCreditsHover?.(false);
        }}
        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium hover:ring-2 hover:ring-[#404040] transition-all"
        style={{ backgroundColor: avatarColor }}
      >
        {letter}
      </button>
    </div>
  );
};

// Credits Popover
interface CreditsPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  credits?: number;
  freeCredits?: number;
  dailyCredits?: number;
  planName?: string;
  onUpgrade?: () => void;
  onViewUsage?: () => void;
}

export const CreditsPopover: React.FC<CreditsPopoverProps> = ({
  isOpen,
  onClose,
  credits = 0,
  freeCredits = 0,
  dailyCredits = 237,
  planName = 'Gratuit',
  onUpgrade,
  onViewUsage
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="absolute top-full right-0 mt-2 z-50 bg-[#2d2d2d] border border-[#404040] rounded-xl shadow-xl w-[300px] p-4 transition-all duration-300 ease-in-out"
      style={{
        opacity: isOpen ? 1 : 0,
        transform: isOpen ? 'translateY(0)' : 'translateY(-10px)'
      }}
    >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-white text-[16px] font-semibold">{planName}</span>
          <button
            onClick={onUpgrade}
            className="px-3 py-1.5 bg-white text-black text-[12px] font-medium rounded-lg hover:bg-gray-100 transition-colors"
          >
            Mise à niveau
          </button>
        </div>

        {/* Credits */}
        <div className="space-y-3">
          {/* الأرصدة المشتراة */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#808080]" />
              <span className="text-white text-[14px]">Crédits</span>
              <HelpCircle className="w-3.5 h-3.5 text-[#808080]" />
            </div>
            <span className="text-white text-[14px] font-semibold">{credits}</span>
          </div>
          <div className="text-[#808080] text-[12px] ml-6">Crédits achetés</div>

          {/* الأرصدة اليومية */}
          <div className="flex items-center justify-between pt-2 border-t border-[#404040] mt-3 pt-3">
            <span className="text-white text-[14px]">Crédits quotidiens</span>
            <span className="text-white text-[14px] font-semibold">{dailyCredits}</span>
          </div>
          <div className="text-[#808080] text-[12px]">Offerts chaque jour</div>
        </div>

        {/* View Usage Link */}
        <button
          onClick={() => { onViewUsage?.(); onClose(); }}
          className="flex items-center gap-1 mt-4 text-white hover:text-gray-300 text-[14px] transition-colors"
        >
          <span>Voir l'utilisation</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
  );
};
