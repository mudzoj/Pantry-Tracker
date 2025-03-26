import React, { useState, useEffect, useRef } from "react";

const ZoomInImage = () => {
  const [transform, setTransform] = useState({
    scale: 1,
    translateY: 0
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

      // Calculate animation bounds
      const animationStart = elementTop - viewportHeight;
      const animationEnd = elementTop + elementHeight;
      const scrollRange = animationEnd - animationStart;

      let progress = (scrollY - animationStart) / scrollRange;
      progress = Math.min(1, Math.max(0, progress));

      // Split animation into two phases
      let newScale, newTranslateY;
      if (progress <= 0.5) {
        // Scale up phase (1 -> 2)
        newScale = 1 + progress * 2;
        newTranslateY = 0;
      } else {
        // Move down phase (scale 2 -> 3, translate 0 -> 200px)
        const phaseProgress = (progress - 0.5) / 0.5;
        newScale = 2 + phaseProgress * 1;
        newTranslateY = phaseProgress * 200;
      }

      setTransform({
        scale: newScale,
        translateY: newTranslateY
      });
    };

    const handleScroll = () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      requestRef.current = requestAnimationFrame(updateTransform);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div
      style={{
        height: "50vh", // Increased height for scroll space
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <img
        ref={ref}
        src="/images/pantry_aid.png"
        alt="Zooming Image"
        style={{
          width: "100px",
          height: "100px",
          transform: `translate3d(0, ${transform.translateY}px, 0) scale(${transform.scale})`,
          willChange: "transform",
          backfaceVisibility: "hidden" // Improve performance
        }}
      />
    </div>
  );
};

export default ZoomInImage;