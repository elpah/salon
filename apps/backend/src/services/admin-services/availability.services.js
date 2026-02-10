import { connectToDatabase } from "../../config/db.js";
import { randomUUID } from "crypto";

const createAvailabilityWindow = async (window) => {
  try {
    const db = await connectToDatabase();
    const availabilityCol = db.collection("availability");
    const { date, startTime, endTime, slotMinutes, bufferMinutes } = window;

    if (!date || !startTime || !endTime || !slotMinutes || slotMinutes <= 0) {
      throw new Error("Invalid input");
    }
    if (startTime >= endTime) {
      throw new Error("End time must be after start time");
    }
    if (bufferMinutes < 0) {
      throw new Error("Buffer cannot be negative");
    }

    const overlap = await availabilityCol.findOne({
      date,
      startTime: { $lt: endTime },
      endTime: { $gt: startTime },
    });

    if (overlap) {
      throw new Error(
        "This availability window overlaps with an existing one.",
      );
    }

    const result = await availabilityCol.insertOne({
      id: randomUUID(),
      date,
      startTime,
      endTime,
      slotMinutes,
      bufferMinutes,
      createdAt: new Date(),
    });

    return result.insertedId;
  } catch (error) {
    console.error("Error creating availability window:", error);
    throw error;
  }
};

const deleteAvailabilityById = async (id) => {
  try {
    const db = await connectToDatabase();
    const availabilityCol = db.collection("availability");
    const result = await availabilityCol.deleteOne({ id });
    if (result.deletedCount === 0) {
      return { success: false, message: "availability not found" };
    }
    return {
      success: true,
      message: "Availability deleted successfully",
    };
  } catch (err) {
    console.error("Error deleting availability:", err);
    return { success: false, message: err.message };
  }
};



export {
  createAvailabilityWindow,
  deleteAvailabilityById,
};
