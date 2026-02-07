import type { QueryObserverResult } from "@tanstack/react-query";

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

export interface GetBookingResult {
  data: BookingType[] | undefined;
  isLoading: boolean;
  isError: boolean;
  refetch: () => Promise<QueryObserverResult<BookingType[], Error>>;
}
