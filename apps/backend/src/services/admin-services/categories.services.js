import { connectToDatabase } from "../../config/db.js";

const getCategories = async () => {
  try {
    const db = await connectToDatabase();
    const categoriesCol = db.collection("categories");

    // Fetch the single document
    const categories = await categoriesCol.findOne();

    if (!categories) {
      throw new Error("No categories found");
    }

    return categories; // returns { shopCategories: [...], serviceCategories: [...] }
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error in getCategories:", error);
    }
    throw new Error("Failed to fetch categories. Please try again later.");
  }
};

export { getCategories };
