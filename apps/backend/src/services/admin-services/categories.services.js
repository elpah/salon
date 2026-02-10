import { connectToDatabase } from "../../config/db.js";

const getCategories = async () => {
  try {
    const db = await connectToDatabase();
    const categoriesCol = db.collection("categories");
    const categories = await categoriesCol.findOne();

    if (!categories) {
      throw new Error("No categories found");
    }

    return categories;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error in getCategories:", error);
    }
    throw new Error("Failed to fetch categories. Please try again later.");
  }
};

const createNewCategory = async ({ name, type }) => {
  try {
    const db = await connectToDatabase();
    const categoriesCol = db.collection("categories");

    let fieldToUpdate;
    if (type === "product") fieldToUpdate = "shopCategories";
    else if (type === "service") fieldToUpdate = "serviceCategories";
    else throw new Error("Invalid category type");

    await categoriesCol.updateOne(
      {},
      {
        $addToSet: {
          [fieldToUpdate]: name,
        },
      },
    );
    return { success: true };
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error in createNewCategory:", error);
    }
    throw new Error("Failed to create new categories. Please try again later.");
  }
};

const deleteCategory = async ({ name, type }) => {
  try {
    const db = await connectToDatabase();
    const categoriesCol = db.collection("categories");

    let fieldToUpdate;
    if (type === "product") fieldToUpdate = "shopCategories";
    else if (type === "service") fieldToUpdate = "serviceCategories";
    else throw new Error("Invalid category type");

    await categoriesCol.updateOne(
      {},
      {
        $pull: {
          [fieldToUpdate]: name,
        },
      },
    );
    return { success: true };
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error in deleteCategory:", error);
    }
    throw new Error("Failed to delete category. Please try again later.");
  }
};

export { getCategories, createNewCategory, deleteCategory };
