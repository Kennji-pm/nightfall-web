import Link from "next/link";
import { useTranslation } from "../hooks/useTranslation";
import { Heart } from "lucide-react";
import Image from "next/image";

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 pt-16 pb-8 bg-gradient-to-t from-secondary to-secondary/50">
      <div className="container mx-auto px-4">
        {/* Top section with logo, description and newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo and description */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-10 h-10 rounded-lg grid place-items-center group-hover:scale-110 transition-transform duration-300">
                <Image
                  src={"/images/logo.png"}
                  alt="Nightfall Assault Logo"
                  width={256}
                  height={256}
                  className="w-full h-full rounded-[13px]"
                  loading="lazy"
                ></Image>
              </div>
              <span className="font-bold text-xl">Nightfall Assault</span>
            </Link>
            <p className="text-muted-foreground mb-4 max-w-xs">
              Nightfall Assault là một cộng đồng Minecraft năng động với nhiều chế độ chơi thú vị. Tham gia ngay để khám phá thế giới không giới hạn!
            </p>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-1">
            <h3 className="font-bold text-lg mb-4 relative">
              <span className="after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-12 after:h-1 after:bg-primary after:rounded-full">
                Liên kết nhanh
              </span>
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-muted-foreground group-hover:bg-primary group-hover:w-2 transition-all duration-200"></span>
                  {t.navbar.home}
                </a>
              </li>
              <li>
                <a href="#features" className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-muted-foreground group-hover:bg-primary group-hover:w-2 transition-all duration-200"></span>
                  {t.section.features}
                </a>
              </li>
              <li>
                <a href="#gallery" className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-muted-foreground group-hover:bg-primary group-hover:w-2 transition-all duration-200"></span>
                  {t.section.gallery}
                </a>
              </li>
              <li>
                <a href="#join" className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-muted-foreground group-hover:bg-primary group-hover:w-2 transition-all duration-200"></span>
                  {t.navbar.join}
                </a>
              </li>
              <li>
                <Link href="/vote" className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-muted-foreground group-hover:bg-primary group-hover:w-2 transition-all duration-200"></span>
                  Vote
                </Link>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div className="lg:col-span-1">
            <h3 className="font-bold text-lg mb-4 relative">
              <span className="after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-12 after:h-1 after:bg-primary after:rounded-full">
                Mạng Xã Hội
              </span>
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-muted-foreground group-hover:bg-primary group-hover:w-2 transition-all duration-200"></span>
                  {t.navbar.home}
                </a>
              </li>
              <li>
                <a href="#features" className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-muted-foreground group-hover:bg-primary group-hover:w-2 transition-all duration-200"></span>
                  {t.section.features}
                </a>
              </li>
              <li>
                <a href="#gallery" className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-muted-foreground group-hover:bg-primary group-hover:w-2 transition-all duration-200"></span>
                  {t.section.gallery}
                </a>
              </li>
              <li>
                <a href="#join" className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-muted-foreground group-hover:bg-primary group-hover:w-2 transition-all duration-200"></span>
                  {t.navbar.join}
                </a>
              </li>
              <li>
                <Link href="/vote" className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-muted-foreground group-hover:bg-primary group-hover:w-2 transition-all duration-200"></span>
                  Vote
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {/* Divider */}
        <div className="absolute top-0.5 my-6 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"></div>

        {/* Bottom section with copyright and legal links */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 text-center md:text-left text-muted-foreground flex items-center gap-1">
            &copy; {year} Nightfall Assault. {t.footer.rights}.
            <Heart className="h-3 w-3 text-red-500 inline animate-pulse" />
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-muted-foreground">
            <Link href="/privacy" className="hover:text-primary transition-colors duration-200 relative group">
              {t.footer.privacy}
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/terms" className="hover:text-primary transition-colors duration-200 relative group">
              {t.footer.terms}
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </Link>
            <div className="w-10"></div>
          </div>
        </div>
      </div>
    </footer>
  );
}