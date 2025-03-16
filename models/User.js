const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // Reward System Fields
  financeCoins: { type: Number, default: 0 }, // Virtual currency
  creditScore: { type: Number, default: 650 }, // Credit score system
  badges: [{ type: String }], // Achievements (e.g., "Quiz Master", "Webinar Pro")
  
  // Streak System
  streaks: { type: Number, default: 0 }, // Daily streak count
  lastActivity: { type: Date, default: null }, // Streak tracking

  // Leaderboard tracking
  totalEarnedCoins: { type: Number, default: 0 }, // Total coins earned (for ranking)

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", UserSchema);
