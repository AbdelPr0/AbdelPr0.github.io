
import React from 'react';

interface CRTEffectProps {
  children: React.ReactNode;
}

const CRTEffect: React.FC<CRTEffectProps> = ({ children }) => {
  return (
    <div className="crt-effect animate-screen-flicker">
      {/* Scanline effect */}
      <div className="scan-line"></div>
      {children}
    </div>
  );
};

export default CRTEffect;
