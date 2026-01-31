import type { QueryObserverResult } from "@tanstack/react-query";

export interface BookedSlot {
  date: string;
  startTime: string;
  endTime: string;
  serviceId?: string;
  userId?: string;
};

export interface UseGetBookedSlotsResult {
  data: BookedSlot[] | undefined;
  isLoading: boolean;
  isError: boolean;
  refetch: () => Promise<QueryObserverResult<BookedSlot[], Error>>;
}
