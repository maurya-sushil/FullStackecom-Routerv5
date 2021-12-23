const Category = require("../models/categoryModel");
const ErrorHandler = require("../utils/errorHandlers");
const CatchAsyncErrors = require("../middleware/CatchAsyncError");
const cloudinary = require("cloudinary");

// Create a category
exports.createCategory = CatchAsyncErrors(async (req, res, next) => {
   const myCloud = await cloudinary.v2.uploader.upload(req.body.categoryImage, {
    folder: "category",
    width: 250,
    crop: "scale",
  }); 
   console.log("Avatar : ", myCloud)
  const { name,slug } = req.body;

  const category = await Category.create({
    name,
    slug,
      categoryImage: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });
  res.status(201).json({
    success: true,
    category,
  });
});


// Get All Category
exports.getAllcategory = CatchAsyncErrors(async (req, res, next) => {

  const category = await Category.find();

  if (!category) {
    return next(new ErrorHandler("Sorry! no category found", 404));
  }


  res.status(200).json({
    success: true,
    category
  });
});