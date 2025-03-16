const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));


// Routes
const creditRoutes = require("./routes/creditScore");
const creditMonitoringRoutes = require("./routes/creditMonotring");  // NEW
const personalizedPlanRoutes = require("./routes/creditPlains");       // NEW
const alertsRoutes = require("./routes/alert"); 
const transactionRoutes = require("./routes/transaction");
const userRoutes = require("./routes/user");
const recommendationRoutes = require("./routes/recommendation");
const gamificationRoutes = require("./routes/gamification");
const rewardsRoutes = require("./routes/earnCoins");

app.use("/api", creditRoutes);
app.use("/api", creditMonitoringRoutes);   // NEW
app.use("/api", personalizedPlanRoutes);   // NEW
app.use("/api", alertsRoutes); 
app.use("/api", transactionRoutes);  
app.use("/api", userRoutes);
app.use("/api", recommendationRoutes);
app.use("/api", gamificationRoutes);
//app.use("/api", rewardsRoutes);
app.use("/api/earn-coins", require("./routes/earnCoins"));
//app.use("/api/leaderboard", require("./routes/leaderboard"));
//app.use("/api/streaks", require("./routes/streaks"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

