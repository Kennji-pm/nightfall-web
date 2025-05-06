import { useState, useEffect, memo } from "react";

interface PromoBannerProps {
  promos: string[];
}

export const PromoBanner = memo(function PromoBanner({
  promos,
}: PromoBannerProps) {
  const [activePromoIndex, setActivePromoIndex] = useState(0);

  // Animation timing constants
  const animationDuration = 10; // seconds for the marquee animation
  const delayBetweenPromos = 2; // seconds delay between promos

  // Handle promo rotation with proper timing
  useEffect(() => {
    if (promos.length <= 1) return;

    const timer = setInterval(() => {
      setActivePromoIndex((prevIndex) => (prevIndex + 1) % promos.length);
    }, (animationDuration + delayBetweenPromos) * 1000);

    return () => clearInterval(timer);
  }, [promos.length, animationDuration, delayBetweenPromos]);

  // Ensure we have text to display
  if (promos.length === 0) return null;

  return (
    <div
      className={`bg-primary text-white py-2 relative transition-all duration-300 opacity-100`}
    >
      <div className="container mx-auto relative overflow-hidden">
        <div className="promo-slider relative h-6 overflow-hidden">
          {promos.map((promo, index) => (
            <div
              key={`promo-${index}`}
              className={`whitespace-nowrap absolute left-0 right-0 transition-opacity duration-500 ${
                index === activePromoIndex ? "opacity-100" : "opacity-0"
              }`}
              style={{
                animation:
                  index === activePromoIndex
                    ? `marquee-rtl ${animationDuration}s linear`
                    : "none",
              }}
            >
              <p className="text-center font-medium">{promo}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
