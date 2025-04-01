import React, { memo } from "react";
import { useGallery } from "@/contexts/GalleryContext";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export const GalleryPagination = memo(() => {
  const { 
    currentPage, 
    totalPages, 
    setPage,
    filteredImages,
    displayedImages,
    itemsPerPage
  } = useGallery();

  // Don't show pagination if there are no results or only one page
  if (filteredImages.length === 0 || totalPages <= 1) {
    return null;
  }

  // Calculate which page numbers to show
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      // Show all pages if there are 5 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always include first page
      pages.push(1);
      
      // Calculate middle pages
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);
      
      // Adjust for edge cases
      if (currentPage <= 2) {
        endPage = 4;
      } else if (currentPage >= totalPages - 1) {
        startPage = totalPages - 3;
      }
      
      // Add ellipsis if needed
      if (startPage > 2) {
        pages.push("ellipsis-start");
      }
      
      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      // Add ellipsis if needed
      if (endPage < totalPages - 1) {
        pages.push("ellipsis-end");
      }
      
      // Always include last page
      pages.push(totalPages);
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();
  
  // Calculate the displayed range
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(startIndex + displayedImages.length - 1, filteredImages.length);

  return (
    <div className="flex flex-col items-center gap-2 py-8">
      {/* Improved Showing results display */}
      <motion.div 
        className="text-sm bg-muted/30 px-4 py-2 rounded-full font-medium mb-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        key={`${startIndex}-${endIndex}-${filteredImages.length}`}
      >
        <span className="font-bold text-primary">{startIndex}</span> - <span className="font-bold text-primary">{endIndex}</span> of <span className="font-bold">{filteredImages.length}</span> images
      </motion.div>
      
      {/* Pagination buttons */}
      <div className="flex justify-center gap-2">
        {/* Previous page button */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => setPage(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        {/* Page numbers */}
        {pageNumbers.map((page, index) => {
          if (page === "ellipsis-start" || page === "ellipsis-end") {
            return (
              <Button
                key={`ellipsis-${index}`}
                variant="ghost"
                className="w-9 h-9"
                disabled
                aria-hidden="true"
              >
                ...
              </Button>
            );
          }
          
          return (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              className="w-9 h-9"
              onClick={() => typeof page === 'number' && setPage(page)}
              aria-label={`Page ${page}`}
              aria-current={currentPage === page ? "page" : undefined}
            >
              {page}
            </Button>
          );
        })}
        
        {/* Next page button */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => setPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
});

GalleryPagination.displayName = "GalleryPagination";