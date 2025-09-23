import React, { useState, useEffect } from 'react';
import { Appointment } from '../types';
import { MOCK_BOOKING_SERVICE } from '../services/mockBookingService';
import { useAuth } from '../hooks/UseAuth';

interface UpcomingAppointmentsProps {
  onBookNew: () => void;
}

const UpcomingAppointments: React.FC<UpcomingAppointmentsProps> = ({ onBookNew }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!currentUser) return;
      setLoading(true);
      const data = await MOCK_BOOKING_SERVICE.getUserAppointments(currentUser.id);
      const upcoming = data.filter(appt => appt.timestamp >= Date.now());
      setAppointments(upcoming);
      setLoading(false);
    };
    fetchAppointments();
  }, [currentUser]);

  if (loading) {
    return <div className="p-8 text-center text-slate-500">Loading your appointments...</div>;
  }
  
  const formatDate = (timestamp: number) => {
      const date = new Date(timestamp);
      return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  }

  const formatTime = (timestamp: number) => {
      const date = new Date(timestamp);
      return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  }

  return (
    <div>
        <div className="flex justify-between items-center mb-6">
            <div>
                <h2 className="text-2xl font-bold text-slate-800">Your Appointments</h2>
                <p className="text-slate-600">Here are your upcoming confidential sessions.</p>
            </div>
            <button
                onClick={onBookNew}
                className="px-4 py-2 bg-teal-500 text-white font-semibold rounded-full shadow-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-75 transition-all"
            >
                Book New
            </button>
        </div>

      {appointments.length > 0 ? (
        <div className="space-y-4">
          {appointments.map(appt => (
            <div key={appt.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
              <img src={appt.counsellorImageUrl} alt={appt.counsellorName} className="w-16 h-16 rounded-full object-cover" />
              <div className="flex-grow">
                <p className="font-bold text-slate-800">{appt.counsellorName}</p>
                <p className="text-sm text-slate-600">{formatDate(appt.timestamp)}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-teal-600">{formatTime(appt.timestamp)}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border-2 border-dashed border-slate-300 rounded-xl">
          <p className="text-slate-500">You have no upcoming appointments.</p>
        </div>
      )}
    </div>
  );
};

export default UpcomingAppointments;