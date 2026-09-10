import React from 'react';
import { Soyombo } from './Soyombo';

interface MongolianFlagProps {
  className?: string;
  variant?: 'standard' | 'badge' | 'ribbon' | 'rounded';
  aspect?: '1:2' | '2:3' | '3:4';
  showShadow?: boolean;
}

export const MongolianFlag: React.FC<MongolianFlagProps> = ({
  className = 'w-16 h-8',
  variant = 'standard',
  showShadow = true,
}) => {
  const roundedClasses = 
    variant === 'rounded' 
      ? 'rounded-lg overflow-hidden' 
      : variant === 'badge' 
        ? 'rounded-md overflow-hidden ring-1 ring-amber-400/40' 
        : 'rounded-sm overflow-hidden';

  const shadowClass = showShadow ? 'shadow-md shadow-black/40' : '';

  return (
    <div
      className={`relative inline-flex select-none border border-black/20 ${roundedClasses} ${shadowClass} ${className}`}
      style={{ aspectRatio: '2 / 1' }}
      title="Монгол Улсын Төрийн далбаа (Flag of Mongolia)"
    >
      {/* Stripe 1: Red (Hoist) */}
      <div className="relative h-full w-1/3 bg-[#C41E3A] flex items-center justify-center">
        {/* Soyombo in hoist stripe */}
        <div className="w-4/5 h-4/5 flex items-center justify-center p-0.5">
          <Soyombo className="w-full h-full object-contain filter drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]" fill="#FFD700" />
        </div>
      </div>

      {/* Stripe 2: Blue (Mongolian Blue Sky) */}
      <div className="h-full w-1/3 bg-[#0055A5] relative overflow-hidden">
        {/* Subtle silk luster line */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />
      </div>

      {/* Stripe 3: Red (Fly) */}
      <div className="h-full w-1/3 bg-[#C41E3A] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-transparent pointer-events-none" />
      </div>
    </div>
  );
};
