const mongoose = require("mongoose");
const validator = require("validator");


const categorySchema = new mongoose.Schema({
  name: {
  
    type: String,
    required: [true, "Please Enter Category Name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [3, "Name should have more than 4 characters"],
  },
  slug: {
    type:String,
    $regex:"/[a-z]+/g",    
    required:true,
},
  categoryImage: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

});



module.exports = mongoose.model("Category", categorySchema);