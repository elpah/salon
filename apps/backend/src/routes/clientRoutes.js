import { Router } from "express";

import {
  createNewBooking,
} from "../services/client-services/bookings.services.js";


const clientRoute = Router();

clientRoute.post("/create-new-booking", async (req, res) => {
  try {
    const result = await createNewBooking(req.body);
    return res.status(201).json({
      message: "Booking created successfully",
      bookingId: result.bookingId,
      bookedSlotId: result.bookedSlotId,
    });
  } catch (err) {
    console.error("Error in /create-new-booking:", err.message);

    return res.status(400).json({
      error: err.message || "Something went wrong",
    });
  }
});

export default clientRoute;
