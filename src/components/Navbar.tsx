import React, { useState, useEffect, useCallback, useRef } from "react";
import { NavLinks } from "@/components/navbar/NavLinks";
import { MobileMenu } from "@/components/navbar/MobileMenu";
import { PromoBanner } from "@/components/navbar/PromoBanner";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSelector } from "@/components/LanguageSelector";
// import { UserMenu } from "@/components/auth/UserMenu";
import { useTranslation } from "@/hooks/useTranslation";
import { useIsMobile } from "@/hooks/useMobile";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Logo } from "./navbar/Logo";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const prevScrollY = useRef(0);
  const [navVisible, setNavVisible] = useState(true);
  const location = usePathname();
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  
  // Special pages require different navbar behavior
  const specialPages = ['/gallery', '/punishment', '/about', '/profile'];
  const isSpecialPage = specialPages.some(page => location.toLowerCase().startsWith(page));
  
  const handleBannerClose = useCallback(() => {
    setShowBanner(false);
  }, []);
  
  // Improved scroll handler with better behavior
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    
    // Always show navbar on special pages or when at the top
    if (currentScrollY < 10) {
      setIsScrolled(false);
      setNavVisible(true);
      setShowBanner(location.toLowerCase() === '/');
      prevScrollY.current = currentScrollY;
      return;
    }
    
    // Update scrolled state
    setIsScrolled(true);
    
    // Determine scroll direction
    const scrollingDown = currentScrollY > prevScrollY.current;
    const scrollDelta = Math.abs(currentScrollY - prevScrollY.current);
    
    // Only react to significant scroll changes
    if (scrollDelta > 5) {
      if (scrollingDown) {
        // Don't hide banner immediately when scrolling down
        if (currentScrollY > 150) {
          setShowBanner(false);
          if (!isMobile && currentScrollY > 200) {
            setNavVisible(false);
          }
        }
      } else {
        setNavVisible(true);
        // Show banner when scrolling back to top and on home page
        if (currentScrollY < 50 && location.toLowerCase() === '/') {
          setShowBanner(true);
        }
      }
      
      prevScrollY.current = currentScrollY;
    }
  }, [isMobile, location.toLowerCase()]);
  
  useEffect(() => {
    // Enhanced throttle for scroll event - better performance
    let ticking = false;
    let lastScrollTime = 0;
    const scrollThrottleMs = isMobile ? 150 : 100; // Increased throttle time for mobile
    
    const scrollListener = () => {
      const now = Date.now();
      
      if (!ticking && now - lastScrollTime > scrollThrottleMs) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
          lastScrollTime = now;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", scrollListener, { passive: true });
    
    // Initial check for scroll position
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, [handleScroll, isMobile]);
  
  // Force navbar to be always visible on special pages
  useEffect(() => {
    if (isSpecialPage) {
      setNavVisible(true);
      setShowBanner(false);
    } else if (location.toLowerCase() === '/' && window.scrollY < 50) {
      setShowBanner(true);
    }
  }, [location, isSpecialPage]);

  // Close mobile menu on route change
  useEffect(() => {
    setShowMobileMenu(false);
  }, [location]);

  const isHomePage = location.toLowerCase() === "/";

  const promoMessages = [
    "🎮 Join our server's anniversary celebration! Special rewards for everyone!",
    "🏆 New PvP tournament starting this weekend! Register now!",
    "🌍 Discover our newest world expansion with unique biomes and treasures!",
    "🔥 Limited-time Summer discount: 30% off all store items!"
  ];

  const closeMobileMenu = () => {
    setShowMobileMenu(false);
  };

  return (
    <>
      <header 
        className="fixed left-0 right-0 z-50 flex flex-col transition-all duration-300 w-full top-0"
      >
        {/* PromoBanner with proper handling */}
        {isHomePage && (
          <div 
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              showBanner ? 'max-h-16' : 'max-h-0'
            }`}
          >
            <PromoBanner promos={promoMessages} onClose={handleBannerClose} />
          </div>
        )}
        
        {/* Main navbar */}
        <div
          className={`border-b transition-all duration-300 ${
            isScrolled || isSpecialPage
              ? "bg-background/95 backdrop-blur-md border-border shadow-md"
              : "bg-background/80 backdrop-blur-sm border-transparent"
          }`}
        >
          <div className="container flex items-center justify-between h-16 px-4 sm:px-6">
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-2 z-10">
                <Logo/>
              </Link>
              <NavLinks t={t} onClose={closeMobileMenu} />
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2">
                <LanguageSelector />
                <ThemeToggle />
                {/* <UserMenu /> */}
              </div>
              
              <button 
                className="md:hidden p-2 rounded-md hover:bg-muted/80 transition-colors"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                aria-label="Toggle mobile menu"
                aria-expanded={showMobileMenu}
              >
                <div className="w-6 h-5 relative flex flex-col justify-between items-center">
                  <span className={`block w-6 h-0.5 bg-foreground rounded-full transition-all duration-300 ${showMobileMenu ? 'absolute top-2 rotate-45' : ''}`}></span>
                  <span className={`block w-6 h-0.5 bg-foreground rounded-full transition-all duration-300 ${showMobileMenu ? 'opacity-0' : ''}`}></span>
                  <span className={`block w-6 h-0.5 bg-foreground rounded-full transition-all duration-300 ${showMobileMenu ? 'absolute top-2 -rotate-45' : ''}`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Mobile menu with AnimatePresence for proper animations */}
      <AnimatePresence>
        {showMobileMenu && (
          <MobileMenu t={t} onClose={closeMobileMenu} />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;