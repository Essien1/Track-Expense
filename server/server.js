
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // ✅ Ensure JSON parsing before routes

// Debugging MongoDB connection
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI is not set in .env file");
  process.exit(1); // Exit process if no DB URI
}

console.log(`✅ Connecting to MongoDB at: ${process.env.MONGO_URI}`);

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // Exit if DB connection fails
  });

mongoose.set("debug", true); // ✅ Logs MongoDB queries for debugging

// Routes
const expenseRoutes = require("./routes/expenseRoutes");
const budgetRoutes = require("./routes/budgetRoutes");

app.use("/api/expenses", expenseRoutes);
app.use("/api/budget", budgetRoutes);

// Global Error Handler (Optional, but recommended)
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.message);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
















// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const app = express();
// app.use(cors());
// app.use(express.json());
// console.log(process.env.MONGO_URI, 'URL');

// // const cors = require("cors");
// // app.use(cors());


// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("MongoDB connected"))
//   .catch(err => console.log(err));

// mongoose.set("debug", true);

// // Routes
// const expenseRoutes = require("./routes/expenseRoutes");
// app.use("/api/expenses", expenseRoutes);

// const budgetRoutes = require("./routes/budget");
// app.use("/api/budget", budgetRoutes);


// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
