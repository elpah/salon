import { Router } from "express";
import {
  getAllProducts,
  getProductById,
} from "../services/admin-services/product.services.js";

import {
  getAllServices,
  getServiceById,
} from "../services/admin-services/service.services.js";

const adminRoute = Router();

adminRoute.get("/", async (_req, res) => {
  res.status(200).json({ message: "arrived" });
});
export default adminRoute;

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
