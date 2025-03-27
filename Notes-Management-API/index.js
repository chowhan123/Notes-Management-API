import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import noteRoutes from "./routes/noteRoutes.js"; // Import routes

dotenv.config(); // Load .env file

const app = express();
app.use(express.json()); // Middleware to parse JSON
app.use(cors()); // Enable CORS

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("MongoDB URI is missing! Check .env file.");
  process.exit(1);
}

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "NotesDB", // Ensure DB name is specified
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });

app.get("/", (req, res) => {
  res.send("Welcome to Notes Management API");
});

// Use routes process intializing
app.use("/api/notes", noteRoutes); // Ensures correct API path

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
