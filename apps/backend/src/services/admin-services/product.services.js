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

    const result = await deletedCol.findOneAndDelete({ id });

    if (!result.value) {
      return { success: false, message: "Product not found" };
    }

    return {
      success: true,
      message: "Product permanently deleted successfully",
    };
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error permanently deleting product:", err);
    }
    return {
      success: false,
      message: "Failed to permanently delete product",
    };
  }
};

export const restoreDeletedProductByID = async (id) => {
  try {
    const db = await connectToDatabase();
    const productCol = db.collection("products");
    const deletedCol = db.collection("deleted-products");
    const result = await deletedCol.findOneAndDelete({ id });

    if (!result.value) {
      return { success: false, message: "Product not found" };
    }
    await productCol.insertOne(result.value);
    return {
      success: true,
      message: "Product restored successfully",
    };
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error restoring product:", err);
    }
    return {
      success: false,
      message: "Failed to restore product",
    };
  }
};

export {
  addNewProduct,
  getAllProducts,
  getProductById,
  deleteProductById,
  permanentlyDeleteProductById,
  restoreDeletedProductByID
};
