import mongoose from "mongoose";

const Schema = mongoose.Schema;

const itemSchema = new Schema({
   name: {
      type: String,
      required: true,
   },
   description: {
      type: String,
      required: true,
   },
   category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
   },
   price: {
      type: Number,
      required: true,
   },
   numberInStock: {
      type: Number,
      required: true,
   },
   url: {
      type: String,
      required: true,
   },
});

const Item = mongoose.model("Item", itemSchema);

export default Item;
