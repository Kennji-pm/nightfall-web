import Link from "next/link";
import { useTranslation } from "../hooks/useTranslation";
import Image from "next/image";

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-secondary py-12 relative z-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-6 md:mb-0">
            <Link href="#" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-minecraft-blue rounded-lg grid place-items-center">
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
          </div>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            <a href="#home" className="hover:text-primary transition-colors">
              {t.section.home}
            </a>
            <a href="#features" className="hover:text-primary transition-colors">
              {t.section.features}
            </a>
            <a href="#gallery" className="hover:text-primary transition-colors">
              {t.section.gallery}
            </a>
            <a href="#join" className="hover:text-primary transition-colors">
              {t.navbar.join}
            </a>
          </div>
        </div>

        <div className="border-t border-primary pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 text-center md:text-left text-muted-foreground">
            &copy; {year} Nightfall Assault. {t.footer.rights}.
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-muted-foreground">
            <Link href="/privacy-policy" className="hover:text-primary transition-colors">
              {t.footer.privacy}
            </Link>
            <Link href="/terms-and-privacy" className="hover:text-primary transition-colors">
              {t.footer.terms}
            </Link>
            <Link href="mailto:info@nightfallassault.net" className="hover:text-primary transition-colors">
              {t.footer.contact}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}