import { connectToDatabase } from "../../config/db.js";
import { randomUUID } from "crypto";
import { deleteCloudinaryImage } from "./cloudinary.services.js";

const addNewProduct = async (product) => {
  try {
    const newProduct = {
      ...product,
      id: randomUUID(),
      createdAt: new Date(),
    };

    const db = await connectToDatabase();
    const productCollection = db.collection("products");

    const result = await productCollection.insertOne(newProduct);
    if (!result.acknowledged) {
      throw new Error("Failed to insert new product");
    }

    return true;
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error in addNewProduct:", err.message);
    }
    return null;
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


const deleteProductById = async (id) => {
  try {
    const db = await connectToDatabase();

    const productCol = db.collection("products");
    const deletedCol = db.collection("deleted-products");

    const product = await productCol.findOne(
      { id },
      { projection: { _id: 0 } },
    );

    if (!product) {
      return { success: false, message: "Product not found" };
    }

    await deletedCol.insertOne(product);
    await productCol.deleteOne({ id });

    return { success: true, message: "Product deleted successfully." };
  } catch (err) {
    console.error("Error deleting product:", err);
    return { success: false, message: err.message };
  }
};

const permanentlyDeleteProductById = async (id) => {
  try {
    const db = await connectToDatabase();
    const deletedCol = db.collection("deleted-products");

    const product = await deletedCol.findOne({ id });
    if (!product) {
      return {
        success: false,
        message: "Service not found or already deleted",
      };
    }
    await deleteCloudinaryImage(product.public_id);

    const result = await deletedCol.deleteOne({ id });
    if (result.deletedCount === 0) {
      return { success: false, message: "Product not found" };
    }
    return {
      success: true,
      message: "Product permanently deleted successfully",
    };
  } catch (err) {
    console.error("Error deleting product:", err);
    return { success: false, message: err.message };
  }
};

const restoreDeletedProductById = async (id) => {
  try {
    const db = await connectToDatabase();
    const deletedCol = db.collection("deleted-products");
    const productCol = db.collection("products");
    const product = await deletedCol.findOne(
      { id },
      { projection: { _id: 0 } },
    );
    if (!product) {
      return { success: false, message: "Product not found" };
    }
    await productCol.insertOne(product);
    await deletedCol.deleteOne({ id });
    return { success: true, message: "Product restored successfully." };
  } catch (err) {
    console.error("Error restoring product:", err);
    return { success: false, message: err.message };
  }
};

export {
  addNewProduct,
  deleteProductById,
  permanentlyDeleteProductById,
  restoreDeletedProductById,
};
