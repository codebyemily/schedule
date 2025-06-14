import { Event, EventCategory } from '../types';

export const defaultCategories: EventCategory[] = [
  { id: '1', name: 'Work', color: '#3B82F6' },
  { id: '2', name: 'Personal', color: '#8B5CF6' },
  { id: '3', name: 'Health', color: '#10B981' },
  { id: '4', name: 'Social', color: '#F59E0B' },
  { id: '5', name: 'Important', color: '#EF4444' },
];

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const getEventsForDay = (events: Event[], day: Date): Event[] => {
  return events.filter(event => {
    const eventDate = new Date(event.startTime);
    return (
      eventDate.getFullYear() === day.getFullYear() &&
      eventDate.getMonth() === day.getMonth() &&
      eventDate.getDate() === day.getDate()
    );
  }).sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
};

export const getEventDuration = (event: Event): number => {
  return new Date(event.endTime).getTime() - new Date(event.startTime).getTime();
};

export const getEventPosition = (event: Event): { top: number; height: number } => {
  const startTime = new Date(event.startTime);
  const endTime = new Date(event.endTime);
  const startMinutes = startTime.getHours() * 60 + startTime.getMinutes();
  const endMinutes = endTime.getHours() * 60 + endTime.getMinutes();
  const duration = endMinutes - startMinutes;
  
  return {
    top: (startMinutes / 60) * 60, // 60px per hour
    height: Math.max((duration / 60) * 60, 30), // Minimum 30px height
  };
};