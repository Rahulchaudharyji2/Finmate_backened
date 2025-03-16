const express = require("express");
const axios = require("axios");
const router = express.Router();

router.post("/credit-score", async (req, res) => {
    try {
        const response = await axios.post("https://finmate-mlmodel.onrender.com/predict-score", req.body);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch credit score" });
    }
});

router.post("/financial-advice", async (req, res) => {
    try {
        const response = await axios.post("https://finmate-mlmodel.onrender.com/financial-advice", req.body);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch financial advice" });
    }
});

module.exports = router;
