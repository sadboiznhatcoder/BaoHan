import React, { useRef, useEffect, useCallback } from 'react';

export default function FadingVideo({ src }) {
  const videoRef = useRef(null);
  const rafRef = useRef(null);
  const stateRef = useRef('idle'); 

  const fadeTo = useCallback((targetOpacity) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const startOpacity = parseFloat(videoRef.current.style.opacity || 0);
    const startTime = performance.now();
    stateRef.current = targetOpacity === 1 ? 'in' : 'out';

    const animate = (time) => {
      const progress = Math.min((time - startTime) / 500, 1);
      const curr = startOpacity + (targetOpacity - startOpacity) * progress;
      if (videoRef.current) videoRef.current.style.opacity = curr.toString();

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        stateRef.current = 'idle';
      }
    };
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  const handleLoadedData = () => {
    if (videoRef.current) {
      videoRef.current.style.opacity = '0';
      videoRef.current.play().catch(() => {});
      fadeTo(1);
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const { duration, currentTime } = videoRef.current;
    if (duration - currentTime <= 0.55 && stateRef.current !== 'out') {
      fadeTo(0);
    }
  };

  const handleEnded = () => {
    if (videoRef.current) {
      videoRef.current.style.opacity = '0';
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.play().catch(() => {});
          fadeTo(1);
        }
      }, 100);
    }
  };

  useEffect(() => {
    return () => rafRef.current && cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      className="absolute inset-0 w-full h-full object-cover z-0"
      style={{ opacity: 0 }}
      autoPlay
      muted
      playsInline
      onLoadedData={handleLoadedData}
      onTimeUpdate={handleTimeUpdate}
      onEnded={handleEnded}
    />
  );
}
