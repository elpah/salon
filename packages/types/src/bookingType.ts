export type SelectedSlot = {
  date: string;
  startTime: string;
  endTime: string;
};

export interface AvailableTime {
  startTime: string;
  endTime: string;
  duration: number;
}

export interface AvailableSlotByDate {
  date: string;
  times: AvailableTime[];
}

export type BookingType = {
  id?: string;
  selectedService: string | null;
  selectedDate: string;
  selectedSlot: SelectedSlot | null;
  clientDetails: {
    name: string;
    email: string;
    phone: string;
  };
};
