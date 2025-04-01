import React, { useRef, useEffect, useState } from "react";
import { Filter, Search, Upload, ArrowUp, ArrowDown, Image as ImageIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useGallery, GALLERY_CATEGORIES, Category } from "@/contexts/GalleryContext";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import NextImage from "next/image";

export const GalleryControls = () => {
  const { 
    searchQuery, setSearchQuery, 
    activeCategory, setActiveCategory,
    activeTags, toggleTag,
    sortBy, setSortBy,
    resetFilters,
    toggleUploadModal,
    searchSuggestions,
    selectedSuggestionIndex,
    navigateSuggestion,
    selectSuggestion,
    clearSuggestions
  } = useGallery();
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only process keyboard navigation when search input is focused
      if (document.activeElement === searchInputRef.current) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          navigateSuggestion("down");
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          navigateSuggestion("up");
        } else if (e.key === "Enter" && selectedSuggestionIndex >= 0) {
          e.preventDefault();
          selectSuggestion(selectedSuggestionIndex);
        } else if (e.key === "Escape") {
          e.preventDefault();
          clearSuggestions();
          searchInputRef.current?.blur();
        }
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        suggestionsRef.current && 
        !suggestionsRef.current.contains(e.target as Node) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(e.target as Node)
      ) {
        clearSuggestions();
        setIsFocused(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("click", handleClickOutside);
    };
  }, [navigateSuggestion, selectSuggestion, selectedSuggestionIndex, clearSuggestions]);

  return (
    <div className="sticky top-16 z-30 bg-background/80 backdrop-blur-md border-b border-border py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Category filters */}
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar">
            {GALLERY_CATEGORIES.map(category => (
              <button
                key={category.id}
                className={`gallery-filter-button whitespace-nowrap ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id as Category)}
              >
                {category.label}
              </button>
            ))}
          </div>
          
          {/* Search and action buttons */}
          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                ref={searchInputRef}
                placeholder="Search gallery..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
              />
              
              {/* Search suggestions with improved animations */}
              <AnimatePresence>
                {searchSuggestions.length > 0 && isFocused && (
                  <motion.div 
                    ref={suggestionsRef}
                    className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-md shadow-md z-50 overflow-hidden"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {searchSuggestions.map((suggestion, index) => (
                      <Link
                        key={suggestion.id}
                        href={`/gallery/image/${suggestion.id}`}
                        className={`flex items-center gap-3 p-2 hover:bg-muted transition-colors truncate ${
                          index === selectedSuggestionIndex ? 'bg-muted' : ''
                        }`}
                        onClick={() => {
                          setSearchQuery(suggestion.title);
                          clearSuggestions();
                          setIsFocused(false);
                        }}
                      >
                        <NextImage 
                          src={suggestion.thumbnail} 
                          alt={suggestion.title}
                          className="w-10 h-10 object-cover rounded-sm"
                          width={30}
                          height={30}
                        />
                        <div className="flex-grow min-w-0">
                          <p className="text-sm font-medium truncate">{suggestion.title}</p>
                          <p className="text-xs text-muted-foreground truncate">{suggestion.description}</p>
                        </div>
                        {index === selectedSuggestionIndex && (
                          <div className="flex gap-1 text-xs text-muted-foreground">
                            <ArrowUp className="h-3 w-3" />
                            <ArrowDown className="h-3 w-3" />
                            to navigate
                          </div>
                        )}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* No results found */}
              <AnimatePresence>
                {searchQuery.length >= 2 && searchSuggestions.length === 0 && isFocused && (
                  <motion.div 
                    className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-md shadow-md z-50 p-3 text-center"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <ImageIcon className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">No matching images found</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Sort button - cycles through sort options */}
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => {
                if (sortBy === "newest") setSortBy("popular");
                else if (sortBy === "popular") setSortBy("views");
                else setSortBy("newest");
              }}
            >
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">
                {sortBy === "newest" ? "Newest" : sortBy === "popular" ? "Popular" : "Most Viewed"}
              </span>
            </Button>
            
            {/* Upload button */}
            <Button 
              variant="default" 
              className="flex items-center gap-2"
              onClick={toggleUploadModal}
            >
              <Upload className="h-4 w-4" />
              <span className="hidden sm:inline">Upload</span>
            </Button>
          </div>
        </div>
        
        {/* Active Tags */}
        {activeTags.length > 0 && (
          <div className="flex flex-wrap gap-2 items-center mt-4">
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
              onClick={() => resetFilters()}
            >
              Clear all
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};