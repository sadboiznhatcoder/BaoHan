import React, { useRef, useEffect, useCallback } from 'react';

export default function FadingVideo({ src, className, style }) {
  const videoRef = useRef(null);
  const rafRef = useRef(null);
  const fadeStateRef = useRef('idle'); // 'in', 'out', 'idle'

  const FADE_MS = 500;
  const FADE_OUT_LEAD = 0.55; // 550ms

  const fadeTo = useCallback((targetOpacity) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const startOpacity = parseFloat(videoRef.current.style?.opacity || 0);
    const startTime = performance.now();
    fadeStateRef.current = targetOpacity === 1 ? 'in' : 'out';

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / FADE_MS, 1);
      
      const currentOpacity = startOpacity + (targetOpacity - startOpacity) * progress;
      if (videoRef.current) {
        videoRef.current.style.opacity = currentOpacity.toString();
      }

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        fadeStateRef.current = 'idle';
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
    if (duration - currentTime <= FADE_OUT_LEAD && fadeStateRef.current !== 'out') {
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
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      className={className}
      style={{ opacity: 0, ...style }}
      autoPlay
      muted
      playsInline
      preload="auto"
      onLoadedData={handleLoadedData}
      onTimeUpdate={handleTimeUpdate}
      onEnded={handleEnded}
    />
  );
}
