
import React from 'react';
import { Calendar, CalendarRange, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TimeFilter as TimeFilterType } from '@/lib/types';
import { motion } from 'framer-motion';

interface TimeFilterProps {
  currentFilter: TimeFilterType;
  onFilterChange: (filter: TimeFilterType) => void;
}

const TimeFilter: React.FC<TimeFilterProps> = ({ currentFilter, onFilterChange }) => {
  const filters: { value: TimeFilterType; label: string; icon: React.ReactNode }[] = [
    { value: 'all', label: 'All Time', icon: <Calendar className="h-4 w-4" /> },
    { value: 'today', label: 'Today', icon: <Clock className="h-4 w-4" /> },
    { value: 'week', label: 'This Week', icon: <CalendarRange className="h-4 w-4" /> },
    { value: 'month', label: 'This Month', icon: <CalendarRange className="h-4 w-4" /> },
  ];
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-3">
        <Calendar className="h-4 w-4 text-primary" />
        <h3 className="font-medium">Filter by Time</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <motion.div
            key={filter.value}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant={currentFilter === filter.value ? "default" : "outline"}
              size="sm"
              className="gap-1.5"
              onClick={() => onFilterChange(filter.value)}
            >
              {filter.icon}
              {filter.label}
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TimeFilter;
