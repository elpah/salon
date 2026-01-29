import { Router } from "express";
import { getAllProducts,getProductById } from "../services/admin-services/product.services.js";

const adminRoute = Router();

adminRoute.get("/", async (req, res) => {
  res.status(200).json({ message: "arrived" });
});
export default adminRoute;


adminRoute.get("/products", async (req, res) => {
  try {
    const products = await getAllProducts();
    res.status(200).json(products);
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

adminRoute.get("/productById", async (req, res) => {
  let { productId } = req.query;
  try {
    const product  = await getProductById(productId);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});


