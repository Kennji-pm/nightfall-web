import { ImageItem } from "../hooks/useGallery";

// Format date to readable string
export const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Get all unique categories from images
export const getUniqueCategories = (images: ImageItem[]): string[] => {
  const categories = new Set<string>();
  
  images.forEach(image => {
    categories.add(image.category);
  });
  
  return Array.from(categories).sort();
};

// Get all unique tags from images
export const getUniqueTags = (images: ImageItem[]): string[] => {
  const tags = new Set<string>();
  
  images.forEach(image => {
    image.tags.forEach(tag => {
      tags.add(tag);
    });
  });
  
  return Array.from(tags).sort();
};

// Get image file extension
export const getFileExtension = (filename: string): string => {
  return filename.split('.').pop() || '';
};

// Validate if a URL is an image
export const isImageUrl = (url: string): boolean => {
  const extensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
  const urlExtension = url.split('.').pop()?.toLowerCase() || '';
  return extensions.includes(urlExtension);
};

// Generate a placeholder image URL
export const generatePlaceholderImage = (width: number, height: number): string => {
  return `https://via.placeholder.com/${width}x${height}`;
};

// Convert file size to human-readable format
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};