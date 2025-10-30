// server/server.js
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import taskRoutes from "./routes/tasks.js";
import authRoutes from "./routes/auth.js";

const app = express();

//enable cors and json parsing
// app.use(cors());
app.use(
  cors({
    origin: ["http://localhost:4200", "https://your-production-url.com"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

//routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error(err));

mongoose
  .connect(process.env.MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // serverSelectionTimeoutMS: 10000, // 10 seconds
  })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
