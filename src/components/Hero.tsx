import { useEffect, useRef, useState } from "react";
import { useTranslation } from "../hooks/useTranslation";
import { Wifi, WifiOff, Users, Globe, Paperclip } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import axios from 'axios';

export function Hero() {
  const { t } = useTranslation();
  const statsRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const [serverStatus, setServerStatus] = useState<'online' | 'offline'>('offline');
  const [playerCount, setPlayerCount] = useState<number>(0);
  const [maxPlayers, setMaxPlayers] = useState<number>(0);
  const [serverVersion, setServerVersion] = useState<string>('None');

  const serverStatusCheck = async() => {
    await axios.get('https://api.mcsrvstat.us/3/mp.opblocks.com')
    .then(function (response) {
      // handle success
      setServerStatus(response.data.online ? 'online' : 'offline');
      setPlayerCount(response.data.players.online);
      setMaxPlayers(response.data.players.max);
      setServerVersion(response.data.protocol.name);

    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
  };

  useEffect(() => {
    serverStatusCheck();
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
      className="min-h-screen pt-20 md:pt-24 pb-12 md:pb-16 flex items-center relative overflow-hidden"
    >
      <div
        className="absolute inset-0 minecraft-pattern-bg opacity-30 dark:opacity-10 parallax"
        data-speed="0.03"
      ></div>
      <div className="absolute -top-20 -right-20 w-72 md:w-96 h-72 md:h-96 bg-blue-500/10 rounded-full blur-3xl parallax" data-speed="0.05"></div>
      <div className="absolute -bottom-32 -left-32 w-72 md:w-96 h-72 md:h-96 bg-purple-500/10 rounded-full blur-3xl parallax" data-speed="0.08"></div>
      <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-background to-transparent"></div>
      <div className="container mx-auto px-4 relative z-10">
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-16">
          <div
            ref={heroContentRef}
            className="flex-1 text-center md:text-left reveal-anim reveal-right"
          >
            <div className="inline-block bg-primary/10 text-primary px-3 md:px-4 py-1 rounded-full mb-3 md:mb-4 font-medium animate-pulse-slow fade-on-scroll text-sm md:text-base">
              Minecraft Server
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
              {t.hero.title}
            </h1>
            <p className="text-base md:text-xl mb-6 md:mb-8 text-muted-foreground">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-4">
              <Link href="#join" className="minecraft-btn text-base md:text-lg px-6 md:px-8 py-3 md:py-4">
                {t.hero.cta}
              </Link>
              <Link
                href="#features"
                className="px-6 md:px-8 py-3 md:py-4 bg-secondary text-foreground rounded-lg font-medium transition-all duration-300 hover:bg-secondary/80 active:scale-95 text-base md:text-lg"
              >
                {t.section.features}
              </Link>
            </div>
            <div className="mt-8 md:mt-12 glass-card p-4 max-w-sm mx-auto md:mx-0 animate-on-scroll fade-up">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <Globe className="h-4 w-4" /> {t.serverstatus.title}
                </h3>
                <div className={`flex items-center gap-1 ${serverStatus === 'online' ? 'text-green-500' : 'text-red-500'}`}>
                  {serverStatus === 'online' ? (
                    <>
                      <Wifi className="h-4 w-4" /> 
                      <span className="text-sm font-semibold">{t.serverstatus.online}</span>
                    </>
                  ) : (
                    <>
                      <WifiOff className="h-4 w-4" /> 
                      <span className="text-sm font-semibold">{t.serverstatus.offline}</span>
                    </>
                  )}
                </div>
              </div>
              
              {serverStatus === 'online' && (
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="bg-background/40 rounded-lg p-2 flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    <div>
                      <div className="text-xs text-muted-foreground">{t.serverstatus.players}</div>
                      <div className="font-semibold">{playerCount}/{maxPlayers}</div>
                    </div>
                  </div>
                  <div className="bg-background/40 rounded-lg p-2 flex items-center gap-2">
                    <Paperclip className="h-4 w-4 text-primary" />
                    <div>
                      <div className="text-xs text-muted-foreground">{t.serverstatus.version}</div>
                      <div className="font-semibold">{serverVersion}</div>
                    </div>
                  </div>
                </div>
              )}
              
              {serverStatus === 'offline' && (
                <div className="text-sm text-muted-foreground bg-background/40 p-2 rounded-lg">
                  {t.serverstatus.maintenance}
                </div>
              )}
              
              <div className={`mt-2 w-full h-1 rounded-full overflow-hidden ${serverStatus === 'online' ? 'bg-green-200 dark:bg-green-900' : 'bg-red-200 dark:bg-red-900'}`}>
                <div 
                  className={`h-full ${serverStatus === 'online' ? 'bg-green-500' : 'bg-red-500'}`}
                  style={{ 
                    width: serverStatus === 'online' ? '100%' : '33%',
                    animation: serverStatus === 'online' ? 'pulse-slow 4s infinite' : 'none'
                  }}
                ></div>
              </div>
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
              <div className="absolute -bottom-6 -left-6 w-20 md:w-24 h-20 md:h-24 bg-white dark:bg-minecraft-dark rounded-2xl shadow-lg grid place-items-center animate-bounce-light">
                  <Image
                    src={"/images/logo.png"}
                    alt="Nightfall Assault Logo"
                    width={256}
                    height={256}
                    className="w-full h-full rounded-[13px]"
                    loading="lazy"
                  ></Image>
              </div>
              <div className="absolute -top-4 -right-4 w-16 md:w-20 h-16 md:h-20 rounded-full bg-green-400/20 blur-xl animate-pulse-slow parallax" data-speed="-0.05"></div>
            </div>
          </div>
        </div>

        <div
          ref={statsRef}
          className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 stagger-children"
        >
          <div className="stat-item glass-card p-4 md:p-6 text-center animate-on-scroll fade-up">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-1 md:mb-2 counter">99.9%</div>
            <div className="text-sm md:text-base text-muted-foreground">{t.hero.uptime}</div>
          </div>
          <div className="stat-item glass-card p-4 md:p-6 text-center animate-on-scroll fade-up">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-1 md:mb-2 counter">99.9%</div>
            <div className="text-sm md:text-base text-muted-foreground">{t.hero.uptime}</div>
          </div>
          <div className="stat-item glass-card p-4 md:p-6 text-center animate-on-scroll fade-up">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-1 md:mb-2 counter">99.9%</div>
            <div className="text-sm md:text-base text-muted-foreground">{t.hero.uptime}</div>
          </div>
        </div>
        <div className="absolute bottom-20 right-10 w-12 md:w-16 h-12 md:h-16 opacity-70 parallax" data-speed="-0.1" style={{ animation: 'float-slow 8s ease-in-out infinite' }}>
          <div className="w-full h-full relative rotate-12">
            <div className="absolute inset-0 bg-primary/30 backdrop-blur-md rounded-lg transform rotate-45"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
