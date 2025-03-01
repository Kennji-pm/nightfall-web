"use client";
import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import NextImage from "next/image";
import { useTranslation } from "@/hooks/useTranslation";

interface SlideshowProps {
  interval?: number;
  height?: string;
}

const AutoSlideShow = ({
  interval = 5000,
  height = "70vh",
}: SlideshowProps) => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const images = useMemo(
    () => ["/images/1.jpg", "/images/2.jpg", "/images/3.jpg"],
    []
  );
  const [isLoading, setIsLoading] = useState<boolean[]>(images.map(() => true));
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add a delay to each child based on its index
            const children = entry.target.querySelectorAll(".gallery-item");
            children.forEach((child, index) => {
              setTimeout(() => {
                child.classList.add("animated");
              }, index * 100);
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
    if (galleryRef.current) {
      observer.observe(galleryRef.current);
    }
    if (titleRef.current) {
      titleObserver.observe(titleRef.current);
    }
    return () => {
      observer.disconnect();
      titleObserver.disconnect();
    };
  }, []);

  // Handle preloading images
  useEffect(() => {
    images.forEach((src, index) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setIsLoading((prev) => {
          const newState = [...prev];
          newState[index] = false;
          return newState;
        });
      };
    });
  }, [images]);

  // Function to go to next slide
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  // Function to go to previous slide
  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }, [images.length]);

  // Auto-advance slides
  useEffect(() => {
    if (isPaused || images.length <= 1) return;

    const timer = setInterval(nextSlide, interval);
    return () => clearInterval(timer);
  }, [currentIndex, interval, images.length, nextSlide, isPaused]);

  return (
    <section
      id="gallery"
      className="py-20 bg-secondary/50 relative overflow-hidden"
    >
      <div
        className="absolute top-0 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl parallax"
        data-speed="0.05"
      ></div>
      <div
        className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl parallax"
        data-speed="-0.03"
      ></div>
      <div className="container px-4 lg:px-40 sm:px-4 mx-auto relative z-10">
        <div ref={titleRef} className="text-center mb-16 reveal-anim reveal-up">
          <div className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full mb-4 font-medium">
            {t.section.gallery}
          </div>
          <h2 className="section-title">{t.gallery.title}</h2>
        </div>
        <div
          className="relative overflow-hidden rounded-lg"
          style={{ height }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Image container */}
          <div className="h-full w-full relative">
            {images.map((image, index) => (
              <div
                key={image}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out bg-cover bg-center ${
                  index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-7000 ease-out"
                  style={{
                    backgroundImage: `url(${image})`,
                    filter: isLoading[index] ? "blur(10px)" : "none",
                    transition: "filter 1s ease, transform 7s ease",
                  }}
                  onClick={() => setSelectedImage(index)}
                />
                {/* <div className="absolute inset-0 bg-black/20" /> */}
              </div>
            ))}
          </div>

          {/* Caption */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-20 bg-gradient-to-t from-black to-transparent animate-slide-up">
            <h2 className="text-2xl font-medium mb-2">{t.gallery.slidetitle}</h2>
            <p className="text-white/80">
              {t.gallery.slidesubtitle}
            </p>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/40 transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/40 transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-white w-6"
                    : "bg-white/50 hover:bg-white/80"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
      {selectedImage !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 bg-white/10 rounded-full p-2 text-white hover:bg-white/20 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
          >
            <X className="h-6 w-6" />
          </button>
          <NextImage
            src={images[selectedImage]}
            alt="Enlarged gallery image"
            width={800}
            height={600}
            className="max-w-full max-h-[90vh] rounded-lg shadow-2xl animate-fade-in"
          />
        </div>
      )}
    </section>
  );
};

export default AutoSlideShow;
