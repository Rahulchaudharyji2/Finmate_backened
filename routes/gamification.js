const express = require("express");
const router = express.Router();
const User = require("../models/User");

// 🎖️ Unlock Badge
router.post("/unlock-badge", async (req, res) => {
    try {
      const { userId, badge } = req.body;
      console.log("📢 Unlock Badge API Called:", userId, badge);
  
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ error: "User not found" });
  
      if (!badge) {
        return res.json({ success: true, badges: user.badges }); // Return existing badges
      }
  
      if (!user.badges.includes(badge)) {
        user.badges.push(badge);
        await user.save();
      }
  
      console.log("✅ Badge Updated:", user.badges);
      res.json({ success: true, message: "Badge unlocked!", badges: user.badges });
    } catch (err) {
      console.error("❌ Unlock Badge Error:", err.message);
      res.status(500).json({ error: err.message });
    }
  });
  
// 🔥 Update Streak
router.post("/update-streak", async (req, res) => {
    try {
      const { userId } = req.body;
      console.log("📢 Update Streak API Called:", userId);
  
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ error: "User not found" });
  
      const today = new Date().setHours(0, 0, 0, 0);
      const lastActivity = user.lastActivity ? new Date(user.lastActivity).setHours(0, 0, 0, 0) : null;
  
      console.log("📅 Last Activity:", lastActivity, "Today:", today);
  
      if (lastActivity === today) {
        console.log("⚠️ Streak already updated today!");
        return res.json({ message: "Streak already updated today!" });
      }
  
      if (lastActivity && today - lastActivity === 86400000) {
        user.streaks += 1;
      } else {
        user.streaks = 1;
      }
  
      user.lastActivity = new Date();
      await user.save();
  
      console.log("✅ Updated Streak:", user.streaks); // Debugging
      res.json({ success: true, streaks: user.streaks });
    } catch (err) {
      console.error("❌ Streak Update Error:", err.message);
      res.status(500).json({ error: err.message });
    }
  });
  
// 🏆 Get Leaderboard
router.get("/leaderboard", async (req, res) => {
    try {
      const leaderboard = await User.find({}, "name financeCoins")
        .sort({ financeCoins: -1 })
        .limit(10);
      
      res.json(leaderboard);
    } catch (err) {
      console.error("❌ Leaderboard Error:", err.message);
      res.status(500).json({ error: err.message });
    }
  });
  

// 💰 Earn FinanceCoins
router.post("/earn-coins", async (req, res) => {
    try {
      const { userId, amount } = req.body;
      console.log("📢 Earn Coins API Called:", userId, "Amount:", amount);
  
      if (amount < 0) return res.status(400).json({ error: "Invalid coin amount" });
  
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ error: "User not found" });
  
      user.financeCoins += amount;
      await user.save();
  
      console.log("✅ Updated Coins:", user.financeCoins);
      res.json({ success: true, financeCoins: user.financeCoins });
    } catch (err) {
      console.error("❌ Earn Coins Error:", err.message);
      res.status(500).json({ error: err.message });
    }
  });
  
  

module.exports = router;
