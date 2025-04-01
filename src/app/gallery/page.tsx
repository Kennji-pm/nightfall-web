"use client"
import React, { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { GalleryProvider } from "@/contexts/GalleryContext";
import { GalleryHeader } from "@/components/gallery/GalleryHeader";
import { GalleryControls } from "@/components/gallery/GalleryControls";
import { GalleryContent } from "@/components/gallery/GalleryContent";
import { GalleryPagination } from "@/components/gallery/GalleryPagination";
import { GalleryUploadModal } from "@/components/gallery/GalleryUploadImageModal";
import { TranslationProvider } from "@/hooks/useTranslation";

const GalleryPage = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <TranslationProvider>
      <GalleryProvider>
        <div className="min-h-screen bg-background text-foreground flex flex-col">
          <Navbar />
          
          <main className="flex-grow">
            <GalleryHeader />
            <GalleryControls />
            <GalleryContent />
            <GalleryPagination />
          </main>
          
          <GalleryUploadModal />
          <Footer />
        </div>
      </GalleryProvider>
    </TranslationProvider>
  );
};

export default GalleryPage;