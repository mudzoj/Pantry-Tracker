import { useEffect } from "react";

const ScrollToTopOnRefresh = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); // Runs once on mount

  return null; // This component does not render anything
};

export default ScrollToTopOnRefresh;