"use client";

import { Footer } from "@/components/Footer";
import { GalleryHeader } from "@/components/gallery/GalleryHeader";
import { Navbar } from "@/components/Navbar";
import { TranslationProvider } from "@/hooks/useTranslation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Image, TimeFilter, CategoryFilter } from "@/lib/types";
import { getAllImages, searchImages, toggleLikeImage} from "@/lib/image-service";
import ImageCard from "@/components/gallery/ItemCard";
import TimeFilterComponent from "@/components/gallery/TimeFilterComponet";
import { useToast } from "@/hooks/useToast";
import GalleryControl from "@/components/gallery/GalleryControl";
import { Button } from "@/components/ui/button";
import { ArrowUp, Filter, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function GalleryPage() {
  const [ images, setImages ] = useState<Image[]>([]);
  const [ searchQuery, setSearchQuery ] = useState('');
  const [ selectedCategory, setSelectedCategory ] = useState<CategoryFilter>('all');
  // const [ categories, setCategories ] = useState<CategoryFilter>('all');
  const [ timeFilter, setTimeFilter ] = useState<TimeFilter>('all');
  const [ isLoading, setIsLoading ] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = () => {
      setIsLoading(true);
      try {
        const allImages = getAllImages();
        setImages(allImages);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          title: 'Error',
          description: 'Failed to load images. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  // Filter images when search query, category or time filter change
  useEffect(() => {
    const filteredImages = searchImages(searchQuery, selectedCategory, timeFilter);
    setImages(filteredImages);
  }, [searchQuery, selectedCategory, timeFilter]);

  // Handle time filter change
  const handleTimeFilterChange = (filter: TimeFilter) => {
    setTimeFilter(filter);
  };

  // Handle time category change
  const handleCategoryFilterChange = (category: CategoryFilter) => {
    setSelectedCategory(category);
  };

  // Handle like toggle
  const handleLikeToggle = (id: string) => {
    try {
      const updatedImage = toggleLikeImage(id);
      setImages(prev => 
        prev.map(img => img.id === id ? updatedImage : img)
      );
    } catch (error) {
      console.error('Error toggling like:', error);
      toast({
        title: 'Error',
        description: 'Failed to update like. Please try again.',
        variant: 'destructive',
      });
    }
  };
  return (
    <TranslationProvider>
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Navbar />
        {/* Background effects */}
        <div className="fixed inset-0 bg-gradient-to-br from-background via-background to-primary/5 opacity-80"></div>
        {/* Particles container with improved animation */}
        <div className="particles-container fixed inset-0 z-0"></div>
        {/* Floating background elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 opacity-40 dark:opacity-20">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          </div>
        </div>
        {/* Floating cubes with improved animation */}
        <div className="cube-decoration fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.div
            className="cube cube-1 bg-primary/10 w-32 h-32 rounded-lg absolute top-[10%] left-[5%]"
            animate={{
              y: [0, 20, 0],
              rotate: [0, 5, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="cube cube-2 bg-primary/5 w-40 h-40 rounded-lg absolute top-[40%] right-[10%] rotate-12"
            animate={{
              y: [0, -30, 0],
              rotate: [12, 17, 12],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
          <motion.div
            className="cube cube-3 bg-primary/5 w-24 h-24 rounded-lg absolute bottom-[15%] left-[15%] -rotate-12"
            animate={{
              y: [0, 15, 0],
              rotate: [-12, -20, -12],
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
          <motion.div
            className="cube cube-4 bg-primary/10 w-20 h-20 rounded-lg absolute bottom-[30%] right-[25%] rotate-45"
            animate={{
              y: [0, -20, 0],
              rotate: [45, 60, 45],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3,
            }}
          />
        </div>
        <GalleryHeader />
        <div className="bg-background/80 backdrop-blur-md top-16 z-30 border-b border-border py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <GalleryControl
              currentCategory={selectedCategory}
              onCategoryChange={handleCategoryFilterChange}
            />
            
            <div className="flex gap-2 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search gallery..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <X className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground cursor-pointer" onClick={() => setSearchQuery('')} />
              </div>
              
              <div className="relative">
                <Button variant="outline" className="flex items-center gap-2">
                  <ArrowUp className="h-4 w-4" />
                  <span className="hidden sm:inline">Upload</span>
                </Button>
                <div className="absolute right-0 top-full mt-1 w-48 bg-background border border-border rounded-md shadow-lg z-30 hidden group-focus-within:block">
                  {/* Sort options would appear here */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

        <main className="flex-1 container px-4 sm:px-6 pb-12 z-10">
          {/* Gallery items would appear here */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-card p-4 rounded-lg shadow-sm"
              >
                <h2 className="text-xl font-semibold mb-4">Browse</h2>

                <TimeFilterComponent
                  currentFilter={timeFilter}
                  onFilterChange={handleTimeFilterChange}
                />
              </motion.div>
            </div>

            <div className="lg:col-span-3">
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 animate-pulse">
                  {[...Array(9)].map((_, index) => (
                    <div
                      key={index}
                      className="aspect-square rounded-lg bg-muted"
                    ></div>
                  ))}
                </div>
              ) : images.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, staggerChildren: 0.1 }}
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
                >
                  {images.map((image) => (
                    <ImageCard
                      key={image.id}
                      image={image}
                      onLike={handleLikeToggle}
                    />
                  ))}
                </motion.div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <h2 className="text-xl font-semibold mb-2">
                    No images found
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search or filters
                  </p>
                  <Button variant="outline" className="flex items-center gap-2" onClick={() => setSearchQuery('')}>
                    <Filter className="h-4 w-4" />
                    <span className="hidden sm:inline">Clear Filter</span>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </TranslationProvider>
  );
}
