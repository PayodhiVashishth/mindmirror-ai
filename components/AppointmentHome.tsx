import React, { useState } from 'react';
import { Counsellor } from '../types';
import UpcomingAppointments from './UpcomingAppointments';
import CounsellorList from './CounsellorList';
import BookingCalendar from './BookingCalendar';
import BookingConfirmation from './BookingConfirmation';

type View = 'list' | 'select_counsellor' | 'calendar' | 'confirmation' | 'success';

const AppointmentHome: React.FC = () => {
  const [view, setView] = useState<View>('list');
  const [selectedCounsellor, setSelectedCounsellor] = useState<Counsellor | null>(null);
  const [selectedTimestamp, setSelectedTimestamp] = useState<number | null>(null);
  
  // A key to force re-fetching of appointments after a new one is booked
  const [bookingVersion, setBookingVersion] = useState(0);

  const handleSelectCounsellor = (counsellor: Counsellor) => {
    setSelectedCounsellor(counsellor);
    setView('calendar');
  };
  
  const handleSelectTime = (timestamp: number) => {
    setSelectedTimestamp(timestamp);
    setView('confirmation');
  };
  
  const handleConfirmBooking = () => {
      setView('success');
      setBookingVersion(v => v + 1); // Increment version to trigger re-fetch
  };

  const handleBackToCounsellors = () => {
    setSelectedCounsellor(null);
    setSelectedTimestamp(null);
    setView('select_counsellor');
  };
  
  const handleBackToCalendar = () => {
      setSelectedTimestamp(null);
      setView('calendar');
  }

  const handleStartNewBooking = () => {
      setSelectedCounsellor(null);
      setSelectedTimestamp(null);
      setView('select_counsellor');
  }

  const handleViewList = () => {
      setView('list');
  }
  
  const renderContent = () => {
    switch(view) {
        case 'list':
             return <UpcomingAppointments key={bookingVersion} onBookNew={handleStartNewBooking} />;
        
        case 'select_counsellor':
            return <CounsellorList onSelectCounsellor={handleSelectCounsellor} />;

        case 'calendar':
            if (selectedCounsellor) {
                return (
                    <BookingCalendar 
                      counsellor={selectedCounsellor} 
                      onSelectTime={handleSelectTime}
                      onBack={handleBackToCounsellors} 
                    />
                );
            }
            // Fallback if state is inconsistent
            handleViewList();
            return null;

        case 'confirmation':
            if (selectedCounsellor && selectedTimestamp) {
                return (
                    <BookingConfirmation 
                        counsellor={selectedCounsellor}
                        timestamp={selectedTimestamp}
                        onConfirm={handleConfirmBooking}
                        onBack={handleBackToCalendar}
                    />
                )
            }
             // Fallback if state is inconsistent
            handleViewList();
            return null;

        case 'success':
            return (
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Appointment Confirmed!</h2>
                    <p className="text-slate-600 mb-6">Your appointment has been successfully booked.</p>
                    <button
                        onClick={handleViewList}
                        className="px-6 py-2 bg-teal-500 text-white font-semibold rounded-full shadow-md hover:bg-teal-600"
                    >
                        View My Appointments
                    </button>
                </div>
            )
        
        default:
             return <UpcomingAppointments key={bookingVersion} onBookNew={handleStartNewBooking} />;
    }
  };

  return (
    <div className="p-4 md:p-6 bg-slate-50 h-full overflow-y-auto">
      {renderContent()}
    </div>
  );
};

export default AppointmentHome;