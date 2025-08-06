'use client';

import React, { useRef, useEffect, useState } from 'react';

const ScrollMoveSection = ({
  children,
  scrollThreshold = 100, // Scroll distance to trigger fade-in (pixels)
  maxTravelDistance = 100, // Max downward movement (pixels)
  moveSpeed = 1, // Multiplier for scroll movement 
  delay = 0, // Delay for fade-in animation (seconds)
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(0);
  const hasTriggered = useRef(false);
  const initialScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      // Trigger fade-in
      if (!hasTriggered.current && window.scrollY >= scrollThreshold) {
        setIsVisible(true);
        hasTriggered.current = true;
        initialScrollY.current = window.scrollY; // Record scroll position at trigger
      }

      // Update downward movement if visible
      if (isVisible) {
        const scrollDistance = window.scrollY - initialScrollY.current;
        const cappedDistance = Math.min(scrollDistance * moveSpeed, maxTravelDistance);
        setScrollOffset(cappedDistance);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isVisible, scrollThreshold, maxTravelDistance, moveSpeed]);

  return (
    <div
      style={{
        opacity: isVisible ? 1 : 0,
        transform: `translateY(${isVisible ? scrollOffset : 20}px)`,
        transition: `opacity 0.6s ease-out ${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

export default ScrollMoveSection;