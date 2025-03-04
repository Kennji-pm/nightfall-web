export interface Image {
    id: string;
    title: string;
    description: string;
    url: string;
    thumbnailUrl: string;
    category: string;
    likes: number;
    liked: boolean;
    uploadedAt: string;
  }
  
  export interface Tag {
    id: string;
    name: string;
    count: number;
  }
  
  export interface UploadImageForm {
    title: string;
    description: string;
    tags: string[];
    category: string;
    image: File | null;
  }
  export type CategoryFilter = 'all' | 'builds' | 'landscapes' | 'events' | 'players' | 'redstone';
  export type TimeFilter = 'all' | 'today' | 'week' | 'month' | 'year';