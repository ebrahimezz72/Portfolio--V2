"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AosInit() {
  const pathname = usePathname();

  useEffect(() => {
    const applyAOS = () => {
      // Find all sections and main elements in the new page
      const elements = document.querySelectorAll('section, main > div');
      
      elements.forEach((element) => {
        if (!element.hasAttribute('data-aos')) {
          element.setAttribute('data-aos', 'fade-up');
        }
      });

      AOS.init({
        disable: false,       // Force enable on mobile explicitly
        once: true,
        duration: 1000,       // Slightly faster so mobile users don't scroll past it before it finishes
        easing: "ease-out-cubic",
        offset: 50,           // Lower offset so it triggers instantly on small viewports
      });
      
      AOS.refresh();
    };

    // A slightly longer delay to ensure the new page DOM is completely hydrated
    const timer = setTimeout(applyAOS, 150);

    return () => clearTimeout(timer);
  }, [pathname]); // <-- This guarantees it runs every time the user swaps pages!

  return null;
}
