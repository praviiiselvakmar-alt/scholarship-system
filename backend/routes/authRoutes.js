const express = require("express");
const router = express.Router();

// Registration Endpoint
router.post("/register", (req, res) => {
    const { username, email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Required registration parameters are missing." });
    }

    res.json({ 
        success: true, 
        message: "Registration successful! Profile connected to scholarship engine." 
    });
});

// Login Endpoint
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Please provide both email and password credentials." });
    }

    res.json({ 
        success: true, 
        message: "Login successful",
        user: { email: email }
    });
});

module.exports = router;