import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import mongoDB from "./config/database.js";
import cookieParser from "cookie-parser";
import logger from "morgan";
import indexRouter from "./routes/index.js";
import usersRouter from "./routes/users.js";

// importing the path module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// creating the express app
const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("layout", "layout");

// mongoose connection to the mongoDB
mongoose.set("strictQuery", false);
main().catch((err) => console.log(err));
async function main() {
   await mongoose.connect(mongoDB);
}

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

export default app;
