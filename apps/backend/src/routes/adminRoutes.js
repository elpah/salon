import { Router } from "express";

const adminRoute = Router();

adminRoute.get("/", async (req, res) => {
  try {
    return res.status(200).json({ message: "Arrived" });
  } catch (err) {
    // if (process.env.NODE_ENV !== "production") {
    //   console.error("Error in /get-car-by-id:", err);
    // }
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default adminRoute;