import React, { useState } from 'react';
import { Event, ViewMode } from './types';
import { useEvents } from './hooks/useEvents';
import { CalendarHeader } from './components/Calendar/CalendarHeader';
import { DayView } from './components/Calendar/DayView';
import { WeekView } from './components/Calendar/WeekView';
import { MonthView } from './components/Calendar/MonthView';
import { EventModal } from './components/Event/EventModal';
import { addDays, addWeeks, addMonths } from './utils/dateUtils';

function App() {
  const { events, addEvent, updateEvent, deleteEvent } = useEvents();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>('week');
  const [selectedEvent, setSelectedEvent] = useState<Event | undefined>();
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [modalInitialDate, setModalInitialDate] = useState<Date | undefined>();
  const [modalInitialHour, setModalInitialHour] = useState<number>(9);

  const handlePrevious = () => {
    switch (viewMode) {
      case 'day':
        setCurrentDate(prev => addDays(prev, -1));
        break;
      case 'week':
        setCurrentDate(prev => addWeeks(prev, -1));
        break;
      case 'month':
        setCurrentDate(prev => addMonths(prev, -1));
        break;
    }
  };

  const handleNext = () => {
    switch (viewMode) {
      case 'day':
        setCurrentDate(prev => addDays(prev, 1));
        break;
      case 'week':
        setCurrentDate(prev => addWeeks(prev, 1));
        break;
      case 'month':
        setCurrentDate(prev => addMonths(prev, 1));
        break;
    }
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleCreateEvent = () => {
    setSelectedEvent(undefined);
    setModalInitialDate(currentDate);
    setModalInitialHour(9);
    setIsEventModalOpen(true);
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setModalInitialDate(undefined);
    setIsEventModalOpen(true);
  };

  const handleTimeSlotClick = (date: Date, hour: number) => {
    setSelectedEvent(undefined);
    setModalInitialDate(date);
    setModalInitialHour(hour);
    setIsEventModalOpen(true);
  };

  const handleDayClick = (date: Date) => {
    if (viewMode === 'month') {
      setCurrentDate(date);
      setViewMode('day');
    }
  };

  const handleEventSave = (eventData: Omit<Event, 'id'>) => {
    if (selectedEvent) {
      updateEvent(selectedEvent.id, eventData);
    } else {
      addEvent(eventData);
    }
  };

  const handleEventDelete = (id: string) => {
    deleteEvent(id);
  };

  const renderCalendarView = () => {
    const commonProps = {
      events,
      onEventClick: handleEventClick,
    };

    switch (viewMode) {
      case 'day':
        return (
          <DayView
            date={currentDate}
            onTimeSlotClick={handleTimeSlotClick}
            {...commonProps}
          />
        );
      case 'week':
        return (
          <WeekView
            date={currentDate}
            onTimeSlotClick={handleTimeSlotClick}
            {...commonProps}
          />
        );
      case 'month':
        return (
          <MonthView
            date={currentDate}
            onDayClick={handleDayClick}
            {...commonProps}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <CalendarHeader
        currentDate={currentDate}
        viewMode={viewMode}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onToday={handleToday}
        onViewModeChange={setViewMode}
        onCreateEvent={handleCreateEvent}
      />
      
      <div className="flex-1 overflow-auto">
        {renderCalendarView()}
      </div>

      <EventModal
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
        event={selectedEvent}
        onSave={handleEventSave}
        onDelete={handleEventDelete}
        initialDate={modalInitialDate}
        initialHour={modalInitialHour}
      />
    </div>
  );
}

export default App;