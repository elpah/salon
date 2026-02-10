import { connectToDatabase } from "../../config/db.js";

const getAllBookings = async () => {
  try {
    const db = await connectToDatabase();
    const bookingsCol = db.collection("bookings");
    const bookedSlotCol = db.collection("booked-slots");
    const serviceCol = db.collection("services");

    const bookings = await bookingsCol.find().toArray();

    const enrichedBookings = await Promise.all(
      bookings.map(async (booking) => {
        const service = await serviceCol.findOne({ id: booking.serviceId });
        const bookedSlot = await bookedSlotCol.findOne({
          id: booking.selectedSlot,
        });

        return {
          id: booking.id,
          selectedService: service?.name || null,
          selectedDate: bookedSlot?.date || "",
          selectedSlot: bookedSlot
            ? {
                date: bookedSlot.date,
                startTime: bookedSlot.startTime,
                endTime: bookedSlot.endTime,
              }
            : null,
          clientDetails: booking.clientDetails,
          createdAt: booking.createdAt,
        };
      }),
    );

    return enrichedBookings;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error in getAllBookings:", error);
    }
    throw new Error("Failed to fetch bookings. Please try again later.");
  }
};

export { getAllBookings };
