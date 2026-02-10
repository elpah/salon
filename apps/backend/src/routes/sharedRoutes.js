import { Router } from "express";

import {
  getAllProducts,
  getProductById,
} from "../services/shared-services/product.services.js";

import {
  getAllServices,
  getServiceById,
} from "../services/shared-services/service.services.js";

import { getCategories } from "../services/shared-services/categories.services.js";

import {
  getBookedSlots,
  getAllAvailabilities,
} from "../services/shared-services/availability.services.js";

const sharedRoute = Router();

sharedRoute.get("/products", async (_req, res) => {
  try {
    const products = await getAllProducts();
    res.status(200).json(products);
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

sharedRoute.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await getProductById(id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

sharedRoute.get("/services", async (_req, res) => {
  try {
    const services = await getAllServices();
    res.status(200).json(services);
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

sharedRoute.get("/services/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const service = await getServiceById(id);
    res.status(200).json(service);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

sharedRoute.get("/categories", async (_req, res) => {
  try {
    const categories = await getCategories();
    res.status(200).json(categories);
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

sharedRoute.get("/availabilities", async (_req, res) => {
  try {
    const availabilities = await getAllAvailabilities();
    res.status(200).json(availabilities);
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

sharedRoute.get("/booked-slots", async (_req, res) => {
  try {
    const bookedSlots = await getBookedSlots();
    res.status(200).json(bookedSlots);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

export default sharedRoute;
