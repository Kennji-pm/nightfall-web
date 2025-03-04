import { CategoryFilter as CategoryFilterType } from '@/lib/types';

interface GalleryControlProps {
  currentCategory: CategoryFilterType;
  onCategoryChange: (categories: CategoryFilterType) => void;
}

const GalleryControl: React.FC<GalleryControlProps> = ({ currentCategory, onCategoryChange }) => {
    const categories: { value: CategoryFilterType; label: string; }[] = [
        { value: 'all', label: 'All'},
        { value: "builds", label: "Builds" },
        { value: "landscapes", label: "Landscapes" },
        { value: "events", label: "Events" },
        { value: "players", label: "Players" },
        { value: "redstone", label: "Redstone" },
      ];
    return (
      <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
        {categories.map(category => (
          <button
            key={category.value}
            className={`gallery-filter-button ${currentCategory === category.value ? 'active' : ''}`}
            onClick={() => onCategoryChange(category.value)}
          >
            {category.label}
          </button>
        ))}
      </div>
    );
}
export default GalleryControl;