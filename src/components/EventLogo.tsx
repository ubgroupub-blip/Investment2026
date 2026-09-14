import React from 'react';

interface EventLogoProps {
  className?: string;
  variant?: 'header' | 'hero' | 'pass' | 'badge' | 'footer';
  alt?: string;
}

export const EventLogo: React.FC<EventLogoProps> = ({
  className = 'h-10 w-auto',
  variant = 'header',
  alt = 'MI 2026 - High-Level Investment Dialogue',
}) => {
  const getContainerClass = () => {
    switch (variant) {
      case 'header':
        return 'flex items-center';
      case 'hero':
        return 'inline-flex items-center';
      case 'pass':
        return 'flex justify-center';
      case 'footer':
        return 'flex items-center';
      case 'badge':
      default:
        return 'inline-flex items-center';
    }
  };

  return (
    <div className={`${getContainerClass()} select-none`}>
      <img
        src="/mi_2026_logo.jpg"
        alt={alt}
        referrerPolicy="no-referrer"
        className={`object-contain rounded-lg shadow-sm bg-white p-1 border border-slate-700/60 ${className}`}
      />
    </div>
  );
};
