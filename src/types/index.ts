export interface Event {
  id: string;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  category: EventCategory;
  color: string;
  isAllDay?: boolean;
}

export interface EventCategory {
  id: string;
  name: string;
  color: string;
}

export type ViewMode = 'day' | 'week' | 'month';

export interface TimeSlot {
  time: string;
  hour: number;
}