const express = require("express");
const router = express.Router();
const User = require("../models/User");

// 📖 Blog Reading Reward (20 Coins)
router.post("/blog", async (req, res) => {
    try {
        const { userId } = req.body;
        console.log("📢 Blog Read API Called:", userId);

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        user.financeCoins += 20;
        await user.save();

        res.json({ success: true, financeCoins: user.financeCoins });
    } catch (err) {
        console.error("❌ Blog Read Error:", err.message);
        res.status(500).json({ error: err.message });
    }
});

// 🎥 Webinar Attendance (300 Coins)
router.post("/webinar", async (req, res) => {
    try {
        const { userId } = req.body;
        console.log("📢 Webinar API Called:", userId);

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        user.financeCoins += 300;
        await user.save();

        res.json({ success: true, financeCoins: user.financeCoins });
    } catch (err) {
        console.error("❌ Webinar Error:", err.message);
        res.status(500).json({ error: err.message });
    }
});

// 🧠 Finance Quiz (150 Coins)
router.post("/quiz", async (req, res) => {
    try {
        const { userId } = req.body;
        console.log("📢 Quiz API Called:", userId);

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        user.financeCoins += 150;
        await user.save();

        res.json({ success: true, financeCoins: user.financeCoins });
    } catch (err) {
        console.error("❌ Quiz Error:", err.message);
        res.status(500).json({ error: err.message });
    }
});

// 📊 Budget Planning (100 Coins)
router.post("/budget", async (req, res) => {
    try {
        const { userId } = req.body;
        console.log("📢 Budget API Called:", userId);

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        user.financeCoins += 100;
        await user.save();

        res.json({ success: true, financeCoins: user.financeCoins });
    } catch (err) {
        console.error("❌ Budget Error:", err.message);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
