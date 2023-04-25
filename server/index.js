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

// app.put("/payment/:id", (req, res) => {
//   const sqlCheck =
//     "SELECT * FROM payment_card WHERE card_number = '11111111111111' AND cvv='111' AND user_id='user_id' AND bank_id='bank_id'";
//   db.query(sqlCheck, (err, result) => {
//     console.log("error", err);
//     console.log("result", result);
//   });
// });

// Inserting into local db
// app.get("/insertOnce", (req, res) => {
//   const sqlInsert =
//     "INSERT INTO payment_card (card_number,cvv,user_id,bank_id,balance) VALUES ('1111222233334440','120','64481dd5035e0065480d4443','SBIN002',5000)";
//   db.query(sqlInsert, (err, result) => {
//     console.log("error", err);
//     console.log("result", result);
//   });
//   res.send("<h1>Data Inserted</h1>");
// });

//REST api
app.get("/", (req, res) => {
  // const sqlInsert = "INSERT INTO payment_card (card_number,cvv,user_id,bank_id) VALUES ('11111111111111','111','user_id','bank_id')";
  // db.query(sqlInsert,(err,result)=>{
  //   console.log("error",err);
  //   console.log("result",result);
  // })
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
