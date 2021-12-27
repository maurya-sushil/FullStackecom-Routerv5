const express = require("express");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const {createCategory, getAllcategory, updateCategory, deleteCategory, getCategorydetails} = require('../controllers/categoryController')

router.route("/category/create").post(isAuthenticatedUser, authorizeRoles("admin"),createCategory);
router.route("/categories").get(isAuthenticatedUser, authorizeRoles("admin"),getAllcategory);
router
  .route("/admin/category/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateCategory)
  .get(isAuthenticatedUser, authorizeRoles("admin"), getCategorydetails)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteCategory);

module.exports=router;
