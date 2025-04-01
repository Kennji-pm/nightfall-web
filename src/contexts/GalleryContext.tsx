import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, useRef } from "react";
import { toast } from "@/hooks/useToast";
import { useSearchParams, useRouter } from "next/navigation";

// Define types
export type GalleryImage = {
  id: number;
  thumbnail: string;
  fullsize: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  author: string;
  views: number;
  likes: number;
  date: string;
};

export type SortOption = "newest" | "popular" | "views";
export type Category = "all" | "builds" | "landscapes" | "events" | "players" | "redstone";

// Gallery data from our "database"
import galleryData from "@/data/gallery-data";

interface GalleryContextType {
  images: GalleryImage[];
  filteredImages: GalleryImage[];
  displayedImages: GalleryImage[];
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  searchQuery: string;
  activeCategory: Category;
  activeTags: string[];
  sortBy: SortOption;
  searchSuggestions: GalleryImage[];
  selectedSuggestionIndex: number;
  isUploadModalOpen: boolean;
  uploadImageLink: string;
  isValidImageLink: boolean;
  isLinkLoading: boolean;
  isImageLoading: boolean;
  imageLoadError: boolean;

  // Methods
  setSearchQuery: (query: string) => void;
  setActiveCategory: (category: Category) => void;
  toggleTag: (tag: string) => void;
  setSortBy: (sort: SortOption) => void;
  setPage: (page: number) => void;
  incrementImageViews: (imageId: number) => void;
  resetFilters: () => void;
  navigateSuggestion: (direction: "up" | "down") => void;
  selectSuggestion: (index: number) => void;
  clearSuggestions: () => void;
  toggleUploadModal: () => void;
  setUploadImageLink: (link: string) => void;
  validateImageLink: () => void;
  submitUploadForm: (data: {
    title: string;
    description: string;
    category: string;
    tags: string[];
  }) => void;
  setImageLoading: (loading: boolean) => void;
  setImageLoadError: (error: boolean) => void;
}

const GalleryContext = createContext<GalleryContextType | undefined>(undefined);

const useDebounce = (callback: () => void, delay: number) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  return useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(callback, delay);
  }, [callback, delay]);
};

export const GALLERY_CATEGORIES = [
  { id: "all", label: "All" },
  { id: "builds", label: "Builds" },
  { id: "landscapes", label: "Landscapes" },
  { id: "events", label: "Events" },
  { id: "players", label: "Players" },
  { id: "redstone", label: "Redstone" },
];

export const GALLERY_TAGS = [
  "medieval", "modern", "castle", "house", "farm", "adventure", 
  "survival", "creative", "pvp", "minigame", "community"
];

export const GalleryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get URL parameters or default values
  const queryPage = parseInt(searchParams.get("page") || "1");
  const queryCategory = (searchParams.get("category") || "all") as Category;
  const querySearch = searchParams.get("search") || "";
  const querySort = (searchParams.get("sort") || "newest") as SortOption;
  const queryTags = searchParams.get("tags")?.split(",").filter(Boolean) || [];
  
  // Local state
  const [images, setImages] = useState<GalleryImage[]>(galleryData);
  const [filteredImages, setFilteredImages] = useState<GalleryImage[]>([]);
  const [displayedImages, setDisplayedImages] = useState<GalleryImage[]>([]);
  const [currentPage, setCurrentPage] = useState(queryPage);
  const [itemsPerPage] = useState(12);
  const [searchQuery, setSearchQueryState] = useState(querySearch);
  const [activeCategory, setActiveCategoryState] = useState<Category>(queryCategory);
  const [activeTags, setActiveTags] = useState<string[]>(queryTags);
  const [sortBy, setSortByState] = useState<SortOption>(querySort);
  const [searchSuggestions, setSearchSuggestions] = useState<GalleryImage[]>([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [totalPages, setTotalPages] = useState(1);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [imageLoadError, setImageLoadError] = useState(false);
  
  // Upload modal state
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadImageLink, setUploadImageLink] = useState("");
  const [isValidImageLink, setIsValidImageLink] = useState(false);
  const [isLinkLoading, setIsLinkLoading] = useState(false);

  // Update URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (currentPage > 1) params.set("page", currentPage.toString());
    if (activeCategory !== "all") params.set("category", activeCategory);
    if (searchQuery) params.set("search", searchQuery);
    if (sortBy !== "newest") params.set("sort", sortBy);
    if (activeTags.length > 0) params.set("tags", activeTags.join(","));
    
    router.replace(params.toString());
  }, [currentPage, activeCategory, searchQuery, sortBy, activeTags, router]);

  // Filter images whenever filters change
  useEffect(() => {
    let filtered = [...images];
    
    if (activeCategory !== "all") {
      filtered = filtered.filter(img => img.category === activeCategory);
    }
    
    if (activeTags.length > 0) {
      filtered = filtered.filter(img => 
        activeTags.some(tag => img.tags.includes(tag))
      );
    }
    
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
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    
    // If current page is now invalid, reset to page 1
    if (currentPage > Math.ceil(filtered.length / itemsPerPage) && filtered.length > 0) {
      setCurrentPage(1);
    }
  }, [activeCategory, activeTags, searchQuery, sortBy, images, itemsPerPage, currentPage]);

  // Update displayed images based on current page and filtered results
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setDisplayedImages(filteredImages.slice(startIndex, endIndex));
  }, [filteredImages, currentPage, itemsPerPage]);

  const debouncedSearch = useDebounce(() => {
    if (searchQuery.length >= 2) {
      setSearchSuggestions(images.filter(img => img.title.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5));
    } else {
      setSearchSuggestions([]);
    }
  }, 300);

  useEffect(() => {
    debouncedSearch();
  }, [searchQuery, debouncedSearch]);

  // Track viewed images to prevent multiple view counts from same device
  const [viewedImages] = useState<Set<number>>(() => {
    const savedViews = localStorage.getItem('viewedImages');
    return savedViews ? new Set(JSON.parse(savedViews)) : new Set<number>();
  });

  // Function to increment view count only once per device/session
  const incrementImageViews = useCallback((imageId: number) => {
    // Check if this image has already been viewed by this device
    if (!viewedImages.has(imageId)) {
      setImages(prev => 
        prev.map(img => 
          img.id === imageId ? { ...img, views: img.views + 1 } : img
        )
      );
      
      // Add to viewed images set
      viewedImages.add(imageId);
      localStorage.setItem('viewedImages', JSON.stringify([...viewedImages]));
    }
  }, [viewedImages]);

  // Set search query and update URL
  const setSearchQuery = useCallback((query: string) => {
    setSearchQueryState(query);
    setCurrentPage(1); // Reset to first page on new search
  }, []);

  // Set category and update URL
  const setActiveCategory = useCallback((category: Category) => {
    setActiveCategoryState(category);
    setCurrentPage(1); // Reset to first page on category change
  }, []);

  // Toggle tag in filter and update URL
  const toggleTag = useCallback((tag: string) => {
    setActiveTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
    setCurrentPage(1); // Reset to first page on tag change
  }, []);

  // Set sort option and update URL
  const setSortBy = useCallback((sort: SortOption) => {
    setSortByState(sort);
  }, []);

  // Set current page and update URL
  const setPage = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Reset all filters
  const resetFilters = useCallback(() => {
    setSearchQueryState("");
    setActiveCategoryState("all");
    setActiveTags([]);
    setSortByState("newest");
    setCurrentPage(1);
  }, []);

  // Navigate through search suggestions with keyboard
  const navigateSuggestion = useCallback((direction: "up" | "down") => {
    if (searchSuggestions.length === 0) return;
    
    if (direction === "down") {
      setSelectedSuggestionIndex(prev => 
        prev < searchSuggestions.length - 1 ? prev + 1 : 0
      );
    } else {
      setSelectedSuggestionIndex(prev => 
        prev > 0 ? prev - 1 : searchSuggestions.length - 1
      );
    }
  }, [searchSuggestions.length]);

  // Select a suggestion
  const selectSuggestion = useCallback((index: number) => {
    if (index >= 0 && index < searchSuggestions.length) {
      const suggestion = searchSuggestions[index];
      setSearchQuery(suggestion.title);
      router.push(`/gallery/image/${suggestion.id}`);
      setSearchSuggestions([]);
    }
  }, [router, searchSuggestions, setSearchQuery]);

  // Clear search suggestions
  const clearSuggestions = useCallback(() => {
    setSearchSuggestions([]);
    setSelectedSuggestionIndex(-1);
  }, []);

  // Toggle upload modal
  const toggleUploadModal = useCallback(() => {
    setIsUploadModalOpen(prev => !prev);
    if (!isUploadModalOpen) {
      // Reset state when opening modal
      setUploadImageLink("");
      setIsValidImageLink(false);
    }
  }, [isUploadModalOpen]);

  // Validate image link
  const validateImageLink = useCallback(() => {
    if (!uploadImageLink) return;
    
    setIsLinkLoading(true);
    setIsValidImageLink(false);
    
    const img = new Image();
    img.onload = () => {
      setIsValidImageLink(true);
      setIsLinkLoading(false);
    };
    img.onerror = () => {
      setIsValidImageLink(false);
      setIsLinkLoading(false);
      toast({
        title: "Invalid image link",
        description: "The URL does not point to a valid image",
        variant: "destructive"
      });
    };
    img.src = uploadImageLink;
  }, [uploadImageLink]);

  // Submit upload form
  const submitUploadForm = useCallback((data: {
    title: string;
    description: string;
    category: string;
    tags: string[];
  }) => {
    if (!isValidImageLink) {
      toast({
        title: "Invalid image",
        description: "Please provide a valid image link",
        variant: "destructive"
      });
      return;
    }
    
    // Create new image object
    const newImage: GalleryImage = {
      id: Math.max(...images.map(img => img.id)) + 1,
      thumbnail: uploadImageLink,
      fullsize: uploadImageLink,
      title: data.title,
      description: data.description,
      category: data.category,
      tags: data.tags,
      author: "User",
      views: 0,
      likes: 0,
      date: new Date().toISOString().split('T')[0]
    };
    
    // Add to images array
    setImages(prev => [newImage, ...prev]);
    
    // Close modal and show success toast
    setIsUploadModalOpen(false);
    toast({
      title: "Image uploaded",
      description: "Your image has been added to the gallery",
    });
  }, [images, isValidImageLink, uploadImageLink]);

  // Memoize the context value to prevent unnecessary renders
  const value = useMemo(() => ({
    images,
    filteredImages,
    displayedImages,
    currentPage,
    totalPages,
    itemsPerPage,
    searchQuery,
    activeCategory,
    activeTags,
    sortBy,
    searchSuggestions,
    selectedSuggestionIndex,
    isUploadModalOpen,
    uploadImageLink,
    isValidImageLink,
    isLinkLoading,
    isImageLoading,
    imageLoadError,
    
    setSearchQuery,
    setActiveCategory,
    toggleTag,
    setSortBy,
    setPage,
    incrementImageViews,
    resetFilters,
    navigateSuggestion,
    selectSuggestion,
    clearSuggestions,
    toggleUploadModal,
    setUploadImageLink,
    validateImageLink,
    submitUploadForm,
    setImageLoading: setIsImageLoading,
    setImageLoadError
  }), [
    images, filteredImages, displayedImages,
    currentPage, totalPages, itemsPerPage,
    searchQuery, activeCategory, activeTags,
    sortBy, searchSuggestions, selectedSuggestionIndex,
    isUploadModalOpen, uploadImageLink, isValidImageLink,
    isLinkLoading, isImageLoading, imageLoadError,
    setSearchQuery, setActiveCategory, toggleTag,
    setSortBy, setPage, incrementImageViews,
    resetFilters, navigateSuggestion, selectSuggestion,
    clearSuggestions, toggleUploadModal, setUploadImageLink,
    validateImageLink, submitUploadForm
  ]);

  return (
    <GalleryContext.Provider value={value}>
      {children}
    </GalleryContext.Provider>
  );
};

export const useGallery = () => {
  const context = useContext(GalleryContext);
  if (context === undefined) {
    throw new Error("useGallery must be used within a GalleryProvider");
  }
  return context;
};