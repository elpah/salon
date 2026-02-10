import { connectToDatabase } from "../../config/db.js";

const getAllServices = async () => {
  try {
    const db = await connectToDatabase();
    const servicesCol = db.collection("services");
    const services = await servicesCol.find().toArray();

    return services;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error in getAllProducts:", error);
    }
    throw new Error("Failed to fetch Services. Please try again later.");
  }
};

const getServiceById = async (id) => {
  try {
    const db = await connectToDatabase();
    const serviceCol = db.collection("services");

    const service = await serviceCol.findOne(
      { id },
      { projection: { _id: 0 } },
    );

    if (!service) {
      throw new Error("Product not found");
    }

    return service;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error in getProductById:", error);
    }
    throw new Error("Failed to fetch product. Please try again later.");
  }
};

export { getAllServices, getServiceById };
