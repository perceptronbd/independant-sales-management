import express from "express";
import cors from "cors";
import path from "path";
import { db } from "./model/db.js";
import router from "./routes/routes.js";
import { User } from "./model/user.js";
import bcrypt from "bcrypt";
import { Product } from "./model/product.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

db;

// const password = "manager";
// const hashedPassword = await bcrypt.hash(password, 10);

// const newUser = new User({
//   firstName: "Nikolas",
//   lastName: "Manager",
//   email: "nikolas@gmail.com",
//   password: hashedPassword,
//   role: "manager",
//   address: "address",
//   city: "city",
//   state: "state",
//   postalCode: "postalCode",
//   referralID: "referralID",
//   refCode: "refCode-1234",
// });
// newUser.save();

// console.log("User has been created successfully!");
// some changes

// const product = new Product({
//   name: "Product 10",
//   category: "Category D",
//   price: 30,
// });
// product.save();

// static
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("/home/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

app.use(express.json());
app.use(cors());

app.use("/", router);

app.listen(PORT, async () => {
  console.log("server is running");
});
