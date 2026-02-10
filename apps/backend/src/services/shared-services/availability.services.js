import { connectToDatabase } from "../../config/db.js";

const getAllAvailabilities = async () => {
  try {
    const db = await connectToDatabase();
    const availabilityCol = db.collection("availability");
    const availabilities = await availabilityCol.find().toArray();
    return availabilities;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error in getAllAvailabilities:", error);
    }
    throw new Error("Failed to fetch availabilities. Please try again later.");
  }
};

const getBookedSlots = async () => {
  try {
    const db = await connectToDatabase();
    const bookedSlots = db.collection("booked-slots");
    const bookings = await bookedSlots.find().toArray();
    return bookings;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error in getBookedSlots:", error);
    }
    throw new Error("Failed to fetch bookedSlots. Please try again later.");
  }
};

export { getAllAvailabilities, getBookedSlots };
