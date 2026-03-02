// Connector Icons - Matching Manus screenshot exactly
import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

// Browser icon - globe style like Manus
export const BrowserIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

// Gmail icon - red envelope
export const GmailIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24">
    <path fill="#EA4335" d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
  </svg>
);

// Google Calendar icon - colorful calendar
export const GoogleCalendarIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24">
    <path fill="#4285F4" d="M18 4h-1V2h-2v2H9V2H7v2H6c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z"/>
    <path fill="#fff" d="M6 9h12v11H6z"/>
    <path fill="#EA4335" d="M8 13h3v3H8z"/>
    <path fill="#FBBC04" d="M13 13h3v3h-3z"/>
    <path fill="#34A853" d="M8 17h3v2H8z"/>
    <path fill="#4285F4" d="M13 17h3v2h-3z"/>
  </svg>
);

// Google Drive icon - triangle
export const GoogleDriveIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24">
    <path fill="#4285F4" d="M7.71 3.5L1.15 15l2.86 4.99L10.57 8.5z"/>
    <path fill="#FBBC04" d="M22.85 15L16.29 3.5H7.71l6.56 11.5z"/>
    <path fill="#34A853" d="M14.29 15H1.15l2.86 5h17.13l2.86-5z"/>
  </svg>
);

// Outlook icon - blue O
export const OutlookIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24">
    <path fill="#0078D4" d="M24 7.387v10.478c0 .23-.08.424-.238.576-.158.154-.352.23-.582.23h-8.547v-6.959l1.6 1.229c.103.086.23.129.379.129.148 0 .277-.043.379-.129L24 7.387zM24 5.283v1.354l-7.067 5.418-1.57 1.203c-.05.035-.148.052-.247.052s-.195-.017-.246-.052l-1.57-1.203L6.233 6.637V5.283c0-.23.08-.424.238-.576.159-.154.352-.23.582-.23h16.365c.23 0 .424.076.582.23.158.152.238.346.238.576z"/>
    <path fill="#0078D4" d="M0 7.652v8.696c0 .652.527 1.18 1.179 1.18h7.18V6.472H1.18C.527 6.472 0 7 0 7.652z"/>
    <ellipse fill="#fff" cx="4.77" cy="12" rx="2.5" ry="3"/>
  </svg>
);

// Outlook Calendar icon
export const OutlookCalendarIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24">
    <rect fill="#0078D4" width="24" height="24" rx="4"/>
    <rect fill="#fff" x="4" y="6" width="16" height="14" rx="1"/>
    <rect fill="#0078D4" x="4" y="6" width="16" height="4"/>
    <text x="12" y="17" textAnchor="middle" fill="#0078D4" fontSize="8" fontWeight="bold">15</text>
  </svg>
);

// GitHub icon
export const GitHubIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

// Notion icon (for "Ajouter des connecteurs")
export const NotionIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 2.028c-.466-.373-.98-.653-2.055-.56L2.451 2.724c-.466.046-.56.28-.374.466l2.382 1.018z"/>
  </svg>
);

// Plus icon
export const PlusIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

// Settings icon
export const SettingsIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3"/>
    <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
  </svg>
);

// Icon resolver
export const getConnectorIcon = (iconName: string): React.FC<IconProps> => {
  const icons: Record<string, React.FC<IconProps>> = {
    browser: BrowserIcon,
    gmail: GmailIcon,
    google_calendar: GoogleCalendarIcon,
    google_drive: GoogleDriveIcon,
    outlook: OutlookIcon,
    outlook_calendar: OutlookCalendarIcon,
    github: GitHubIcon,
    notion: NotionIcon,
    plus: PlusIcon,
    settings: SettingsIcon,
  };
  return icons[iconName] || BrowserIcon;
};
