import { useEffect, useState, useRef } from "react";
import { useTranslation } from "../hooks/useTranslation";
import { ArrowRight, X } from "lucide-react";
import Image from "next/image";

export function Gallery() {
  const { t } = useTranslation();
  const galleryRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
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

  // Images for gallery
  const images = [
    "/images/1.jpg",
    "/images/2.jpg",
    "/images/3.jpg",
  ];

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

      <div className="container mx-auto px-4 relative z-10">
        <div ref={titleRef} className="text-center mb-16 reveal-anim reveal-up">
          <div className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full mb-4 font-medium">
            {t.section.gallery}
          </div>
          <h2 className="section-title">{t.gallery.title}</h2>
        </div>

        <div
          ref={galleryRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children"
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="gallery-item cursor-pointer rounded-2xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-2xl hover:translate-y-[-5px] animate-on-scroll blur-in"
              onClick={() => setSelectedImage(index)}
              data-delay={index * 100}
            >
              <div className="relative aspect-[4/3] overflow-hidden group">
                <Image
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="font-medium">
                    Minecraft World {index + 1}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10 animate-on-scroll fade-up">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
          >
            {t.gallery.viewMore} <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Lightbox */}
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
          <Image
            src={images[selectedImage]}
            alt="Enlarged gallery image"
            width={600}
            height={400}
            className="max-w-full max-h-[90vh] rounded-lg shadow-2xl animate-fade-in"
          />
        </div>
      )}
    </section>
  );
}
