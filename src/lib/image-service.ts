
import { Image, TimeFilter, CategoryFilter } from './types';
import { v4 as uuidv4 } from 'uuid';
import { isToday, isThisWeek, isThisMonth, parseISO } from 'date-fns';

// Mock data with categories added
const mockImages: Image[] = [
  {
    id: '1',
    title: 'Modern Workspace',
    description: 'A clean, minimal workspace for maximum productivity',
    url: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=2000&auto=format&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=500&auto=format&fit=crop',
    category: 'All',
    likes: 243,
    liked: false,
    uploadedAt: '2023-10-15T09:24:00Z'
  },
  {
    id: '2',
    title: 'Coding Session',
    description: 'Programming with a view of code on the screen',
    url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2000&auto=format&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=500&auto=format&fit=crop',
    category: 'all',
    likes: 187,
    liked: false,
    uploadedAt: '2023-11-22T14:30:00Z'
  },
  {
    id: '3',
    title: 'Circuit Design',
    description: 'Macro photography of a complex circuit board',
    url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000&auto=format&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=500&auto=format&fit=crop',
    category: 'builds',
    likes: 125,
    liked: false,
    uploadedAt: '2023-12-05T11:15:00Z'
  },
  {
    id: '4',
    title: 'Remote Work',
    description: 'Person using laptop on a comfortable bed',
    url: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?q=80&w=2000&auto=format&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?q=80&w=500&auto=format&fit=crop',
    category: 'events',
    likes: 305,
    liked: false,
    uploadedAt: '2024-01-18T16:45:00Z'
  },
  {
    id: '5',
    title: 'Productive Setup',
    description: 'Person working on a MacBook Pro with clean desktop',
    url: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2000&auto=format&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=500&auto=format&fit=crop',
    category: 'Technology',
    likes: 218,
    liked: false,
    uploadedAt: '2024-02-01T08:20:00Z'
  }
];

// Store images in local storage to persist between sessions
const LOCAL_STORAGE_KEY = 'gallery_images';

// Get images from local storage or use mock data
const getStoredImages = (): Image[] => {
  if (typeof window === 'undefined') return mockImages;
  
  const storedImages = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!storedImages) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(mockImages));
    return mockImages;
  }
  return JSON.parse(storedImages);
};

// Save images to local storage
const saveImagesToStorage = (images: Image[]): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(images));
  }
};

// Get all images
export const getAllImages = (): Image[] => {
  return getStoredImages();
};

// Get image by ID
export const getImageById = (id: string): Image | undefined => {
  const images = getStoredImages();
  return images.find(img => img.id === id);
};

// Filter images by time
const filterImagesByTime = (images: Image[], timeFilter: TimeFilter): Image[] => {
  if (timeFilter === 'all') return images;
  
  return images.filter(img => {
    const uploadDate = parseISO(img.uploadedAt);
    
    switch (timeFilter) {
      case 'today':
        return isToday(uploadDate);
      case 'week':
        return isThisWeek(uploadDate);
      case 'month':
        return isThisMonth(uploadDate);
      default:
        return true;
    }
  });
};

// Advanced search and filter images
export const searchImages = (
  query: string,
  category: CategoryFilter = 'all',
  timeFilter: TimeFilter = 'all'
): Image[] => {
  const searchTerms = query.toLowerCase().trim().split(/\s+/);
  
  // First filter by category if specified
  let filteredImages = [...mockImages];
  if (category !== 'all') {
    filteredImages = filteredImages.filter(img => img.category.toLowerCase() === category);
  }

  
  
  // Then apply time filter
  filteredImages = filterImagesByTime(filteredImages, timeFilter);
  
  // Finally apply search query if any
  if (query.trim()) {
    filteredImages = filteredImages.filter(img => 
      searchTerms.some(term => 
        img.title.toLowerCase().includes(term) || 
        img.description.toLowerCase().includes(term)
      )
    );
  }
  
  return filteredImages;
};

// Toggle like on an image
export const toggleLikeImage = (id: string): Image => {
  const images = getStoredImages();
  const updatedImages = images.map(img => {
    if (img.id === id) {
      return {
        ...img,
        liked: !img.liked,
        likes: img.liked ? img.likes - 1 : img.likes + 1
      };
    }
    return img;
  });
  
  saveImagesToStorage(updatedImages);
  return updatedImages.find(img => img.id === id)!;
};

// Upload a new image
export const uploadImage = (
  title: string, 
  description: string, 
  tags: string[], 
  category: string,
  file: File
): Promise<Image> => {
  return new Promise((resolve) => {
    // In a real app, you would upload the file to a server or cloud storage
    // Here we'll create a mock URL using object URLs
    const objectUrl = URL.createObjectURL(file);
    
    // Create a new image object
    const newImage: Image = {
      id: uuidv4(),
      title,
      description,
      url: objectUrl,
      thumbnailUrl: objectUrl,
      category,
      likes: 0,
      liked: false,
      uploadedAt: new Date().toISOString()
    };
    
    // Add to stored images
    const images = getStoredImages();
    const updatedImages = [newImage, ...images];
    saveImagesToStorage(updatedImages);
    
    // Simulate network delay
    setTimeout(() => {
      resolve(newImage);
    }, 1000);
  });
};