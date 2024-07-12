#! /usr/bin/env node

import dotenv from "dotenv";
import mongoose from "mongoose";
import Item from "./models/item.js";
import Category from "./models/category.js";
import mongoDB from "./config/database.js";

dotenv.config();

const items = [];
const categories = [];

mongoose.set("strictQuery", false);

console.log("Debug: About to connect");
await mongoose.connect(mongoDB);
console.log("Debug: Should be connected?");

await createCategories();
await createItems();

console.log("Debug: Closing mongoose");
mongoose.connection.close();

async function categoryCreate(index, name, description, url) {
   const category = new Category({ name, description, url });
   await category.save();
   categories[index] = category;
   console.log(`Added category: ${name}`);
}

async function itemCreate(index, name, description, category, price, numberInStock, url) {
   const item = new Item({ name, description, category, price, numberInStock, url });
   await item.save();
   items[index] = item;
   console.log(`Added item: ${name}`);
}

async function createCategories() {
   console.log("Adding categories");
   await Promise.all([categoryCreate(0, "Books", "Collection of books", "http://example.com/books"), categoryCreate(1, "Electronics", "Electronic gadgets and devices", "http://example.com/electronics"), categoryCreate(2, "Clothing", "Men and Women Clothing", "http://example.com/clothing")]);
}

async function createItems() {
   console.log("Adding items");
   await Promise.all([itemCreate(0, "Book A", "A fascinating book", categories[0], 19.99, 100, "http://example.com/book_a"), itemCreate(1, "Gadget B", "A cool gadget", categories[1], 99.99, 50, "http://example.com/gadget_b"), itemCreate(2, "Shirt C", "A stylish shirt", categories[2], 29.99, 200, "http://example.com/shirt_c")]);
}
