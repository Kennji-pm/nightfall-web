import { useState, useRef, useEffect } from "react";
import { useTranslation } from "../hooks/useTranslation";
import { Copy, Check } from "lucide-react";
import Image from "next/image";
import copy from "copy-to-clipboard";

export function JoinServer() {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const serverAddress = "play.nightfallassault.net";
  const joinRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const stepsListRef = useRef<HTMLOListElement>(null);

  const copyToClipboard = () => {
    copy(serverAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    // Main section animation
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animated");
            sectionObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    
    // Image animation
    const imageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animated");
            imageObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    
    // Steps animation with staggered effect
    const stepsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const steps = entry.target.querySelectorAll("li");
            steps.forEach((step, index) => {
              setTimeout(() => {
                step.classList.add("animated");
              }, 100 * index);
            });
            entry.target.classList.add("animated");
            stepsObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    
    if (joinRef.current) {
      sectionObserver.observe(joinRef.current);
    }
    
    if (imageRef.current) {
      imageObserver.observe(imageRef.current);
    }
    
    if (stepsListRef.current) {
      stepsObserver.observe(stepsListRef.current);
    }
    
    return () => {
      sectionObserver.disconnect();
      imageObserver.disconnect();
      stepsObserver.disconnect();
    };
  }, []);

  return (
    <section
      id="join"
      className="py-20 relative overflow-hidden"
    >
      <div className="absolute inset-0 minecraft-pattern-bg opacity-30 dark:opacity-10 parallax" data-speed="0.02"></div>
      <div className="absolute top-0 left-0 right-0 h-1/4 bg-gradient-to-b from-background to-transparent"></div>
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl parallax" data-speed="0.07"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl parallax" data-speed="0.04"></div>
      
      <div className="container mx-auto px-4 relative z-10">
      <div 
          ref={joinRef}
          className="max-w-3xl mx-auto glass-card p-6 md:p-12 reveal-anim reveal-up"
        >
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-3">{t.join.title}</h2>
            <p className="text-sm md:text-base text-muted-foreground">{t.join.subtitle}</p>
          </div>

          <div className="mb-6 md:mb-8 animate-on-scroll fade-up">
            <label className="block text-sm font-medium mb-2">{t.join.serverAddress}</label>
            <div className="flex">
              <input
                type="text"
                value={serverAddress}
                readOnly
                className="flex-1 p-2 md:p-3 text-sm md:text-base bg-background border border-border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                onClick={copyToClipboard}
                className="bg-primary text-primary-foreground px-3 md:px-4 text-sm md:text-base rounded-r-lg flex items-center gap-1 md:gap-2 hover:bg-primary/90 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="h-3 w-3 md:h-4 md:w-4" /> {t.join.copied}
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3 md:h-4 md:w-4" /> {t.join.copy}
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div 
              ref={imageRef}
              className="aspect-[4/3] rounded-xl overflow-hidden relative group reveal-anim reveal-right"
            >
              <Image
                src="/images/2.jpg"
                alt="Server screenshot"
                width={600}
                height={450}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <span className="text-white font-medium text-sm md:text-base">Server Lobby</span>
              </div>
            </div>
            <div>
            <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 reveal-anim reveal-left">Quick Steps to Join</h3>
              <ol ref={stepsListRef} className="space-y-2 md:space-y-3 mb-4 md:mb-6 text-sm md:text-base">
                <li className="flex gap-2 md:gap-3 animate-on-scroll fade-left">
                  <span className="flex-shrink-0 w-5 h-5 md:w-6 md:h-6 rounded-full bg-primary text-primary-foreground grid place-items-center text-xs md:text-sm">1</span>
                  <span>{t.java.step1}</span>
                </li>
                <li className="flex gap-2 md:gap-3 animate-on-scroll fade-left">
                  <span className="flex-shrink-0 w-5 h-5 md:w-6 md:h-6 rounded-full bg-primary text-primary-foreground grid place-items-center text-xs md:text-sm">2</span>
                  <span>{t.java.step2}</span>
                </li>
                <li className="flex gap-2 md:gap-3 animate-on-scroll fade-left">
                  <span className="flex-shrink-0 w-5 h-5 md:w-6 md:h-6 rounded-full bg-primary text-primary-foreground grid place-items-center text-xs md:text-sm">3</span>
                  <span>{t.java.step3}</span>
                </li>
                <li className="flex gap-2 md:gap-3 animate-on-scroll fade-left">
                  <span className="flex-shrink-0 w-5 h-5 md:w-6 md:h-6 rounded-full bg-primary text-primary-foreground grid place-items-center text-xs md:text-sm">4</span>
                  <span>{t.java.step4}</span>
                </li>
                <li className="flex gap-2 md:gap-3 animate-on-scroll fade-left">
                  <span className="flex-shrink-0 w-5 h-5 md:w-6 md:h-6 rounded-full bg-primary text-primary-foreground grid place-items-center text-xs md:text-sm">5</span>
                  <span>{t.java.step5}</span>
                </li>
              </ol>
              <a href="minecraft://?addExternalServer=NightfallAssault - Network|play.nightfallassault.net:19132" className="px-8 py-4 bg-secondary text-center text-foreground rounded-lg font-medium transition-all duration-300 hover:bg-secondary/80 active:scale-95"
              >
                {t.join.bedrock}
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute right-[10%] bottom-[20%] w-8 md:w-12 h-8 md:h-12 opacity-70 parallax" data-speed="-0.15">
        <div className="w-full h-full relative">
          <div className="absolute inset-0 bg-green-400/40 backdrop-blur-sm rounded-lg transform rotate-12 float-slow"></div>
        </div>
      </div>
    </section>
  );
}