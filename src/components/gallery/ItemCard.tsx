
import React from 'react';
import { Heart } from 'lucide-react';
import { Image } from '@/lib/types';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import NextImage from 'next/image';
import Link from 'next/link';

interface ImageCardProps {
  image: Image;
  onLike: (id: string) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onLike }) => {
  const { id, title, thumbnailUrl, likes, liked } = image;
  
  return (
    <motion.div 
      className="image-card overflow-hidden rounded-lg bg-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link 
        href={`/image/${id}`}
        className="block relative aspect-square overflow-hidden"
      >
        <span className="absolute inset-0 bg-black/30 opacity-0 transition-opacity hover:opacity-100 z-10 flex items-center justify-center">
          <span className="text-white text-sm font-medium px-3 py-1 bg-black/60 rounded-full">
            View Details
          </span>
        </span>
        <NextImage 
            src={thumbnailUrl} 
            alt={title} 
            className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
            loading="lazy"
            width={300}
            height={300}
        />
      </Link>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <Link href={`/image/${id}`} className="font-medium line-clamp-1 hover:text-primary transition-colors">{title}</Link>
          <button 
            onClick={(e) => {
              e.preventDefault();
              onLike(id);
            }}
            className="like-button flex items-center gap-1"
            aria-label={liked ? "Unlike" : "Like"}
          >
            <Heart 
              className={cn(
                "h-5 w-5 transition-all", 
                liked ? "fill-red-500 text-red-500" : "text-muted-foreground"
              )} 
            />
            <span className="text-xs font-medium">{likes}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ImageCard;
