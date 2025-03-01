"use client"
import { useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { Features } from "../components/Features";
import { JoinServer } from "../components/JoinServer";
import { Footer } from "../components/Footer";
import { TranslationProvider } from "../hooks/useTranslation";
import { ContactPopup } from "@/components/ContactPopup";
import AutoSlideShow from "@/components/AutoSlideShow";

export default function Home () {
  useEffect(() => {
    // Animation for elements when they enter the viewport
    const animateOnScroll = () => {
      const animatedElements = document.querySelectorAll(".animate-on-scroll");

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("animated");
              observer.unobserve(entry.target);          
              const delay = entry.target.getAttribute("data-delay") || 0;
              setTimeout(() => {
                entry.target.classList.add("animated");
              }, Number(delay));

              // Add random direction animations for variety
              if (entry.target.classList.contains("animate-random")) {
                const animations = ["fade-up", "fade-left", "fade-right"];
                const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
                entry.target.classList.add(randomAnimation);
              }

              // Optional: For elements that should re-animate on every scroll view
              if (!entry.target.classList.contains("animate-once")) {
                observer.unobserve(entry.target);
              }
            } else {
              // Optional: for elements that should re-animate every time, remove the class when out of view
              if (entry.target.classList.contains("animate-repeat")) {
                entry.target.classList.remove("animated");
              }
            }
          });
        },
        { 
          threshold: 0.15,
          rootMargin: "0px 0px -10% 0px"
        }
      );

      animatedElements.forEach((element) => {
        observer.observe(element);
      });

      const parallaxElements = document.querySelectorAll(".parallax");

      const handleParallaxScroll = () => {
        const scrollY = window.scrollY;

        parallaxElements.forEach((element) => {
          const speed = element.getAttribute("data-speed") || "0.1";
          const yPos = scrollY * Number(speed);
          (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
        });
      };

      window.addEventListener("scroll", handleParallaxScroll);

      // Add scroll-triggered background color change to sections
      const colorChangeElements = document.querySelectorAll("[data-bg-scroll]");

      const handleColorChange = () => {
        colorChangeElements.forEach((element) => {
          const elementTop = element.getBoundingClientRect().top;
          // const elementHeight = element.getBoundingClientRect().height;
          const windowHeight = window.innerHeight;

          // Calculate how far element is through the viewport as percentage
          const scrollPercent = 1 - (elementTop / windowHeight);

          if (scrollPercent > 0 && scrollPercent < 1) {
            (element as HTMLElement).style.opacity = Math.min(scrollPercent * 1.5, 1).toString();
          }
        });
      };

      window.addEventListener("scroll", handleColorChange);

      return () => {
        observer.disconnect();
        window.removeEventListener("scroll", handleParallaxScroll);
        window.removeEventListener("scroll", handleColorChange);
      };
    };

    animateOnScroll();
  }, []);

  return (
    <TranslationProvider>
      <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <div className="fixed inset-0 opacity-30 dark:opacity-10 pointer-events-none bg-[radial-gradient(#3689fe_1px,transparent_1px)] [background-size:40px_40px]"></div>
        <Navbar />
        <Hero />
        <Features />
        <AutoSlideShow />
        <JoinServer />
        <Footer />
        <ContactPopup />
        <div className="fixed -bottom-20 -left-20 w-64 h-64 rounded-full bg-primary/10 blur-3xl z-0 parallax" data-speed="0.05"></div>
        <div className="fixed top-1/3 -right-32 w-96 h-96 rounded-full bg-secondary/20 blur-3xl z-0 parallax" data-speed="0.08"></div>
      </div>
    </TranslationProvider>
  );
};