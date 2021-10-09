import { useState, useEffect } from 'react';

export default function useWindowDimensions() {

    const hasWindow = typeof window !== 'undefined';
  
    function getWindowDimensions() {
      const width = hasWindow ? window.width : null;
      const height = hasWindow ? window.height : null;
      return {
        width,
        height,
      };
    }
  
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  
    useEffect(() => {
      if (hasWindow) {
        function handleResize() {
          setWindowDimensions(getWindowDimensions());
        }
  
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }
    }, [hasWindow]);
  
    return windowDimensions;
  }