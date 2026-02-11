import { Router } from "express";
import multer from "multer";
import { uploadImage } from "../services/admin-services/cloudinary.services.js";
import { verifyAdmin } from "../middleware/auth.middleware.js";

import {
  addNewProduct,
  deleteProductById,
  // permanentlyDeleteProductById,
  // restoreDeletedProductById,
} from "../services/admin-services/product.services.js";

import {
  deleteServiceById,
  // permanentlyDeleteServiceById,
  // restoreDeletedServiceById,
  addNewService,
} from "../services/admin-services/service.services.js";
import {
  createAvailabilityWindow,
  deleteAvailabilityById,
} from "../services/admin-services/availability.services.js";

import { getAllBookings } from "../services/admin-services/bookings.services.js";

import {
  createNewCategory,
  deleteCategory,
} from "../services/admin-services/categories.services.js";

import { getUser } from "../services/admin-services/user.services.js";

const adminRoute = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage }).single("image");

adminRoute.get("/", verifyAdmin, async (_req, res) => {
  res.status(200).json({ message: "arrived" });
});

adminRoute.delete("/delete-product/:id", verifyAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteProductById(id);
    if (result.success) {
      res.status(200).json({ message: "Product deleted successfully" });
    } else {
      res.status(400).json({ message: result.message });
    }
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error deleting product:", err);
    }
    res.status(500).send("Internal Server Error");
  }
});

adminRoute.delete("/delete-service/:id",verifyAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteServiceById(id);
    if (result.success) {
      res.status(200).json({ message: "Service deleted successfully" });
    } else {
      res.status(400).json({ message: result.message });
    }
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error deleting Service:", err);
    }
    res.status(500).send("Internal Server Error");
  }
});

// Add to Future Improvements

// adminRoute.delete("/delete-product-forever/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const result = await permanentlyDeleteProductById(id);
//     if (result.success) {
//       res.status(200).json({ message: "Product deleted successfully" });
//     } else {
//       res.status(400).json({ message: result.message });
//     }
//   } catch (err) {
//     if (process.env.NODE_ENV !== "production") {
//       console.error("Error deleting product:", err);
//     }
//     res.status(500).send("Internal Server Error");
//   }
// });

// adminRoute.delete("/delete-service-forever/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const result = await permanentlyDeleteServiceById(id);
//     if (result.success) {
//       res.status(200).json({ message: "Service deleted successfully" });
//     } else {
//       res.status(400).json({ message: result.message });
//     }
//   } catch (err) {
//     if (process.env.NODE_ENV !== "production") {
//       console.error("Error deleting Service:", err);
//     }
//     res.status(500).send("Internal Server Error");
//   }
// });

// adminRoute.post("/restore-product/:id", async (req, res) => {
//   const { id } = req.params;

//   try {
//     const result = await restoreDeletedProductById(id);

//     if (!result.success) {
//       return res.status(404).json({
//         message: result.message || "Product not found",
//       });
//     }

//     return res.status(201).json({
//       message: "Product restored successfully",
//     });
//   } catch (err) {
//     if (process.env.NODE_ENV !== "production") {
//       console.error("Error restoring product:", err);
//     }

//     return res.status(500).json({
//       message: "Internal Server Error",
//     });
//   }
// });

// adminRoute.post("/restore-service/:id", async (req, res) => {
//   const { id } = req.params;

//   try {
//     const result = await restoreDeletedServiceById(id);

//     if (!result.success) {
//       return res.status(404).json({
//         message: result.message || "Service not found",
//       });
//     }

//     return res.status(201).json({
//       message: "Service restored successfully",
//     });
//   } catch (err) {
//     if (process.env.NODE_ENV !== "production") {
//       console.error("Error restoring Service:", err);
//     }

//     return res.status(500).json({
//       message: "Internal Server Error",
//     });
//   }
// });

adminRoute.post("/create-new-availability",verifyAdmin, async (req, res) => {
  try {
    const insertedId = await createAvailabilityWindow(req.body);
    return res.status(201).json({
      message: "Availability window created successfully",
      id: insertedId,
    });
  } catch (err) {
    console.error("Error in /create-new-availability:", err.message);

    return res.status(400).json({
      error: err.message || "Something went wrong",
    });
  }
});

adminRoute.get("/bookings",verifyAdmin, async (_req, res) => {
  try {
    const bookings = await getAllBookings();
    res.status(200).json(bookings);
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

adminRoute.delete("/delete-availability/:id",verifyAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteAvailabilityById(id);
    if (result.success) {
      res.status(200).json({ message: "Availability deleted successfully" });
    } else {
      res.status(400).json({ message: result.message });
    }
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error deleting availability:", err);
    }
    res.status(500).send("Internal Server Error");
  }
});

adminRoute.post("/create-new-service",verifyAdmin, upload, async (req, res) => {
  try {
    let newService = JSON.parse(req.body.newService);
    const serviceImage = req.file;

    if (serviceImage) {
      const uploaded = await uploadImage(
        serviceImage,
        "professional_hair_stylist/service_images",
      );
      if (!uploaded || !uploaded.url) {
        throw new Error("Image upload failed or did not return a URL");
      }
      newService.image = uploaded.url;
      newService.public_id = uploaded.public_id;
    }
    const insertedId = await addNewService(newService);
    return res.status(201).json({
      message: "Service created successfully",
      id: insertedId,
    });
  } catch (err) {
    console.error("Error in /create-new-service:", err.message);

    return res.status(400).json({
      error: err.message || "Something went wrong",
    });
  }
});

adminRoute.post("/add-product",verifyAdmin, upload, async (req, res) => {
  try {
    let productData = JSON.parse(req.body.productData);
    const productImage = req.file;

    if (productImage) {
      const uploaded = await uploadImage(
        productImage,
        "professional_hair_stylist/product_images",
      );
      if (!uploaded || !uploaded.url) {
        throw new Error("Image upload failed or did not return a URL");
      }
      productData.image = uploaded.url;
      productData.public_id = uploaded.public_id;
    }
    const result = await addNewProduct(productData);
    if (!result) {
      return res.status(500).json({ message: "Failed to add product" });
    }
    res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error(error);
    }
    res.status(500).json({ message: "Something went wrong" });
  }
});

adminRoute.post("/create-new-category",verifyAdmin, async (req, res) => {
  try {
    const { name, type } = req.body;
    console.log(name, type);
    await createNewCategory({ name, type });
    return res.status(201).json({
      message: "Category created successfully",
    });
  } catch (err) {
    console.error("Error in /create-new-category:", err.message);

    return res.status(400).json({
      error: err.message || "Something went wrong",
    });
  }
});
adminRoute.delete("/delete-category",verifyAdmin, async (req, res) => {
  try {
    const { name, type } = req.query;
    console.log(name, type);
    await deleteCategory({ name, type });
    return res.status(200).json({
      message: "Category created successfully",
    });
  } catch (err) {
    console.error("Error in /delete-category:", err.message);

    return res.status(400).json({
      error: err.message || "Something went wrong",
    });
  }
});

adminRoute.get("/users/get-or-create",verifyAdmin, async (req, res) => {
  try {
    const { firebaseUid = "", email = "" } = req.query;
    if (!firebaseUid || !email) {
      return res
        .status(400)
        .json({ message: "firebaseUid and email are required" });
    }

    const user = await getUser(firebaseUid, email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

export default adminRoute;
