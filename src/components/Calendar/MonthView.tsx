import React from 'react';
import { Event } from '../../types';
import { getMonthDays, isToday, isSameDay } from '../../utils/dateUtils';
import { getEventsForDay } from '../../utils/eventUtils';

interface MonthViewProps {
  date: Date;
  events: Event[];
  onEventClick: (event: Event) => void;
  onDayClick: (date: Date) => void;
}

export const MonthView: React.FC<MonthViewProps> = ({
  date,
  events,
  onEventClick,
  onDayClick,
}) => {
  const monthDays = getMonthDays(date);
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="flex-1 overflow-hidden">
      <div className="h-full flex flex-col">
        {/* Weekday Headers */}
        <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50">
          {weekdays.map((day) => (
            <div key={day} className="p-3 text-center text-sm font-medium text-gray-600 border-r border-gray-200 last:border-r-0">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="flex-1 grid grid-cols-7 grid-rows-6">
          {monthDays.map((day, index) => {
            const dayEvents = getEventsForDay(events, day);
            const isCurrentMonth = day.getMonth() === date.getMonth();
            const isCurrentDay = isToday(day);

            return (
              <div
                key={index}
                className={`
                  border-r border-b border-gray-200 last:border-r-0 p-2 cursor-pointer
                  hover:bg-gray-50 transition-colors min-h-[120px] flex flex-col
                  ${!isCurrentMonth ? 'bg-gray-50 text-gray-400' : 'bg-white'}
                `}
                onClick={() => onDayClick(day)}
              >
                <div className={`
                  text-sm font-medium mb-1 flex items-center justify-center w-6 h-6 rounded-full
                  ${isCurrentDay ? 'bg-blue-600 text-white' : ''}
                `}>
                  {day.getDate()}
                </div>
                
                <div className="flex-1 space-y-1 overflow-hidden">
                  {dayEvents.slice(0, 3).map((event) => (
                    <div
                      key={event.id}
                      className="text-xs p-1 rounded truncate cursor-pointer hover:opacity-80 transition-opacity"
                      style={{ backgroundColor: event.color, color: 'white' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEventClick(event);
                      }}
                    >
                      {event.title}
                    </div>
                  ))}
                  {dayEvents.length > 3 && (
                    <div className="text-xs text-gray-500 px-1">
                      +{dayEvents.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};