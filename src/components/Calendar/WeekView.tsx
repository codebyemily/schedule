import React from 'react';
import { Event } from '../../types';
import { getWeekDays, getTimeSlots, isToday } from '../../utils/dateUtils';
import { getEventsForDay, getEventPosition } from '../../utils/eventUtils';
import { EventCard } from '../Event/EventCard';

interface WeekViewProps {
  date: Date;
  events: Event[];
  onEventClick: (event: Event) => void;
  onTimeSlotClick: (date: Date, hour: number) => void;
}

export const WeekView: React.FC<WeekViewProps> = ({
  date,
  events,
  onEventClick,
  onTimeSlotClick,
}) => {
  const weekDays = getWeekDays(date);
  const timeSlots = getTimeSlots();

  return (
    <div className="flex-1 overflow-hidden">
      <div className="h-full flex flex-col">
        {/* week heading*/}
        <div className="flex border-b border-gray-200 bg-gray-50">
          <div className="w-20 flex-shrink-0 p-3"></div>
          {weekDays.map((day) => (
            <div key={day.toISOString()} className="flex-1 p-3 text-center border-l border-gray-200 first:border-l-0">
              <div className="text-sm font-medium text-gray-600">
                {day.toLocaleDateString('en-US', { weekday: 'short' })}
              </div>
              <div className={`text-lg font-semibold mt-1 ${
                isToday(day) ? 'text-blue-600' : 'text-gray-900'
              }`}>
                {day.getDate()}
              </div>
            </div>
          ))}
        </div>

        {/* week grid*/}
        <div className="flex-1 overflow-y-auto">
          <div className="relative">
            {timeSlots.map((slot, index) => (
              <div key={slot.hour} className="flex border-b border-gray-100" style={{ height: '60px' }}>
                <div className="w-20 flex-shrink-0 p-2 text-sm text-gray-500 font-medium">
                  {index > 0 && slot.time}
                </div>
                {weekDays.map((day) => (
                  <div
                    key={`${day.toISOString()}-${slot.hour}`}
                    className="flex-1 border-l border-gray-100 first:border-l-0 hover:bg-gray-50 transition-colors cursor-pointer relative"
                    onClick={() => onTimeSlotClick(day, slot.hour)}
                  >
                   
                    {isToday(day) && (
                      <div className="absolute inset-0 bg-blue-50 border-l-2 border-blue-600" />
                    )}
                  </div>
                ))}
              </div>
            ))}

            {/*events*/}
            {weekDays.map((day, dayIndex) => {
              const dayEvents = getEventsForDay(events, day);
              return (
                <div key={day.toISOString()} className="absolute top-0" style={{
                  left: `${80 + (dayIndex * (100 / 7))}%`,
                  width: `${100 / 7}%`,
                }}>
                  {dayEvents.map((event) => {
                    const position = getEventPosition(event);
                    return (
                      <div
                        key={event.id}
                        className="absolute left-1 right-1 z-10"
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
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};