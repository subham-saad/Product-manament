// import mongoose, {Schema} from "mongoose";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

// const blogPostSchema = new Schema ({
//        title: {
//          type: String,
//          required: true
//        },
//        descriptions: {
//          type: String,
//          required: true
//        },
//        categorydescriptions: {
//         type: String,
//         required: true
//        },
//        creatorname: {
//         type: String,
//         required: true,
//       },
//       coverImage:{
//         type: String
//       },
//       email:{
//         type: String,
//         required:true,
//         unique:true
//       },
//       password:{
//         type:String,
//         required:true
//       },
//       refreshToken: {
//         type: String
//     }

// },
//    {
//        timestamps: true
//    }

// )
// blogPostSchema.pre("save", async function(next){
//   if(!this.isModified("password")) return next();

//   try {
//     this.password = await bcrypt.hash(this.password, 10);
//     next();
    
//   } catch (error) {
//     return next(error);
//   }
// });

// blogPostSchema.methods.isPasswordCorrect = async function(password){
//   return bcrypt.compare(password, this.password)
// }

// blogPostSchema.methods.generateAccessToken = function() {
//   return jwt.sign(
//     {
//       _id: this._id,
//       email: this.email,
//       creatorname: this.creatorname
//     },
//     process.env.ACCESS_TOKEN_SECRET,
//     {
//        expiresIn: process.env.ACCESS_TOKEN_EXPIRY 
//     }
//   )
// }

// blogPostSchema.methods.generateRefreshToken = function(){
//   return jwt.sign(
//     {
//       _id: this._id,
//     },
//     process.env.REFRESH_TOKEN_SECRET,
//     {
//        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
//     }
//   )
// }


// export const Blogpost = mongoose.model("Blogpost", blogPostSchema)
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
