import { useState, useCallback } from 'react';
import { Event } from '../types';
import { generateId, defaultCategories } from '../utils/eventUtils';

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Team Meeting',
      description: 'Weekly team sync and project updates',
      startTime: new Date(2025, 0, 20, 9, 0),
      endTime: new Date(2025, 0, 20, 10, 0),
      category: defaultCategories[0],
      color: defaultCategories[0].color,
    },
    {
      id: '2',
      title: 'Lunch with Sarah',
      description: 'Catch up over lunch at the new restaurant',
      startTime: new Date(2025, 0, 20, 12, 30),
      endTime: new Date(2025, 0, 20, 14, 0),
      category: defaultCategories[3],
      color: defaultCategories[3].color,
    },
    {
      id: '3',
      title: 'Gym Workout',
      description: 'Leg day and cardio session',
      startTime: new Date(2025, 0, 21, 18, 0),
      endTime: new Date(2025, 0, 21, 19, 30),
      category: defaultCategories[2],
      color: defaultCategories[2].color,
    },
  ]);

  const addEvent = useCallback((event: Omit<Event, 'id'>) => {
    const newEvent: Event = {
      ...event,
      id: generateId(),
    };
    setEvents(prev => [...prev, newEvent]);
    return newEvent;
  }, []);

  const updateEvent = useCallback((id: string, updates: Partial<Event>) => {
    setEvents(prev =>
      prev.map(event =>
        event.id === id ? { ...event, ...updates } : event
      )
    );
  }, []);

  const deleteEvent = useCallback((id: string) => {
    setEvents(prev => prev.filter(event => event.id !== id));
  }, []);

  return {
    events,
    addEvent,
    updateEvent,
    deleteEvent,
  };
};