import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import mysql from "mysql2";
import orderModel from "./models/orderModel.js";
//configure env
dotenv.config();

//database config
connectDB();

//sql config
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "harmit@123",
  database: "e-commerce",
});
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);

app.post("/api/payment", async (req, res) => {
  try {
    const { name, cardNumber, cvv, bankId, cart, uid } = await req.body;
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });

    const userCheck = `SELECT * FROM payment_card WHERE card_number='${cardNumber}' AND cvv='${cvv}' AND name='${name}' AND bank_id='${bankId}'`;
    db.query(userCheck, async (err, result) => {
      if (err) {
        console.log("error", err);
        res.send({
          success: false,
          message: "Error In Payment API",
          err,
        });
        return;
      }
      if (!result || !result[0]) {
        console.log(userCheck);
        console.log("Invaid Credentials");
        res.send({
          success: false,
          message: "Invalid Credentials",
        });
        return;
      }
      const rem = result[0].balance - total;
      if (rem < 0) {
        console.log("Balance Insufficient");
        res.send({
          success: false,
          message: "Insufficient Balance",
        });
        return;
      }

      const userUpdate = `UPDATE payment_card SET balance=${rem} WHERE card_number='${cardNumber}' AND cvv='${cvv}' AND name='${name}' AND bank_id='${bankId}'`;

      db.query(userUpdate, async (err, result) => {
        try {
          const order = await new orderModel({
            products: cart,
            orderTotal: total,
            buyer: uid,
          }).save();
          res.send({
            success: true,
            message: "Payment Success",
            balance: rem,
          });
        } catch {
          console.log(err);
        }
      });
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Payment API",
      error,
    });
  }
});

// Inserting into local db
app.get("/insertOnce", (req, res) => {
  const sqlInsert =
    "INSERT INTO payment_card (card_number,cvv,name,bank_id,balance) VALUES ('1111222233334442','822','Raghav','SBIN002',400000)";

  db.query(sqlInsert, (err, result) => {
    console.log("error", err);
    console.log("result", result);
  });
  res.send("<h1>Data Inserted</h1>");
});

//REST api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to ecommerce app</h1>");
});

//PORT
const PORT = process.env.PORT || 6001;

app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});
