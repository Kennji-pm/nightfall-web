"use client"
import { useTranslation } from "@/hooks/useTranslation";

export function GalleryHeader() {
    const { t } = useTranslation();
    return (
        <div className="bg-primary/10 py-24 md:py-28 relative overflow-hidden">
          <div className="absolute inset-0 minecraft-pattern-bg opacity-30 dark:opacity-10"></div>
          <div className="absolute -top-20 -right-20 w-72 md:w-96 h-72 md:h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 animate-fade-in">
              {t.gallery.title}
            </h1>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto animate-fade-in" style={{animationDelay: "200ms"}}>
              Explore amazing builds and landscapes from our Minecraft server. Filter by category, search for specific content, or browse through our curated collection.
            </p>
          </div>
        </div>
    )
}