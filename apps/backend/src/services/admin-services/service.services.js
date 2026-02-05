import { connectToDatabase } from "../../config/db.js";
import { randomUUID } from "crypto";
import { deleteCloudinaryImage } from "./cloudinary.services.js";
const addNewService = async (service) => {
  try {
    const db = await connectToDatabase();
    const serviceCol = db.collection("services");

    const newService = {
      createdAt: new Date(),
      ...service,
      id: randomUUID(),
    };

    const result = await serviceCol.insertOne(newService);
    if (!result.acknowledged) {
      throw new Error("Failed to insert new service");
    }

    return newService.id;
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error in addNewService:", err.message);
    }
    return null;
  }
};

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

const deleteServiceById = async (id) => {
  try {
    const db = await connectToDatabase();

    const serviceCol = db.collection("services");
    const deletedCol = db.collection("deleted-services");

    const service = await serviceCol.findOne(
      { id },
      { projection: { _id: 0 } },
    );

    if (!service) {
      return { success: false, message: "Service not found" };
    }

    await deletedCol.insertOne(service);
    await serviceCol.deleteOne({ id });

    return { success: true, message: "Service deleted successfully." };
  } catch (err) {
    console.error("Error deleting service:", err);
    return { success: false, message: err.message };
  }
};

const permanentlyDeleteServiceById = async (id) => {
  try {
    const db = await connectToDatabase();
    const deletedCol = db.collection("deleted-services");

    const service = await deletedCol.findOne({ id });
    if (!service) {
      return {
        success: false,
        message: "Service not found or already deleted",
      };
    }
    await deleteCloudinaryImage(service.public_id);
    const result = await deletedCol.deleteOne({ id });
    if (result.deletedCount === 0) {
      return { success: false, message: "Service not found" };
    }
    return {
      success: true,
      message: "Service permanently deleted successfully",
    };
  } catch (err) {
    console.error("Error deleting service:", err);
    return { success: false, message: err.message };
  }
};

const restoreDeletedServiceById = async (id) => {
  try {
    const db = await connectToDatabase();
    const deletedCol = db.collection("deleted-services");
    const serviceCol = db.collection("services");
    const service = await deletedCol.findOne(
      { id },
      { projection: { _id: 0 } },
    );
    if (!service) {
      return { success: false, message: "Service not found" };
    }
    await serviceCol.insertOne(service);
    await deletedCol.deleteOne({ id });
    return { success: true, message: "Service restored successfully." };
  } catch (err) {
    console.error("Error restoring service:", err);
    return { success: false, message: err.message };
  }
};

export {
  addNewService,
  getAllServices,
  getServiceById,
  deleteServiceById,
  permanentlyDeleteServiceById,
  restoreDeletedServiceById,
};
