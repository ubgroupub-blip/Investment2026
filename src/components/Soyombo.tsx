import React from 'react';

interface SoyomboProps {
  className?: string;
  fill?: string;
}

/**
 * Mathematically composed SVG representation of the Mongolian Soyombo Symbol (Соёмбо)
 */
export const Soyombo: React.FC<SoyomboProps> = ({
  className = 'w-10 h-20',
  fill = '#FFD700',
}) => {
  return (
    <svg
      viewBox="0 0 100 200"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Mongolian Soyombo Symbol"
    >
      {/* 1. Fire (Flames with 3 tips) */}
      <path
        d="M 50,8 
           C 53,16 57,20 62,24
           C 58,25 56,23 54,20
           C 58,28 66,32 64,40
           C 60,42 56,38 52,35
           C 51,42 50,44 50,45
           C 50,44 49,42 48,35
           C 44,38 40,42 36,40
           C 34,32 42,28 46,20
           C 44,23 42,25 38,24
           C 43,20 47,16 50,8 Z"
        fill={fill}
      />

      {/* 2. Sun (Circle) */}
      <circle cx="50" cy="58" r="8" fill={fill} />

      {/* 3. Moon (Crescent) */}
      <path
        d="M 37,56 
           A 14 14 0 0 0 63 56 
           A 11 11 0 0 1 37 56 Z"
        fill={fill}
      />

      {/* 4. Left Pillar (Vertical bar) */}
      <rect x="24" y="68" width="6.5" height="114" rx="1" fill={fill} />

      {/* 5. Right Pillar (Vertical bar) */}
      <rect x="69.5" y="68" width="6.5" height="114" rx="1" fill={fill} />

      {/* 6. Upper Triangle (Pointing Down) */}
      <polygon points="35,68 65,68 50,83" fill={fill} />

      {/* 7. Upper Horizontal Rectangle */}
      <rect x="35" y="87" width="30" height="6.5" rx="1" fill={fill} />

      {/* 8. Center Yin-Yang / Fish Symbol (Taijitu) */}
      <circle cx="50" cy="115" r="14" fill={fill} />
      {/* Inner teardrop/swirls */}
      <path
        d="M 50,101 
           A 7 7 0 0 1 50 115 
           A 7 7 0 0 0 50 129 
           A 14 14 0 0 1 50 101 Z"
        fill="#C41E3A"
      />
      {/* Small dot eyes */}
      <circle cx="50" cy="108" r="2.2" fill={fill} />
      <circle cx="50" cy="122" r="2.2" fill="#C41E3A" />

      {/* 9. Lower Horizontal Rectangle */}
      <rect x="35" y="136" width="30" height="6.5" rx="1" fill={fill} />

      {/* 10. Lower Triangle (Pointing Down) */}
      <polygon points="35,147 65,147 50,162" fill={fill} />
    </svg>
  );
};
