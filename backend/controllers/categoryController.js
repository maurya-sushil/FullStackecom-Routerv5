const Category = require("../models/categoryModel");
const ErrorHandler = require("../utils/errorhander");
const CatchAsyncErrors = require('../middleware/catchAsyncErrors');
const cloudinary = require("cloudinary");

// Create a category
exports.createCategory = CatchAsyncErrors(async (req, res, next) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.categoryImage, {
    folder: "category",
    width: 250,
    crop: "scale",
  });

  const { name, slug } = req.body;

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
    category,
  });
});

// Update Categories
exports.updateCategory = CatchAsyncErrors(async (req, res, next) => {
  let category = await Category.findById(req.params.id);
  if (!category) {
    return next(new ErrorHandler("Category not Found", 404));
  }
  const newCategoryData = {
    name: req.body.name,
    slug: req.body.slug,
    public_id:category.categoryImage.public_id,
    url:category.categoryImage.url
  };

  console.log(newCategoryData)

  if (req.body.categoryImage !== undefined) {
    const imageId = category.categoryImage.public_id
    await cloudinary.v2.uploader.destroy(imageId); /// Lets destroy that images
    const myCloud = await cloudinary.v2.uploader.upload(
      req.body.categoryImage,
      {
        folder: "category",
        width: 150,
        crop: "scale",
      }
    );
    newCategoryData.categoryImage = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }
 
  category = await Category.findByIdAndUpdate(req.params.id, newCategoryData, {
    new: true,
    runValidators: true,
    useFindAndModify: true,
  });
  res.status(200).json({ success: true, category });
});

// Delete Categories
exports.deleteCategory = CatchAsyncErrors(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return next(new ErrorHandler("Category not Found", 404));
  }
  const imageId = category.categoryImage.public_id;
  await cloudinary.v2.uploader.destroy(imageId);
  await category.remove();

  res.status(200).json({
    success: true,
    message: "Category deleted successfully",
  });
});

// Category Details

exports.getCategorydetails = CatchAsyncErrors(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return next(new ErrorHandler("category not Found", 404));
  }

  res.status(200).json({
    success: true,
    category,
  });
});
