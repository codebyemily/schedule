import React from 'react';
import { ChevronLeft, ChevronRight, Calendar, Plus } from 'lucide-react';
import { Button } from '../UI/Button';
import { ViewMode } from '../../types';
import { formatDate } from '../../utils/dateUtils';

interface CalendarHeaderProps {
  currentDate: Date;
  viewMode: ViewMode;
  onPrevious: () => void;
  onNext: () => void;
  onToday: () => void;
  onViewModeChange: (mode: ViewMode) => void;
  onCreateEvent: () => void;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  viewMode,
  onPrevious,
  onNext,
  onToday,
  onViewModeChange,
  onCreateEvent,
}) => {
  const getHeaderTitle = () => {
    switch (viewMode) {
      case 'day':
        return formatDate(currentDate);
      case 'week':
        const weekStart = new Date(currentDate);
        weekStart.setDate(currentDate.getDate() - currentDate.getDay());
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        return `${weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${weekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
      case 'month':
        return currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      default:
        return '';
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 bg-white border-b border-gray-200">
      <div className="flex items-center space-x-4 mb-4 sm:mb-0">
        <div className="flex items-center space-x-2">
          <Calendar className="h-6 w-6 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Schedule</h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" onClick={onPrevious} icon={ChevronLeft} />
          <Button variant="ghost" onClick={onNext} icon={ChevronRight} />
          <Button variant="secondary" onClick={onToday} size="sm">
            Today
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
        <h2 className="text-xl font-semibold text-gray-800">{getHeaderTitle()}</h2>
        
        <div className="flex items-center space-x-2">
          {/* View Mode Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            {(['day', 'week', 'month'] as ViewMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => onViewModeChange(mode)}
                className={`
                  px-3 py-1 text-sm font-medium rounded-md transition-all duration-150
                  ${viewMode === mode
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                  }
                `}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>
          
          <Button onClick={onCreateEvent} icon={Plus}>
            New Event
          </Button>
        </div>
      </div>
    </div>
  );
};