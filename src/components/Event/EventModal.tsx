import React, { useState, useEffect } from 'react';
import { Event, EventCategory } from '../../types';
import { Modal } from '../UI/Modal';
import { Button } from '../UI/Button';
import { defaultCategories } from '../../utils/eventUtils';
import { Save, Trash2 } from 'lucide-react';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event?: Event;
  onSave: (event: Omit<Event, 'id'>) => void;
  onDelete?: (id: string) => void;
  initialDate?: Date;
  initialHour?: number;
}

export const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  onClose,
  event,
  onSave,
  onDelete,
  initialDate,
  initialHour = 9,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [category, setCategory] = useState<EventCategory>(defaultCategories[0]);
  const [isAllDay, setIsAllDay] = useState(false);

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setDescription(event.description || '');
      
      const start = new Date(event.startTime);
      const end = new Date(event.endTime);
      
      setStartDate(start.toISOString().split('T')[0]);
      setStartTime(start.toTimeString().slice(0, 5));
      setEndDate(end.toISOString().split('T')[0]);
      setEndTime(end.toTimeString().slice(0, 5));
      setCategory(event.category);
      setIsAllDay(event.isAllDay || false);
    } else if (initialDate) {
      const date = initialDate.toISOString().split('T')[0];
      const startHour = initialHour.toString().padStart(2, '0') + ':00';
      const endHour = (initialHour + 1).toString().padStart(2, '0') + ':00';
      
      setStartDate(date);
      setEndDate(date);
      setStartTime(startHour);
      setEndTime(endHour);
      setTitle('');
      setDescription('');
      setCategory(defaultCategories[0]);
      setIsAllDay(false);
    }
  }, [event, initialDate, initialHour]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;

    const startDateTime = new Date(`${startDate}T${startTime}`);
    const endDateTime = new Date(`${endDate}T${endTime}`);

    const eventData: Omit<Event, 'id'> = {
      title: title.trim(),
      description: description.trim(),
      startTime: startDateTime,
      endTime: endDateTime,
      category,
      color: category.color,
      isAllDay,
    };

    onSave(eventData);
    onClose();
    resetForm();
  };

  const handleDelete = () => {
    if (event && onDelete) {
      onDelete(event.id);
      onClose();
      resetForm();
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setStartDate('');
    setStartTime('');
    setEndDate('');
    setEndTime('');
    setCategory(defaultCategories[0]);
    setIsAllDay(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={event ? 'Edit Event' : 'Create New Event'}
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Event Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="Enter event title"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
            placeholder="Enter event description"
          />
        </div>

        {/* All Day Toggle */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="allDay"
            checked={isAllDay}
            onChange={(e) => setIsAllDay(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="allDay" className="ml-2 text-sm text-gray-700">
            All day event
          </label>
        </div>

        {/* Date and Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Start */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start
            </label>
            <div className="space-y-2">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
              />
              {!isAllDay && (
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                />
              )}
            </div>
          </div>

          {/* End */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End
            </label>
            <div className="space-y-2">
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
              />
              {!isAllDay && (
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                />
              )}
            </div>
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {defaultCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat)}
                className={`
                  p-3 rounded-lg border-2 transition-all duration-200 flex items-center space-x-2
                  ${category.id === cat.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                  }
                `}
              >
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: cat.color }}
                />
                <span className="text-sm font-medium">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between pt-4">
          <div>
            {event && onDelete && (
              <Button
                type="button"
                variant="ghost"
                onClick={handleDelete}
                icon={Trash2}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                Delete Event
              </Button>
            )}
          </div>
          
          <div className="flex space-x-3">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" icon={Save}>
              {event ? 'Update Event' : 'Create Event'}
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};