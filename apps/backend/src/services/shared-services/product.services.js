import { connectToDatabase } from "../../config/db.js";

const getAllProducts = async () => {
  try {
    const db = await connectToDatabase();
    const productCol = db.collection("products");

    const products = await productCol.find().toArray();

    return products;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error in getAllProducts:", error);
    }
    throw new Error("Failed to fetch products. Please try again later.");
  }
};

const getProductById = async (id) => {
  try {
    const db = await connectToDatabase();
    const productCol = db.collection("products");

    const product = await productCol.findOne(
      { id },
      { projection: { _id: 0 } },
    );

    if (!product) {
      throw new Error("Product not found");
    }

    return product;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error in getProductById:", error);
    }
    throw new Error("Failed to fetch product. Please try again later.");
  }
};

export { getAllProducts, getProductById };
