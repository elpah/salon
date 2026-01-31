import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { BookedSlot, UseGetBookedSlotsResult } from "@salon/types";

const fetchBookedSlots = async (apiUrl: string): Promise<BookedSlot[]> => {
  const res = await axios.get<BookedSlot[]>(`${apiUrl}/booked-slots`);
  return res.data;
};
export const useGetBookedSlots = (apiUrl: string): UseGetBookedSlotsResult => {
  return useQuery<BookedSlot[], Error>({
    queryKey: ["bookedSlots"],
    queryFn: () => fetchBookedSlots(apiUrl),
  });
};

