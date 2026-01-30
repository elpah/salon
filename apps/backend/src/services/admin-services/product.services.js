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
  const client = await connectToDatabase();
  const session = client.startSession();

  try {
    const db = client.db();
    const productCol = db.collection("products");
    const deletedCol = db.collection("deleted-products");

    await session.withTransaction(async () => {
      const product = await productCol.findOne(
        { id: id },
        { projection: { _id: 0 }, session },
      );
      if (!product) {
        throw new Error("Failed to retrieve product for deletion");
      }

      const insertToDelete = await deletedCol.insertOne(product, { session });
      if (!insertToDelete.acknowledged) {
        throw new Error("Failed to add deleted product to trash");
      }

      await productCol.deleteOne({ id: productId }, { session });
    });

    return { success: true, message: "Product deleted successfully." };
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error deleting product:", err.message);
    }
    return { success: false, message: err.message };
  } finally {
    await session.endSession();
  }
};

export { addNewProduct, getAllProducts, getProductById, deleteProductById };
