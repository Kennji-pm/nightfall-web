import React, { useEffect, useRef, memo, useMemo } from "react";
import { Eye, Heart, Calendar, TagIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGallery, GALLERY_TAGS, GalleryImage } from "@/contexts/GalleryContext";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

// Image item component for better performance
const GalleryItem = memo(({ image }: { image: GalleryImage }) => {
  return (
    <Link 
      href={`/gallery/image/${image.id}`}
      className="gallery-item cursor-pointer overflow-hidden rounded-xl shadow-md hover:shadow-xl group"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={image.thumbnail}
          alt={image.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
          width={400}
          height={300}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <h3 className="text-white font-bold mb-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            {image.title}
          </h3>
          <p className="text-white/80 text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75 line-clamp-2">
            {image.description}
          </p>
          <div className="flex items-center justify-between mt-2 text-white/70 text-xs transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {new Date(image.date).toLocaleDateString()}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              {image.views}
            </span>
            <span className="flex items-center gap-1">
              <Heart className="h-3 w-3" />
              {image.likes}
            </span>
          </div>
        </div>
        
        <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md">
          {image.category}
        </div>
      </div>
    </Link>
  );
});

GalleryItem.displayName = "GalleryItem";

export const GalleryContent = memo(() => {
  const { 
    displayedImages, 
    filteredImages,
    toggleTag,
    activeTags,
    resetFilters
  } = useGallery();
  
  const galleryRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = React.useState("images");

  // Use useMemo to filter images only when needed
  const filteredImagesByTag = useMemo(() => {
    return (tag: string) => filteredImages.filter(img => img.tags.includes(tag));
  }, [filteredImages]);

  // Trigger animation when tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  useEffect(() => {
    // Use Intersection Observer for better performance
    if (!galleryRef.current) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          // Unobserve after animation is added
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    // Observe gallery items
    const galleryItems = galleryRef.current.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
      observer.observe(item);
    });
    
    return () => {
      observer.disconnect();
    };
  }, [displayedImages, activeTab]); // Added activeTab as a dependency to rerun when tab changes

  // Handle tag click to show related images
  const handleTagClick = (tag: string) => {
    toggleTag(tag);
    setActiveTab("images"); // Switch to images tab when a tag is clicked
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Tabs 
        defaultValue="images" 
        value={activeTab} 
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="mb-4">
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="tags">Popular Tags</TabsTrigger>
        </TabsList>
        
        {/* Tags Tab - Improved layout and animations with preview images */}
        <TabsContent value="tags" className="animate-fade-in">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
            {GALLERY_TAGS.map((tag, index) => (
              <motion.div
                key={tag}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex flex-col gap-2"
              >
                {/* Tag badge */}
                <Badge 
                  variant={activeTags.includes(tag) ? "default" : "outline"}
                  className={`cursor-pointer hover:bg-primary/10 w-full justify-center py-2 px-3 ${
                    activeTags.includes(tag) ? "shadow-md" : ""
                  }`}
                  onClick={() => handleTagClick(tag)}
                >
                  <TagIcon className="h-3 w-3 mr-1.5" />
                  <span className="capitalize">{tag}</span>
                </Badge>
                
                {/* Preview image for each tag */}
                {filteredImagesByTag(tag).length > 0 && (
                  <div 
                    className="aspect-square rounded-md overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-shadow"
                    onClick={() => handleTagClick(tag)}
                  >
                    <Image 
                        src={filteredImagesByTag(tag)[0]?.thumbnail} 
                        alt={`${tag} preview`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        width={300}
                        height={300}
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
          <div className="flex justify-center">
            {activeTags.length > 0 && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  // Clear only tags, not other filters
                  activeTags.forEach(tag => toggleTag(tag));
                }}
                className="mt-2"
              >
                Clear Tags
              </Button>
            )}
          </div>
        </TabsContent>
        
        {/* Images Tab */}
        <TabsContent value="images" className="animate-fade-in">
          <div 
            ref={galleryRef}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {displayedImages.length > 0 ? (
              displayedImages.map((image) => (
                <GalleryItem key={image.id} image={image} />
              ))
            ) : (
              <div className="col-span-full py-16 text-center">
                <p className="text-muted-foreground">No images match your current filters.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={resetFilters}
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
});

GalleryContent.displayName = "GalleryContent";
