import mongoose from "mongoose";

const Schema = mongoose.Schema;

const categorySchema = new Schema({
   name: {
      type: String,
      required: true,
   },
   description: {
      type: String,
      required: true,
   },
   url: {
      type: String,
      required: true,
   },
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
