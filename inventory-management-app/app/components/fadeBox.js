'use client';

import React, { useRef, useEffect, useState } from 'react';

const FadeInSection = ({ children, scrollThreshold = 100, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const hasTriggered = useRef(false); // Prevent repeated triggers

  useEffect(() => {
    const handleScroll = () => {
      if (!hasTriggered.current && window.scrollY >= scrollThreshold) {
        setIsVisible(true);
        hasTriggered.current = true; // Mark as triggered
      }
    };

    // Trigger immediately
    if (scrollThreshold === 0 && !hasTriggered.current) {
      window.addEventListener('scroll', handleScroll, { passive: true });
    } else if (!hasTriggered.current) {
      // Trigger after reaching scrollThreshold
      window.addEventListener('scroll', handleScroll, { passive: true });
    }

    // Cleanup event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollThreshold]);

  return (
    <div
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.6s ease-out ${delay}s, transform 0.6s ease-out ${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

export default FadeInSection;