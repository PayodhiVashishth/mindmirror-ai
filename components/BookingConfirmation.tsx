import React, { useState } from 'react';
import { Counsellor } from '../types';
import { MOCK_BOOKING_SERVICE } from '../services/mockBookingService';
import { useAuth } from '../hooks/useAuth';

interface BookingConfirmationProps {
  counsellor: Counsellor;
  timestamp: number;
  onConfirm: () => void;
  onBack: () => void;
}

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({ counsellor, timestamp, onConfirm, onBack }) => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleConfirm = async () => {
    if (!currentUser) {
      setError("You must be logged in to book an appointment.");
      return;
    }
    setLoading(true);
    setError('');
    try {
      await MOCK_BOOKING_SERVICE.createAppointment(currentUser.id, counsellor, timestamp);
      onConfirm();
    } catch (e: any) {
      setError(e.message || "An unexpected error occurred.");
      setLoading(false);
    }
  };

  const appointmentDate = new Date(timestamp);
  const formattedDate = appointmentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const formattedTime = appointmentDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 bg-slate-50 text-center">
      <button onClick={onBack} className="text-sm text-teal-600 hover:underline absolute top-6 left-6">&larr; Change time</button>
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Confirm Your Appointment</h2>
      <p className="max-w-md text-slate-600 mb-8">
        Please review the details below before confirming your confidential session.
      </p>

      <div className="w-full max-w-md p-6 bg-white rounded-xl border border-slate-200 shadow-sm text-left space-y-4">
        <div className="flex items-center gap-4">
            <img src={counsellor.imageUrl} alt={counsellor.name} className="w-16 h-16 rounded-full object-cover" />
            <div>
                <p className="text-sm text-slate-500">Counsellor</p>
                <p className="font-semibold text-slate-800">{counsellor.name}</p>
            </div>
        </div>
        <div>
            <p className="text-sm text-slate-500">Date</p>
            <p className="font-semibold text-slate-800">{formattedDate}</p>
        </div>
        <div>
            <p className="text-sm text-slate-500">Time</p>
            <p className="font-semibold text-slate-800">{formattedTime}</p>
        </div>
      </div>
      
      {error && <p className="mt-4 text-sm text-red-600 bg-red-100 p-2 rounded-md">{error}</p>}

      <button
        onClick={handleConfirm}
        disabled={loading}
        className="mt-8 px-8 py-3 bg-teal-500 text-white font-semibold rounded-full shadow-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-75 transition-all disabled:bg-slate-300"
      >
        {loading ? 'Confirming...' : 'Confirm Booking'}
      </button>
    </div>
  );
};

export default BookingConfirmation;