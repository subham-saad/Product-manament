import { Router } from "express";
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getProductById,
} from "../controllers/product.controller.js"; // Updated to reflect Product controller
import { upload } from "../middlewares/multer.middleware.js"; // Middleware for handling image uploads


const router = Router();

// Create a new product
router.route("/createproduct").post(

  upload.fields([
    {
      name: "productImage",
      maxCount: 1,
    },
  ]),
  (req, res) => {
    try {
      createProduct(req, res); // Call the create product function
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
);


// Get all products
router.route("/products").get( getProducts);

// Update a product by ID
router.route("/updateproduct/:id").patch( updateProduct);

// Get a specific product by ID
router.route("/getproduct/:id").get(getProductById);

// Delete a product by ID
router.route("/deleteproduct/:id").delete( deleteProduct);

export default router;
