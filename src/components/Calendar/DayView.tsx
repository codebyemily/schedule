import React from 'react';
import { Event } from '../../types';
import { getTimeSlots, formatTime } from '../../utils/dateUtils';
import { getEventsForDay, getEventPosition } from '../../utils/eventUtils';
import { EventCard } from '../Event/EventCard';

interface DayViewProps {
  date: Date;
  events: Event[];
  onEventClick: (event: Event) => void;
  onTimeSlotClick: (date: Date, hour: number) => void;
}

export const DayView: React.FC<DayViewProps> = ({
  date,
  events,
  onEventClick,
  onTimeSlotClick,
}) => {
  const timeSlots = getTimeSlots();
  const dayEvents = getEventsForDay(events, date);

  return (
    <div className="flex-1 overflow-hidden">
      <div className="h-full overflow-y-auto">
        <div className="relative">
          {/* Time Grid */}
          {timeSlots.map((slot, index) => (
            <div
              key={slot.hour}
              className="flex border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
              style={{ height: '60px' }}
              onClick={() => onTimeSlotClick(date, slot.hour)}
            >
              <div className="w-20 flex-shrink-0 p-2 text-sm text-gray-500 font-medium">
                {index > 0 && slot.time}
              </div>
              <div className="flex-1 relative">
                {/* Hour line */}
                <div className="absolute top-0 left-0 right-0 border-t border-gray-100" />
              </div>
            </div>
          ))}

          {/* Events */}
          <div className="absolute top-0 left-20 right-0">
            {dayEvents.map((event) => {
              const position = getEventPosition(event);
              return (
                <div
                  key={event.id}
                  className="absolute left-2 right-2 z-10"
                  style={{
                    top: `${position.top}px`,
                    height: `${position.height}px`,
                  }}
                >
                  <EventCard
                    event={event}
                    onClick={() => onEventClick(event)}
                    compact
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};