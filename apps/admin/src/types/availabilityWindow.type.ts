import type { QueryObserverResult } from '@tanstack/react-query';

export interface AvailabilityWindow {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  slotMinutes: number;
  bufferMinutes: number;
}

export interface UseAvailabilityResult {
  data: AvailabilityWindow[] | undefined;
  isLoading: boolean;
  isError: boolean;
  refetch: () => Promise<QueryObserverResult<AvailabilityWindow[], Error>>;
}
