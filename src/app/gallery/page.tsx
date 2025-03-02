"use client"
import { useEffect, useState, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { 
  X, ChevronLeft, ChevronRight, Maximize, Download, 
  Filter, Search, TagIcon, Calendar, Eye, Heart
} from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { TranslationProvider } from "@/hooks/useTranslation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

// Categories for the gallery
const categories = [
  { id: "all", label: "All" },
  { id: "builds", label: "Builds" },
  { id: "landscapes", label: "Landscapes" },
  { id: "events", label: "Events" },
  { id: "players", label: "Players" },
  { id: "redstone", label: "Redstone" },
];

// Tags for filtering
const tags = [
  "medieval", "modern", "castle", "house", "farm", "adventure", 
  "survival", "creative", "pvp", "minigame", "community"
];

// Image data with additional metadata
const galleryImages = [
  {
    id: 1,
    thumbnail: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    fullsize: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Epic Castle",
    description: "A magnificent castle built by our community",
    category: "builds",
    tags: ["medieval", "castle"],
    author: "CraftMaster",
    views: 1230,
    likes: 342,
    date: "2023-05-15",
  },
];

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredImages, setFilteredImages] = useState(galleryImages);
  const [sortBy, setSortBy] = useState<"newest" | "popular" | "views">("newest");
  const galleryRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  // Filter and sort images based on active filters
  useEffect(() => {
    let filtered = [...galleryImages];
    
    // Apply category filter
    if (activeCategory !== "all") {
      filtered = filtered.filter(img => img.category === activeCategory);
    }
    
    // Apply tag filters
    if (activeTags.length > 0) {
      filtered = filtered.filter(img => 
        activeTags.some(tag => img.tags.includes(tag))
      );
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(img => 
        img.title.toLowerCase().includes(query) || 
        img.description.toLowerCase().includes(query) ||
        img.author.toLowerCase().includes(query) ||
        img.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Apply sorting
    if (sortBy === "newest") {
      filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sortBy === "popular") {
      filtered.sort((a, b) => b.likes - a.likes);
    } else if (sortBy === "views") {
      filtered.sort((a, b) => b.views - a.views);
    }
    
    setFilteredImages(filtered);
  }, [activeCategory, activeTags, searchQuery, sortBy]);

  useEffect(() => {
    // Handle ESC key to close fullscreen viewer
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedImage !== null) {
        setSelectedImage(null);
      } else if (e.key === "ArrowLeft" && selectedImage !== null) {
        navigateImages("prev");
      } else if (e.key === "ArrowRight" && selectedImage !== null) {
        navigateImages("next");
      }
    };

    // Animation for gallery items on page load
    const animateGalleryItems = () => {
      const galleryItems = document.querySelectorAll(".gallery-item");
      galleryItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add("animate-in");
        }, index * 100);
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    
    // Run animation when component mounts
    animateGalleryItems();
    
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch((e) => {
        console.error("Fullscreen error:", e);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      }).catch((e) => {
        console.error("Exit fullscreen error:", e);
      });
    }
  };

  const toggleTag = (tag: string) => {
    if (activeTags.includes(tag)) {
      setActiveTags(activeTags.filter(t => t !== tag));
    } else {
      setActiveTags([...activeTags, tag]);
    }
  };

  const navigateImages = (direction: "prev" | "next") => {
    if (selectedImage === null) return;
    
    const currentIndex = filteredImages.findIndex(img => img.id === galleryImages[selectedImage].id);
    if (currentIndex === -1) return;
    
    const newIndex = direction === "prev" 
      ? (currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1)
      : (currentIndex === filteredImages.length - 1 ? 0 : currentIndex + 1);
      
    const newSelectedImageIndex = galleryImages.findIndex(img => img.id === filteredImages[newIndex].id);
    setSelectedImage(newSelectedImageIndex);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      
      {/* Page Header */}
      <div className="bg-primary/10 py-14 md:py-16 relative overflow-hidden">
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
      
      {/* Gallery Controls */}
      <div className="bg-background/80 backdrop-blur-md sticky top-16 z-30 border-b border-border py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`gallery-filter-button ${activeCategory === category.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.label}
                </button>
              ))}
            </div>
            
            <div className="flex gap-2 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search gallery..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="relative">
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <span className="hidden sm:inline">Sort</span>
                </Button>
                <div className="absolute right-0 top-full mt-1 w-48 bg-background border border-border rounded-md shadow-lg z-30 hidden group-focus-within:block">
                  {/* Sort options would appear here */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Active Filters */}
      {activeTags.length > 0 && (
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {activeTags.map(tag => (
              <Badge 
                key={tag} 
                variant="secondary"
                className="flex items-center gap-1 cursor-pointer"
                onClick={() => toggleTag(tag)}
              >
                {tag}
                <X className="h-3 w-3" />
              </Badge>
            ))}
            <Button 
              variant="ghost" 
              className="text-xs h-7 px-2"
              onClick={() => setActiveTags([])}
            >
              Clear all
            </Button>
          </div>
        </div>
      )}
      
      {/* Tag Cloud */}
      <div className="container mx-auto px-4 py-2">
        <Tabs defaultValue="images" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="tags">Popular Tags</TabsTrigger>
          </TabsList>
          
          <TabsContent value="tags" className="animate-fade-in">
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map(tag => (
                <Badge 
                  key={tag}
                  variant={activeTags.includes(tag) ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/10"
                  onClick={() => toggleTag(tag)}
                >
                  <TagIcon className="h-3 w-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="images" className="animate-fade-in">
            {/* Gallery Grid */}
            <div 
              ref={galleryRef}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {filteredImages.length > 0 ? (
                filteredImages.map((image) => (
                  <div 
                    key={image.id}
                    className="gallery-item cursor-pointer overflow-hidden rounded-xl shadow-md hover:shadow-xl group"
                    onClick={() => setSelectedImage(galleryImages.findIndex(img => img.id === image.id))}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={image.thumbnail}
                        alt={image.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                        width={600}
                        height={400}
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
                      
                      {/* Category Badge */}
                      <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md">
                        {image.category}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-16 text-center">
                  <p className="text-muted-foreground">No images match your current filters.</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => {
                      setActiveCategory("all");
                      setActiveTags([]);
                      setSearchQuery("");
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Fullscreen Image Viewer */}
      {selectedImage !== null && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedImage(null);
            }
          }}
        >
          <div className="absolute top-4 right-4 flex gap-3 z-10">
            <button 
              className="minecraft-ghost-btn text-white p-2"
              onClick={toggleFullscreen}
              aria-label="Toggle fullscreen"
            >
              <Maximize className="h-6 w-6" />
            </button>
            <a 
              href={galleryImages[selectedImage].fullsize}
              download
              className="minecraft-ghost-btn text-white p-2"
              onClick={(e) => e.stopPropagation()}
              aria-label="Download image"
            >
              <Download className="h-6 w-6" />
            </a>
            <button 
              className="minecraft-ghost-btn text-white p-2"
              onClick={() => setSelectedImage(null)}
              aria-label="Close viewer"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <button 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 minecraft-ghost-btn text-white p-2 opacity-75 hover:opacity-100"
            onClick={(e) => {
              e.stopPropagation();
              navigateImages("prev");
            }}
            aria-label="Previous image"
          >
            <ChevronLeft className="h-10 w-10" />
          </button>
          
          <div className="max-w-[90vw] max-h-[90vh] relative">
            <Image 
              src={galleryImages[selectedImage].fullsize} 
              alt={galleryImages[selectedImage].title} 
              className="max-w-full max-h-[80vh] rounded-lg shadow-2xl animate-fade-in object-contain"
              loading="lazy"
              onClick={(e) => e.stopPropagation()}
              width={window.innerWidth > window.innerHeight? window.innerWidth : window.innerHeight}
              height={window.innerWidth < window.innerHeight? window.innerWidth : window.innerHeight}
            />
            
            <div className="bg-black/50 p-3 rounded-lg absolute bottom-0 left-0 right-0 text-white">
              <h2 className="font-bold text-xl mb-1">
                {galleryImages[selectedImage].title}
              </h2>
              <p className="text-white/80">
                {galleryImages[selectedImage].description}
              </p>
              <div className="flex flex-wrap justify-between mt-2 text-sm text-white/70">
                <span className="mr-4">By {galleryImages[selectedImage].author}</span>
                <div className="flex gap-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(galleryImages[selectedImage].date).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {galleryImages[selectedImage].views} views
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    {galleryImages[selectedImage].likes} likes
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <button 
            className="absolute right-4 top-1/2 transform -translate-y-1/2 minecraft-ghost-btn text-white p-2 opacity-75 hover:opacity-100"
            onClick={(e) => {
              e.stopPropagation();
              navigateImages("next");
            }}
            aria-label="Next image"
          >
            <ChevronRight className="h-10 w-10" />
          </button>
          
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {filteredImages.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === filteredImages.findIndex(img => img.id === galleryImages[selectedImage].id)
                    ? 'bg-white w-4' 
                    : 'bg-white/50 hover:bg-white/80'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  const imgIndex = galleryImages.findIndex(img => img.id === filteredImages[index].id);
                  setSelectedImage(imgIndex);
                }}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

const Gallery = () => {
  return (
    <TranslationProvider>
      <GalleryPage />
    </TranslationProvider>
  );
};

export default Gallery;
