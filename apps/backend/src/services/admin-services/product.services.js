// import client from "../../config/client.js";

import { connectToDatabase } from "../../config/db.js";
import { randomUUID } from "crypto";

// product: name, category, price, stock quantity, image, description
const addNewProduct = async (product) => {
  try {
    const newProduct = {
      carId: randomUUID(),
      createdAt: new Date(),
      ...product,
    };

    const db = await connectToDatabase();
    const productCollection = db.collection("products");

    const result = await productCollection.insertOne(newProduct);
    if (!result.acknowledged) {
      throw new Error("Failed to insert new car");
    }

    return newProduct.productId;
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error in addNewCar:", err.message);
    }
    return null;
  }
};

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

// get with filter
// const getAllProducts = async ({ category } = {}) => {
//   try {
//     const db = await connectToDatabase();
//     const productCol = db.collection("products");

//     const query = category ? { category } : {};
//     const products = await productCol.find(query).toArray();

//     return { products };
//   } catch (error) {
//     if (process.env.NODE_ENV !== "production") {
//       console.error("Error in getAllProducts:", error);
//     }
//     throw new Error("Failed to fetch products. Please try again later.");
//   }
// };

const getProductById = async (productId) => {
  try {
    const db = await connectToDatabase();
    const productCol = db.collection("products");

    const product = await productCol.findOne(
      { _id: new ObjectId(productId) },
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

export { addNewProduct, getAllProducts, getProductById };
