// import { Router } from "express";
// import { createPost, getPosts, updatePost, deletePost, getPostById,   } from "../controllers/blogpost.controller.js";
// import { upload } from "../middlewares/multter.middleware.js";
// import { verifyJWT } from "../middlewares/auth.middleware.js";

// const router = Router()


// router.route("/createblog").post(
    
//     upload.fields([
//         {
//             name: "productImage",
//             maxCount: 1
//         }
//     ]),
//     (req, res) => {
//     try {
//         createPost(req, res)
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// })
// router.route('/logincreator').post( LoginCreator);
// router.route('/logout').post(verifyJWT, logoutUser)
// router.route('/post').get(getPosts);


// router.route('/updatepost/:id').patch(updatePost);
// router.route('/getpost/:id').get(getPostById )

// // Delete a post
// router.route('/deletepost/:id').delete(deletePost);
// export default router

import { Router } from "express";
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getProductById,
} from "../controllers/product.controller.js"; // Updated to reflect Product controller
import { upload } from "../middlewares/multer.middleware.js"; // Middleware for handling image uploads
//import { verifyJWT } from "../middlewares/auth.middleware.js"; // Middleware for verifying authentication

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

// // Login for creators (assuming a login route exists)
// router.route("/logincreator").post(verifyJWT, LoginCreator);

// // Logout route
// router.route("/logout").post(verifyJWT, logoutUser);

// Get all products
router.route("/products").get( getProducts);

// Update a product by ID
router.route("/updateproduct/:id").patch( updateProduct);

// Get a specific product by ID
router.route("/getproduct/:id").get(getProductById);

// Delete a product by ID
router.route("/deleteproduct/:id").delete( deleteProduct);

export default router;
