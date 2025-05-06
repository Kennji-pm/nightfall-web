import { AnimatePresence, motion } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSelector } from "@/components/LanguageSelector";
// import { UserMenu } from "@/components/auth/UserMenu";
import { X, ChevronRight, Home, Image, Award, Shield, Info } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import Link from "next/link";

interface MobileMenuProps {
  t: any;
  onClose: () => void;
}

export const MobileMenu = ({ t, onClose }: MobileMenuProps) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  
  const toggleExpanded = (key: string) => {
    setExpandedItems(prev => 
      prev.includes(key) 
        ? prev.filter(item => item !== key) 
        : [...prev, key]
    );
  };
  
  const isExpanded = (key: string) => expandedItems.includes(key);

  const menuItemClasses = "flex items-center gap-3 px-4 py-3 rounded-md hover:bg-muted transition-colors";
  const menuDropdownBtnClasses = "flex items-center justify-between w-full px-3 py-3 rounded-md hover:bg-muted transition-colors";
  const subMenuClasses = "block py-2 px-3 rounded-md hover:bg-muted/70 text-sm";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 md:hidden overflow-hidden"
      onClick={onClose}
    >
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="absolute right-0 top-0 h-screen w-4/5 max-w-sm bg-background/95 backdrop-blur-md border-l shadow-lg py-4 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4 px-6">
          <h2 className="font-semibold text-xl">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-muted transition-colors"
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>
        
        <Separator className="mb-4" />
        
        <nav className="mb-6">
          <div className="px-2 space-y-1">
            <Link
              href="/"
              className={menuItemClasses}
              onClick={onClose}
            >
              <Home size={18} className="text-primary" />
              <span>{t.navbar.home}</span>
            </Link>

            <Link
              href="/vote"
              className={menuItemClasses}
              onClick={onClose}
            >
              <Award size={18} className="text-primary" />
              <span>{t.navbar.vote}</span>
            </Link>
            
            <div className="px-1">
              <button
                onClick={() => toggleExpanded('gallery')}
                className={menuDropdownBtnClasses}
                aria-expanded={isExpanded('gallery')}
              >
                <div className="flex items-center gap-3">
                  <Image size={18} className="text-primary" />
                  <span>{t.navbar.gallery}</span>
                </div>
                <ChevronRight
                  size={16}
                  className={`transition-transform duration-200 ${isExpanded('gallery') ? 'rotate-90' : ''}`}
                />
              </button>
              
              <AnimatePresence>
                {isExpanded('gallery') && (
                  <motion.div
                    initial={{ height: 0, opacity: 0, overflow: 'hidden' }}
                    animate={{ height: "auto", opacity: 1, overflow: 'visible' }}
                    exit={{ height: 0, opacity: 0, overflow: 'hidden' }}
                    transition={{ duration: 0.2 }}
                    className="ml-9 mr-4 py-1 border-l-2 border-primary/20 pl-3"
                  >
                    <Link
                      href="/gallery"
                      className={subMenuClasses}
                      onClick={onClose}
                    >
                      All Gallery
                    </Link>
                    <Link
                      href="/gallery?category=builds"
                      className={subMenuClasses}
                      onClick={onClose}
                    >
                      Builds
                    </Link>
                    <Link
                      href="/gallery?category=landscapes"
                      className={subMenuClasses}
                      onClick={onClose}
                    >
                      Landscapes
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="px-1">
              <button
                onClick={() => toggleExpanded('server')}
                className={menuDropdownBtnClasses}
                aria-expanded={isExpanded('server')}
              >
                <div className="flex items-center gap-3">
                  <Shield size={18} className="text-primary" />
                  <span>{t.navbar.server}</span>
                </div>
                <ChevronRight
                  size={16}
                  className={`transition-transform duration-200 ${isExpanded('server') ? 'rotate-90' : ''}`}
                />
              </button>
              
              <AnimatePresence>
                {isExpanded('server') && (
                  <motion.div
                    initial={{ height: 0, opacity: 0, overflow: 'hidden' }}
                    animate={{ height: "auto", opacity: 1, overflow: 'visible' }}
                    exit={{ height: 0, opacity: 0, overflow: 'hidden' }}
                    transition={{ duration: 0.2 }}
                    className="ml-9 mr-4 py-1 border-l-2 border-primary/20 pl-3"
                  >
                    <Link
                      href="/punishment"
                      className={subMenuClasses}
                      onClick={onClose}
                    >
                      Punishments
                    </Link>
                    <Link
                      href="/about"
                      className={subMenuClasses}
                      onClick={onClose}
                    >
                      About
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </nav>
        
        <Separator className="my-4" />
        
        <div className="px-6 space-y-4">
          <div className="flex items-center gap-2 justify-between">
            <span className="text-sm font-medium">Settings</span>
            <div className="flex items-center gap-2">
              <LanguageSelector />
              <ThemeToggle />
            </div>
          </div>
          
          <Separator className="my-4" />
          
          {/* <div className="pt-2">
            <UserMenu />
          </div> */}
        </div>
      </motion.div>
    </motion.div>
  );
};