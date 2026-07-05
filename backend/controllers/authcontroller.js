// controllers/authController.js

exports.register = (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please fill in all fields."
        });
    }

    res.status(201).json({
        success: true,
        message: "Registration successful!"
    });
};

exports.login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please enter your email and password."
        });
    }

    res.status(200).json({
        success: true,
        message: "Login successful!",
        user: {
            name: "Praveena",
            email
        }
    });
};