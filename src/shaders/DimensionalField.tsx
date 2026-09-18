import React, { useRef, useEffect } from 'react';
import dimensionalHtml from './neuform-isolated/sources/vanguard-dimensional.html?raw';

interface DimensionalFieldProps {
  variant?: 'dimensional-field' | 'void' | 'aurora';
  palette?: 'cyan-purple' | 'aurora';
  opacity?: number;
  className?: string;
  hue?: number;
  saturation?: number;
  brightness?: number;
}

export const DimensionalField: React.FC<DimensionalFieldProps> = ({
  palette = 'cyan-purple',
  opacity = 1,
  className = '',
  hue = 0,
  saturation = 1.0,
  brightness = 1.0,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        {
          type: 'SET_THEME',
          theme: palette === 'aurora' ? 'aurora' : 'void',
        },
        '*'
      );
    }
  }, [palette]);

  const filterStyle = hue !== 0 || saturation !== 1 || brightness !== 1
    ? `hue-rotate(${hue}deg) saturate(${saturation}) brightness(${brightness})`
    : undefined;

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <iframe
        ref={iframeRef}
        srcDoc={dimensionalHtml}
        title="Dimensional Field 3D WebGL Background"
        className="absolute inset-0 w-full h-full border-0 pointer-events-none"
        style={{
          opacity,
          filter: filterStyle,
        }}
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
};
