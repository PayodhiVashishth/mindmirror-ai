import React, { useState, useEffect } from 'react';
import { Counsellor, TimeSlot } from '../types';
import { MOCK_BOOKING_SERVICE } from '../services/mockBookingService';

interface BookingCalendarProps {
  counsellor: Counsellor;
  onSelectTime: (timestamp: number) => void;
  onBack: () => void;
}

const BookingCalendar: React.FC<BookingCalendarProps> = ({ counsellor, onSelectTime, onBack }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(true);

  useEffect(() => {
    let isCancelled = false;

    const fetchSlots = async () => {
      setLoadingSlots(true);
      const slots = await MOCK_BOOKING_SERVICE.getAvailability(counsellor.id, selectedDate);
      if (!isCancelled) {
        setAvailableSlots(slots);
        setLoadingSlots(false);
      }
    };
    fetchSlots();

    return () => {
      isCancelled = true;
    };
  }, [selectedDate, counsellor.id]);

  const changeMonth = (amount: number) => {
    setCurrentDate(prev => {
        const newDate = new Date(prev);
        newDate.setDate(1); // Set to first of month to avoid day-of-month issues
        newDate.setMonth(newDate.getMonth() + amount);
        return newDate;
    });
  };

  const handleDayClick = (day: number) => {
    const newSelectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    if(newSelectedDate.getTime() >= new Date().setHours(0,0,0,0)) { // Prevent selecting past dates
      setSelectedDate(newSelectedDate);
    }
  };
  
  const handleSlotClick = (slot: TimeSlot) => {
      const dateTime = new Date(selectedDate);
      dateTime.setHours(slot.hour, slot.minute, 0, 0);
      onSelectTime(dateTime.getTime());
  };

  const isPastMonth = () => {
      const today = new Date();
      const firstOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const firstOfCalendarMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      return firstOfCalendarMonth <= firstOfCurrentMonth;
  }

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    today.setHours(0,0,0,0);

    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const isSelected = date.toDateString() === selectedDate.toDateString();
        const isToday = date.toDateString() === today.toDateString();
        const isPast = date < today;

        let classes = "p-2 rounded-full w-10 h-10 flex items-center justify-center transition-colors ";
        if(isPast) {
            classes += "text-slate-300 cursor-not-allowed";
        } else {
            classes += "cursor-pointer ";
            if (isSelected) {
                classes += "bg-teal-500 text-white";
            } else if (isToday) {
                classes += "bg-slate-200 text-slate-700";
            } else {
                classes += "hover:bg-slate-100";
            }
        }
        days.push(<div key={day} onClick={() => handleDayClick(day)} className={classes}>{day}</div>);
    }
    return <div className="grid grid-cols-7 gap-2 text-center">{days}</div>;
  };
  
  const formatTime = (hour: number, minute: number) => {
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const formattedHour = hour % 12 || 12;
      const formattedMinute = minute.toString().padStart(2, '0');
      return `${formattedHour}:${formattedMinute} ${ampm}`;
  }

  return (
    <div className="p-4 md:p-6">
        <button onClick={onBack} className="text-sm text-teal-600 hover:underline mb-4">&larr; Choose a different counsellor</button>
        <div className="text-center mb-4">
            <h2 className="text-xl font-bold text-slate-800">Select a time with {counsellor.name}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Calendar */}
            <div className="bg-white p-4 rounded-lg border border-slate-200">
                <div className="flex justify-between items-center mb-4">
                    <button onClick={() => changeMonth(-1)} disabled={isPastMonth()} className="disabled:text-slate-300 disabled:cursor-not-allowed">&larr;</button>
                    <h3 className="font-semibold">{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h3>
                    <button onClick={() => changeMonth(1)}>&rarr;</button>
                </div>
                <div className="grid grid-cols-7 text-center text-xs text-slate-500 mb-2">
                    <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>
                </div>
                {renderCalendar()}
            </div>
            
            {/* Time Slots */}
            <div className="p-4">
                <h3 className="font-semibold text-slate-700 mb-2">{selectedDate.toLocaleDateString('default', { weekday: 'long', month: 'long', day: 'numeric' })}</h3>
                {loadingSlots ? (
                    <div className="text-slate-500">Loading slots...</div>
                ) : availableSlots.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {availableSlots.map((slot, i) => (
                        <button key={i} onClick={() => handleSlotClick(slot)} className="p-2 border border-teal-500 text-teal-600 rounded-md hover:bg-teal-500 hover:text-white transition-colors">
                            {formatTime(slot.hour, slot.minute)}
                        </button>
                    ))}
                    </div>
                ) : (
                    <p className="text-slate-500">No available slots for this day.</p>
                )}
            </div>
        </div>
    </div>
  );
};

export default BookingCalendar;