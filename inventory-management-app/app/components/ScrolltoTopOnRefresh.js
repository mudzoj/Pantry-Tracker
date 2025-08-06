import { useEffect } from "react";

const ScrollToTopOnRefresh = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); 

  return null; 
};

export default ScrollToTopOnRefresh;