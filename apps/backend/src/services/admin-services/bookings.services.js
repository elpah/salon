import { connectToDatabase } from "../../config/db.js";
import { randomUUID } from "crypto";

const createNewBooking = async (booking) => {
  try {
    if (
      !booking?.selectedService ||
      !booking?.selectedSlot ||
      !booking?.clientDetails
    ) {
      throw new Error("Invalid booking payload");
    }
    const db = await connectToDatabase();
    const bookingCol = db.collection("bookings");
    const bookedSlotCol = db.collection("booked-slots");

    const { date, startTime, endTime } = booking.selectedSlot;
    const existing = await bookedSlotCol.findOne({ date, startTime, endTime });
    if (existing) {
      throw new Error("This time slot is already booked");
    }
    const selectedSlot = randomUUID();
    const bookedSlot = {
      id: selectedSlot,
      serviceId: booking.selectedService,
      userId: booking.userId || null,
      date,
      startTime,
      endTime,
      createdAt: new Date(),
    };

    const bookedSlotResult = await bookedSlotCol.insertOne(bookedSlot);

    if (!bookedSlotResult.acknowledged) {
      throw new Error("Failed to reserve time slot");
    }
    const bookingDoc = {
      id: randomUUID(),
      serviceId: booking.selectedService,
      selectedSlot,
      clientDetails: booking.clientDetails,
      createdAt: new Date(),
    };
    const bookingResult = await bookingCol.insertOne(bookingDoc);
    if (!bookingResult.acknowledged) {
      await bookedSlotCol.deleteOne({ id: selectedSlot });
      throw new Error("Booking creation failed, slot reservation rolled back");
    }
    return {
      bookingId: bookingResult.insertedId,
      selectedSlot,
    };
  } catch (error) {
    throw new Error(error?.message || "Failed to create booking");
  }
};

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

export { createNewBooking, getAllBookings };
