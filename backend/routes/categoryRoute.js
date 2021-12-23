const express = require("express");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const {createCategory, getAllcategory} = require('../controllers/categoryController')

router.route("/category/create").post(isAuthenticatedUser, authorizeRoles("admin"),createCategory);
router.route("/categories").get(isAuthenticatedUser, authorizeRoles("admin"),getAllcategory);


module.exports=router;
