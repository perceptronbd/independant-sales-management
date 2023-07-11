import express from "express";
import cors from "cors";
import { db } from "./model/db.js";
import router from "./routes/routes.js";
import { User } from "./model/user.js";
import bcrypt from "bcrypt";
import { Product } from "./model/product.js";

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
//some changes

// const product = new Product({
//   name: "Product 10",
//   category: "Category D",
//   price: 30,
// });
// product.save();

app.use(express.json());
app.use(cors());

app.use("/", router);

app.listen(PORT, async () => {
  console.log("server is running");
});
