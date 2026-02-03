import { Router } from "express";
import {
  getAllProducts,
  getProductById,
  deleteProductById,
  permanentlyDeleteProductById,
  restoreDeletedProductById,
} from "../services/admin-services/product.services.js";

import {
  getAllServices,
  getServiceById,
  deleteServiceById,
  permanentlyDeleteServiceById,
  restoreDeletedServiceById,
  addNewService,
} from "../services/admin-services/service.services.js";
import {
  createAvailabilityWindow,
  getAllAvailabilities,
  deleteAvailabilityById,
  getBookedSlots,
} from "../services/admin-services/availability.services.js";

import { createNewBooking } from "../services/admin-services/bookings.services.js";

const adminRoute = Router();

adminRoute.get("/", async (_req, res) => {
  res.status(200).json({ message: "arrived" });
});

adminRoute.get("/products", async (_req, res) => {
  try {
    const products = await getAllProducts();
    res.status(200).json(products);
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

adminRoute.get("/services", async (_req, res) => {
  try {
    const services = await getAllServices();
    res.status(200).json(services);
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

adminRoute.get("/services/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const service = await getServiceById(id);
    res.status(200).json(service);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

adminRoute.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await getProductById(id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

adminRoute.delete("/delete-product/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteProductById(id);
    if (result.success) {
      res.status(200).json({ message: "Product deleted successfully" });
    } else {
      res.status(400).json({ message: result.message });
    }
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error deleting product:", err);
    }
    res.status(500).send("Internal Server Error");
  }
});

adminRoute.delete("/delete-service/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteServiceById(id);
    if (result.success) {
      res.status(200).json({ message: "Service deleted successfully" });
    } else {
      res.status(400).json({ message: result.message });
    }
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error deleting Service:", err);
    }
    res.status(500).send("Internal Server Error");
  }
});

adminRoute.delete("/delete-product-forever/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await permanentlyDeleteProductById(id);
    if (result.success) {
      res.status(200).json({ message: "Product deleted successfully" });
    } else {
      res.status(400).json({ message: result.message });
    }
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error deleting product:", err);
    }
    res.status(500).send("Internal Server Error");
  }
});

adminRoute.delete("/delete-service-forever/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await permanentlyDeleteServiceById(id);
    if (result.success) {
      res.status(200).json({ message: "Service deleted successfully" });
    } else {
      res.status(400).json({ message: result.message });
    }
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error deleting Service:", err);
    }
    res.status(500).send("Internal Server Error");
  }
});

adminRoute.post("/restore-product/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await restoreDeletedProductById(id);

    if (!result.success) {
      return res.status(404).json({
        message: result.message || "Product not found",
      });
    }

    return res.status(200).json({
      message: "Product restored successfully",
    });
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error restoring product:", err);
    }

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

adminRoute.post("/restore-service/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await restoreDeletedServiceById(id);

    if (!result.success) {
      return res.status(404).json({
        message: result.message || "Service not found",
      });
    }

    return res.status(200).json({
      message: "Service restored successfully",
    });
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error restoring Service:", err);
    }

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

adminRoute.post("/create-new-availability", async (req, res) => {
  try {
    const insertedId = await createAvailabilityWindow(req.body);
    return res.status(201).json({
      message: "Availability window created successfully",
      id: insertedId,
    });
  } catch (err) {
    console.error("Error in /create-new-availability:", err.message);

    return res.status(400).json({
      error: err.message || "Something went wrong",
    });
  }
});

adminRoute.post("/create-new-booking", async (req, res) => {
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

adminRoute.post("/create-new-service", async (req, res) => {
  try {
    const insertedId = await addNewService(req.body);
    console.log();
    return res.status(201).json({
      message: "Service created successfully",
      id: insertedId,
    });
  } catch (err) {
    console.error("Error in /create-new-service:", err.message);

    return res.status(400).json({
      error: err.message || "Something went wrong",
    });
  }
});

adminRoute.get("/availabilities", async (_req, res) => {
  try {
    const availabilities = await getAllAvailabilities();
    res.status(200).json(availabilities);
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

adminRoute.delete("/delete-availability/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteAvailabilityById(id);
    if (result.success) {
      res.status(200).json({ message: "Availability deleted successfully" });
    } else {
      res.status(400).json({ message: result.message });
    }
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error deleting availability:", err);
    }
    res.status(500).send("Internal Server Error");
  }
});

adminRoute.get("/booked-slots", async (_req, res) => {
  try {
    const bookedSlots = await getBookedSlots();
    res.status(200).json(bookedSlots);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

export default adminRoute;
