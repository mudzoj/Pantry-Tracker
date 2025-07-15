'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Box } from '@mui/material';

const ZoomInImage = () => {
  const [transform, setTransform] = useState({
    scale: 1,
    translateY: 0,
  });
  const ref = useRef(null);
  const requestRef = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const updateTransform = () => {
      const viewportHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const elementTop = element.offsetTop;
      const elementHeight = element.offsetHeight;

      // Animation bounds
      const animationStart = elementTop - viewportHeight * 0.8; // Start when 80% of element enters viewport
      const animationEnd = elementTop + elementHeight * 0.5; // End halfway through element
      const scrollRange = animationEnd - animationStart;

      let progress = (scrollY - animationStart) / scrollRange;
      progress = Math.min(1, Math.max(0, progress));

      // Smooth easing function (cubic-bezier approximation)
      const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
      const easedProgress = easeOutCubic(progress);

      // Scale from 1 to 2.5, translate upward from 0 to -100px
      const newScale = 1 + easedProgress * 1.5; // 1 -> 2.5
      const newTranslateY = easedProgress * -100; // 0 -> -100px (upward)

      setTransform({
        scale: newScale,
        translateY: newTranslateY,
      });
    };

    const handleScroll = () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      requestRef.current = requestAnimationFrame(updateTransform);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateTransform(); // Initial call to set position

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <Box
      sx={{
        minHeight: { xs: '60vh', sm: '50vh', md: '40vh' }, // Responsive container height
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: { xs: 2, sm: 0 }, // Padding for small screens
      }}
    >
      <Box
        component="img"
        ref={ref}
        src="/images/pantry_aid.png"
        alt="Pantry Aid Logo"
        sx={{
          width: { xs: '80px', sm: '100px', md: '120px', lg: '150px' }, // Responsive width
          maxWidth: 'min(15vw, 150px)', // Cap at 15vw or 150px
          minWidth: '80px', // Minimum size for small screens
          height: 'auto',
          objectFit: 'contain',
          transform: `translate3d(0, ${transform.translateY}px, 0) scale(${transform.scale})`,
          transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)', // Smooth easing
          willChange: 'transform',
          backfaceVisibility: 'hidden',
        }}
      />
    </Box>
  );
};

export default ZoomInImage;

