import React from 'react';

interface PlanBadgeProps {
  planName?: string;
  showUpgrade?: boolean;
  onUpgrade?: () => void;
}

export const PlanBadge: React.FC<PlanBadgeProps> = ({
  planName = 'Plan gratuit',
  showUpgrade = true,
  onUpgrade
}) => {
  return (
    <div className="inline-flex items-center gap-3 bg-[#252525] rounded-full px-4 py-2 border border-[#353535]">
      <span className="text-[#a0a0a0] text-[14px]">{planName}</span>
      {showUpgrade && (
        <>
          <div className="w-px h-4 bg-[#404040]" />
          <button
            onClick={onUpgrade}
            className="text-blue-400 hover:text-blue-300 text-[14px] font-medium transition-colors"
          >
            Mise à niveau
          </button>
        </>
      )}
    </div>
  );
};
