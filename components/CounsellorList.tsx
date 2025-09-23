import React, { useState, useEffect } from 'react';
import { Counsellor } from '../types';
import { MOCK_BOOKING_SERVICE } from '../services/mockBookingService';

interface CounsellorListProps {
  onSelectCounsellor: (counsellor: Counsellor) => void;
}

const CounsellorList: React.FC<CounsellorListProps> = ({ onSelectCounsellor }) => {
  const [counsellors, setCounsellors] = useState<Counsellor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounsellors = async () => {
      setLoading(true);
      const data = await MOCK_BOOKING_SERVICE.getCounsellors();
      setCounsellors(data);
      setLoading(false);
    };
    fetchCounsellors();
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-slate-500">Loading counsellors...</div>;
  }

  return (
    <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Book a Session</h2>
        <p className="text-slate-600 mb-6">Choose a counsellor to see their availability.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {counsellors.map(counsellor => (
            <button
                key={counsellor.id}
                onClick={() => onSelectCounsellor(counsellor)}
                className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow text-left border border-slate-200 flex flex-col items-center text-center"
            >
                <img 
                    src={counsellor.imageUrl} 
                    alt={counsellor.name} 
                    className="w-24 h-24 rounded-full mb-4 object-cover border-2 border-slate-100"
                />
                <h3 className="font-semibold text-slate-800">{counsellor.name}</h3>
                <p className="text-sm text-slate-500 mt-1">{counsellor.specialties.join(', ')}</p>
                <span className="mt-4 text-sm font-medium text-teal-600 bg-teal-50 px-3 py-1 rounded-full">
                    View Availability
                </span>
            </button>
            ))}
      </div>
    </div>
  );
};

export default CounsellorList;