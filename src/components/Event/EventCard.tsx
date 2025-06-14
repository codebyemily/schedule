import React from 'react';
import { Event } from '../../types';
import { formatTime } from '../../utils/dateUtils';
import { Clock, MapPin } from 'lucide-react';

interface EventCardProps {
  event: Event;
  onClick: () => void;
  compact?: boolean;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  onClick,
  compact = false,
}) => {
  return (
    <div
      className={`
        rounded-lg border-l-4 shadow-sm cursor-pointer transition-all duration-200
        hover:shadow-md hover:scale-[1.02] bg-white p-2
        ${compact ? 'min-h-[30px]' : 'min-h-[60px]'}
      `}
      style={{ borderLeftColor: event.color }}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h3 className={`font-medium text-gray-900 truncate ${compact ? 'text-xs' : 'text-sm'}`}>
            {event.title}
          </h3>
          
          {!compact && (
            <>
              <div className="flex items-center mt-1 text-xs text-gray-500">
                <Clock className="h-3 w-3 mr-1" />
                {formatTime(new Date(event.startTime))} - {formatTime(new Date(event.endTime))}
              </div>
              
              {event.description && (
                <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                  {event.description}
                </p>
              )}
            </>
          )}
        </div>
        
        <div
          className="w-2 h-2 rounded-full flex-shrink-0 ml-2"
          style={{ backgroundColor: event.color }}
        />
      </div>
    </div>
  );
};