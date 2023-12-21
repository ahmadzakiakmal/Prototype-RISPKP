import { useState, useEffect } from "react";

const useLastScrollDirection = () => {
  const [lastScrollTop, setLastScrollTop] = useState<number>(0);
  const [scrollDirection, setScrollDirection] = useState<string>("up");

  const onScroll = () => {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (currentScrollTop > lastScrollTop) {
      setScrollDirection("down");
    } else if (currentScrollTop < lastScrollTop) {
      setScrollDirection("up");
    }
    setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop); // For Mobile or negative scrolling
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScrollTop]);

  return scrollDirection;
};

export default useLastScrollDirection;
