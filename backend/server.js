import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import weatherRoutes from "./routes/weather.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const dbConnected = await connectDB();
app.use((req, _, next) => {
  req.dbConnected = dbConnected;
  next();
});

app.use("/api/weather", weatherRoutes);

app.listen(process.env.PORT, () =>
  console.log(`🚀 Server running on port ${process.env.PORT}`)
);
