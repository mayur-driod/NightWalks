import React, { useEffect, useState } from "react";
import { FaCartArrowDown } from "react-icons/fa";

const ScrollToBottomButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const checkVisibility = () => {
      const scrollPos = window.scrollY + window.innerHeight;
      const pageHeight = document.body.scrollHeight;

      const isAtBottom = scrollPos >= pageHeight - 50;
      const isMobileOrTablet = window.innerWidth < 768; // matches md:flex-row in buy.jsx

      setShowButton(!isAtBottom && isMobileOrTablet);
    };

    window.addEventListener("scroll", checkVisibility);
    window.addEventListener("resize", checkVisibility);
    checkVisibility();

    return () => {
      window.removeEventListener("scroll", checkVisibility);
      window.removeEventListener("resize", checkVisibility);
    };
  }, []);

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  if (!showButton) return null;

  return (
    <button
      onClick={scrollToBottom}
      className="fixed bottom-10 right-10 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition"
    >
      <FaCartArrowDown size={28} />
    </button>
  );
};

export default ScrollToBottomButton;
