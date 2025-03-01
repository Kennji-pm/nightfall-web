import { useState, useEffect } from "react";
import { useTranslation } from "../hooks/useTranslation";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSelector } from "./LanguageSelector";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Navbar() {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-lg shadow-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={"/images/logo.png"}
              alt="Nightfall Assault Logo"
              width={256}
              height={256}
              className="w-15 h-15 object-cover rounded-2xl"
            ></Image>
            <span className="font-bold text-xl">Nightfall Assault</span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/#home"
              className="font-medium hover:text-primary transition-colors duration-200"
            >
              {t.navbar.home}
            </Link>
            <Link
              href="https://docs.nightfallassault.net"
              className="font-medium hover:text-primary transition-colors duration-200"
            >
              {t.navbar.docs}
            </Link>
            <Link
              href="/#store"
              className="font-medium hover:text-primary transition-colors duration-200"
            >
              {t.navbar.store}
            </Link>
            <Link
              href="/vote"
              className="font-medium hover:text-primary transition-colors duration-200"
            >
              {t.navbar.vote}
            </Link>
            <Link
              href="/#join"
              className="minecraft-btn"
            >
              {t.navbar.join}
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-3">
            <ThemeToggle />
            <LanguageSelector />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-3">
            <ThemeToggle />
            <LanguageSelector />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-secondary"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-border mt-3 animate-slide-in">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link
              href="/#home"
              className="font-medium p-2 hover:bg-secondary rounded-lg transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.navbar.home}
            </Link>
            <Link
              href="https://docs.nightfallassault.net"
              className="font-medium p-2 hover:bg-secondary rounded-lg transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.navbar.docs}
            </Link>
            <Link
              href="/#store"
              className="font-medium p-2 hover:bg-secondary rounded-lg transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.navbar.store}
            </Link>
            <Link
              href="/vote"
              className="font-medium p-2 hover:bg-secondary rounded-lg transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.navbar.vote}
            </Link>
            <Link
              href="/#join"
              className="minecraft-btn text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.navbar.join}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}