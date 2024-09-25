import { Product } from "../models/product.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import mongoose from 'mongoose';
// Controller to generate access and refresh tokens (adjust for user authentication)
// const generateAccessAndRefereshTokens = async (adminId) => {
//   try {
//     const admin = await Admin.findById(adminId); // Assuming you're using an admin model
//     const accessToken = admin.generateAccessToken();
//     const refreshToken = admin.generateRefreshToken();

//     admin.refreshToken = refreshToken;
//     await admin.save({ validateBeforeSave: false });

//     return { accessToken, refreshToken };
//   } catch (error) {
//     throw new ApiError(500, "Something went wrong");
//   }
// };


export const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, isRecommended, isBestseller, status } = req.body;

  // Validate that required fields are present
  if (
    [name, description, status].some((field) => typeof field === 'string' && field.trim() === "")
  ) {
    throw new ApiError(400, "All string fields are required");
  }
  
      let productImageLocalPath;
      if (req.files && Array.isArray(req.files.productImage) && req.files.productImage.length > 0) {
      productImageLocalPath = req.files.productImage[0].path
     }
     
  const productImage = await uploadOnCloudinary(productImageLocalPath)
  // Create the new product
  const product = await Product.create({
    name,
    description,
    price,
    productImage: productImage?.url || "",
    isRecommended: isRecommended || false,
    isBestseller: isBestseller || false,
    status: status || "Available",
   
  });

  // Return response
  return res.status(201).json(
    new ApiResponse(201, product, "Product created successfully")
  );
});


export const getProducts = async (req, res) => {
  const { search, sortBy } = req.query;

  try {
    let query = {};

    if (search) {
      query = {
        $or: [
          { name: { $regex: new RegExp(search, "i") } },
          { description: { $regex: new RegExp(search, "i") } },
        ],
      };
    }

    const products = await Product.find(query).sort({
      createdAt: sortBy === "asc" ? 1 : -1,
    });

    return res.status(200).json(new ApiResponse(200, products, "Products fetched successfully"));
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};


export const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return res.status(200).json(new ApiResponse(200, product, "Product fetched successfully"));
});


// export const updateProduct = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   const { name, description, price, isRecommended, isBestseller, status } = req.body;

//   // Validate required fields
//   if ([name, description].some((field) => typeof field === 'string' && field.trim() === "") || price == null) {
//     throw new ApiError(400, "Name, description, and price are required");
//   }

//   const updatedProduct = await Product.findByIdAndUpdate(
//     id,
//     {
//       name,
//       description,
//       price,
//       isRecommended,
//       isBestseller,
//       status,
//     },
//     { new: true }
//   );

//   if (!updatedProduct) {
//     throw new ApiError(404, "Product not found");
//   }

//   return res.status(200).json(new ApiResponse(200, updatedProduct, "Product updated successfully"));
// });



export const updateProduct = asyncHandler(async (req, res) => {
  let { id } = req.params;

  // Trim the ID to remove any unwanted characters like newlines
  id = id.trim();

  // Validate if the id is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid Product ID");
  }

  const { name, description, price, isRecommended, isBestseller, status } = req.body;

  // Validate required fields
  if ([name, description].some((field) => typeof field === 'string' && field.trim() === "") || price == null) {
    throw new ApiError(400, "Name, description, and price are required");
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    {
      name,
      description,
      price,
      isRecommended,
      isBestseller,
      status,
    },
    { new: true }
  );

  if (!updatedProduct) {
    throw new ApiError(404, "Product not found");
  }

  return res.status(200).json(new ApiResponse(200, updatedProduct, "Product updated successfully"));
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedProduct = await Product.findByIdAndDelete(id);

  if (!deletedProduct) {
    throw new ApiError(404, "Product not found");
  }

  return res.status(200).json(new ApiResponse(200, deletedProduct, "Product deleted successfully"));
});
