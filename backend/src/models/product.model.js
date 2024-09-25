import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    isRecommended: {
      type: Boolean,
      default: false,
    },
    isBestseller: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["Available", "Out of Stock", "Discontinued"],
      default: "Available",
    },
      productImage:{
        type: String      
    },
  },
  {
    timestamps: true,
  }
);

// Methods for interacting with the product

productSchema.methods.updateProduct = function (title, description) {
  this.name = title || this.name;
  this.description = description || this.description;
  return this.save();
};

productSchema.methods.deleteProduct = function () {
  return this.remove();
};

export const Product = mongoose.model("Product", productSchema);
