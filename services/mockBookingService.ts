import { Appointment, Counsellor, TimeSlot } from '../types';
import { COUNSELLORS } from '../constants';

const DB_KEY = 'mindmirror-appointments-db';

const getDb = async (): Promise<Record<string, Appointment>> => {
  try {
    const dbString = localStorage.getItem(DB_KEY);
    return dbString ? JSON.parse(dbString) : {};
  } catch (e) {
    return {};
  }
};

const saveDb = async (db: Record<string, Appointment>): Promise<void> => {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
};

export const MOCK_BOOKING_SERVICE = {
  getCounsellors: async (): Promise<Counsellor[]> => {
    // In a real app, this would be an API call
    return Promise.resolve(COUNSELLORS);
  },

  getAvailability: async (counsellorId: string, date: Date): Promise<TimeSlot[]> => {
    const counsellor = COUNSELLORS.find(c => c.id === counsellorId);
    if (!counsellor) {
        return Promise.resolve([]);
    }
    
    const dayOfWeek = date.getDay();
    const allSlotsForDay = counsellor.availability[dayOfWeek] || [];

    const db = await getDb();
    const bookedAppointments = Object.values(db);

    const availableSlots = allSlotsForDay.filter(slot => {
        const slotDateTime = new Date(date);
        slotDateTime.setHours(slot.hour, slot.minute, 0, 0);
        const slotTimestamp = slotDateTime.getTime();

        // Check if a slot is already booked for this counsellor at this specific time
        const isBooked = bookedAppointments.some(appt => 
            appt.counsellorId === counsellorId && appt.timestamp === slotTimestamp
        );

        // Check if the slot is in the past
        const isPast = slotTimestamp < Date.now();

        return !isBooked && !isPast;
    });

    return Promise.resolve(availableSlots);
  },

  createAppointment: async (userId: string, counsellor: Counsellor, timestamp: number): Promise<Appointment> => {
    const db = await getDb();
    const newAppointment: Appointment = {
      id: `appt-${Date.now()}`,
      userId,
      counsellorId: counsellor.id,
      counsellorName: counsellor.name,
      counsellorImageUrl: counsellor.imageUrl,
      timestamp,
    };

    // Check for conflicts before saving
    const conflict = Object.values(db).some(appt => 
        appt.counsellorId === newAppointment.counsellorId && appt.timestamp === newAppointment.timestamp
    );

    if (conflict) {
        throw new Error("This time slot has just been booked. Please select another time.");
    }
    
    db[newAppointment.id] = newAppointment;
    await saveDb(db);
    return newAppointment;
  },

  getUserAppointments: async (userId: string): Promise<Appointment[]> => {
    const db = await getDb();
    const userAppointments = Object.values(db).filter(appt => appt.userId === userId);
    // Sort by soonest first
    return userAppointments.sort((a, b) => a.timestamp - b.timestamp);
  },
};