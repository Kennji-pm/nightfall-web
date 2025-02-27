import { useEffect, useRef } from "react";
import { useTranslation } from "../hooks/useTranslation";
import { Sword, Paintbrush, Gamepad2, Users } from "lucide-react";

export function Features() {
  const { t } = useTranslation();
  const featuresRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add a delay to each child based on its index
            const children = entry.target.querySelectorAll(".feature-card");
            children.forEach((child, index) => {
              setTimeout(() => {
                child.classList.add("animated");
              }, index * 150);
            });
            entry.target.classList.add("animated");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    const titleObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animated");
            titleObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    if (featuresRef.current) {
      observer.observe(featuresRef.current);
    }
    if (titleRef.current) {
      titleObserver.observe(titleRef.current);
    }

    return () => 
      {
        observer.disconnect();
        titleObserver.disconnect();
      };
  }, []);

  return (
    <section
      id="features"
      className="py-20 relative overflow-hidden"
    >
      <div className="absolute inset-0 minecraft-pattern-bg opacity-30 dark:opacity-10 parallax" data-speed="0.03"></div>
      <div className="absolute top-0 left-0 right-0 h-1/4 bg-gradient-to-b from-background to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-background to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
          <div 
              ref={titleRef}
              className="text-center mb-16 reveal-anim reveal-up"
              data-delay="200"
            >
          <div className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full mb-4 font-medium">
            {t.section.features}
          </div>
          <h2 className="section-title">{t.features.title}</h2>
        </div>

        <div
          ref={featuresRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children"
        >
          <FeatureCard
            icon={<Sword className="h-8 w-8" />}
            title={t.features.survival.title}
            description={t.features.survival.description}
            color="bg-red-500"
            animation="fade-up"
          />
          <FeatureCard
            icon={<Paintbrush className="h-8 w-8" />}
            title={t.features.creative.title}
            description={t.features.creative.description}
            color="bg-blue-500"
            animation="fade-left"
          />
          <FeatureCard
            icon={<Gamepad2 className="h-8 w-8" />}
            title={t.features.minigames.title}
            description={t.features.minigames.description}
            color="bg-green-500"
            animation="fade-right"
          />
          <FeatureCard
            icon={<Users className="h-8 w-8" />}
            title={t.features.community.title}
            description={t.features.community.description}
            color="bg-purple-500"
            animation="fade-up"
          />
        </div>
        <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl z-0 float-slow"></div>
        <div className="absolute top-20 -left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl z-0 parallax" data-speed="-0.05"></div>
      </div>
    </section>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  animation: string;
}

function FeatureCard({ icon, title, description, color, animation = "fade-up"}: FeatureCardProps) {
  return (
    <div className={`feature-card glass-card p-6 transition-all duration-500 hover:shadow-2xl hover:translate-y-[-5px] animate-on-scroll ${animation} tilt-on-hover`}>
      <div className={`w-16 h-16 rounded-2xl mb-4 ${color} grid place-items-center text-white`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}