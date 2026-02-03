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
    const bookedSlotId = randomUUID();
    const bookedSlot = {
      id: bookedSlotId,
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
      bookedSlotId,
      clientDetails: booking.clientDetails,
      createdAt: new Date(),
    };
    const bookingResult = await bookingCol.insertOne(bookingDoc);
    if (!bookingResult.acknowledged) {
      await bookedSlotCol.deleteOne({ id: bookedSlotId });
      throw new Error("Booking creation failed, slot reservation rolled back");
    }
    return {
      bookingId: bookingResult.insertedId,
      bookedSlotId,
    };
  } catch (error) {
    throw new Error(error?.message || "Failed to create booking");
  }
};

export { createNewBooking };
