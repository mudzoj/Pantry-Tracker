import { useEffect, useState, useRef } from 'react';
import { Box } from '@mui/material';

const FadeInSelection = ({ 
  children, 
  threshold = 0.4,       // Trigger when 20% visible
  fadeOutThreshold = 0.4,// Fade out when less than 10% visible
  rootMargin = '-100px',    // No early trigger by default
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Fade IN when crossing the higher threshold
        if (entry.intersectionRatio >= threshold) {
          setIsVisible(true);
        } 
        // Fade OUT when below the lower threshold (scrolling up)
        else if (entry.intersectionRatio < fadeOutThreshold) {
          setIsVisible(false);
        }
      },
      { 
        threshold: [fadeOutThreshold, threshold], // Track both thresholds
        rootMargin 
      }
    );

    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [threshold, fadeOutThreshold, rootMargin]);

  return (
    <Box
      ref={domRef}
      sx={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 1.6s ease, transform 1.0s ease',
        willChange: 'opacity, transform'
      }}
    >
      {children}
    </Box>
  );
};

export default FadeInSelection;