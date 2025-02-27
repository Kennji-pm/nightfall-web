import { useEffect, useRef } from "react";
import { useTranslation } from "../hooks/useTranslation";
import Image from "next/image";

export function Hero() {
  const { t } = useTranslation();
  const statsRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const children = entry.target.querySelectorAll(".stat-item");
            children.forEach((child, index) => {
              setTimeout(() => {
                child.classList.add("animated");
              }, index * 200);
            });
            entry.target.classList.add("animated");
            statsObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    const heroContentObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animated");
            heroContentObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observer for hero image
    const heroImageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animated");
            heroImageObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    if (statsRef.current) {
      statsObserver.observe(statsRef.current);
    }
    if (heroContentRef.current) {
      heroContentObserver.observe(heroContentRef.current);
    }

    if (heroImageRef.current) {
      heroImageObserver.observe(heroImageRef.current);
    }

    const handleParallax = () => {
      const scrollY = window.scrollY;
      const heroSection = document.getElementById("home");

      if (heroSection) {
        const heroHeight = heroSection.offsetHeight;
        const scrollPercent = Math.min(scrollY / heroHeight, 1);

        // Apply parallax effect to elements with parallax class
        const parallaxElements = heroSection.querySelectorAll(".parallax");
        parallaxElements.forEach((el) => {
          const element = el as HTMLElement;
          const speed = element.dataset.speed || "0.2";
          const yPos = scrollY * parseFloat(speed);
          element.style.transform = `translateY(${yPos}px)`;
        });

        // Apply opacity fade to elements that should fade on scroll
        const fadeElements = heroSection.querySelectorAll(".fade-on-scroll");
        fadeElements.forEach((el) => {
          const element = el as HTMLElement;
          element.style.opacity = (1 - scrollPercent * 1.5).toString();
        });
      }
    };

    window.addEventListener("scroll", handleParallax);
    return () => {
      statsObserver.disconnect();
      heroContentObserver.disconnect();
      heroImageObserver.disconnect();
      window.removeEventListener("scroll", handleParallax);
    };
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen pt-24 pb-16 flex items-center relative overflow-hidden"
    >
      <div
        className="absolute inset-0 minecraft-pattern-bg opacity-30 dark:opacity-10 parallax"
        data-speed="0.03"
      ></div>
      <div
        className="absolute -top-20 -right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl parallax"
        data-speed="0.05"
      ></div>
      <div
        className="absolute -bottom-32 -left-32 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl parallax"
        data-speed="0.08"
      ></div>
      <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-background to-transparent"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <div
            ref={heroContentRef}
            className="flex-1 text-center md:text-left reveal-anim reveal-right"
          >
            <div className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full mb-4 font-medium animate-pulse-slow fade-on-scroll">
              Minecraft Server
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {t.hero.title}
            </h1>
            <p className="text-lg md:text-xl mb-8 text-muted-foreground">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <a href="#join" className="minecraft-btn text-lg px-8 py-4">
                {t.hero.cta}
              </a>
              <a
                href="#features"
                className="px-8 py-4 bg-secondary text-foreground rounded-lg font-medium transition-all duration-300 hover:bg-secondary/80 active:scale-95"
              >
                {t.section.features}
              </a>
            </div>
          </div>
          <div 
            ref={heroImageRef}
            className="flex-1 hidden md:block reveal-anim reveal-left"
          >
            <div className="relative w-full max-w-md mx-auto">
              <div className="aspect-square rounded-2xl overflow-hidden border-4 border-white/20 shadow-xl animate-float">
                <Image
                  src="/images/1.jpg"
                  alt="Minecraft Server"
                  className="w-full h-full object-cover"
                  width={600}
                  height={600}
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-2xl border-4 border-white/20 shadow-lg grid place-items-center animate-bounce-light">
                  <Image
                    src={"/images/logo.png"}
                    alt="Nightfall Assault Logo"
                    width={256}
                    height={256}
                    className="w-full h-full rounded-[13px]"
                    loading="lazy"
                  ></Image>
              </div>
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-green-400/20 blur-xl animate-pulse-slow parallax" data-speed="-0.05"></div>
            </div>
          </div>
        </div>

        <div
          ref={statsRef}
          className="mt-16 items-center gap-6 stagger-children"
        >
          <div className="stats-item glass-card p-6 text-center animate-on-scroll fade-up">
            <div className="text-4xl font-bold text-primary mb-2 counter">99.9%</div>
            <div className="text-muted-foreground">{t.hero.uptime}</div>
          </div>
        </div>
        <div className="absolute bottom-20 right-10 w-16 h-16 opacity-70 parallax" data-speed="-0.1" style={{ animation: 'float-slow 8s ease-in-out infinite' }}>
          <div className="w-full h-full relative rotate-12">
            <div className="absolute inset-0 bg-primary/30 backdrop-blur-md rounded-lg transform rotate-45"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
