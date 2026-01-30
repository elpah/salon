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
} from "../services/admin-services/service.services.js";

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
    console.log("success");
    if (result.success) {
      console.log("success");
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

adminRoute.delete("/delete-forever/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await permanentlyDeleteProductById(id);
    if (result.success) {
      console.log("success");
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


export default adminRoute;
