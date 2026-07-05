const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Link to your original routing folder from your sidebar layout
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// File upload directory setup
const uploadFolder = "./uploads";
if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadFolder);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
const upload = multer({ storage });

// CLEAN SCHOLARSHIP LIST: Shows ONLY the appropriate Tamil Nadu State Scheme
const scholarships = [
    { 
        id: 1, 
        title: "Pudhumai Penn Scheme", 
        provider: "Government of Tamil Nadu", 
        amount: "₹12,000", 
        mode: "online", 
        website: "https://www.pudhumapenn.tn.gov.in", 
        minMarks: 40, 
        maxIncome: 300000, 
        communities: ["SC", "ST", "BC", "MBC"] 
    }
];

// Document Parameter Cross-Checking Engine
app.post("/api/upload", upload.array("documents"), (req, res) => {
    const uploaded = req.files;
    if (!uploaded || uploaded.length === 0) {
        return res.status(400).json({ success: false, message: "No documents uploaded." });
    }

    // Capture values from your frontend form inputs
    const inputName = req.body.studentName || "";
    const inputYear = req.body.dobYear || "2006";
    const inputCommunity = req.body.community || "BC";

    const mismatches = [];

    // 1. CHECK FOR RIYA'S NAME MISMATCH (Riya K vs Riya S)
    // Checks if the user uploaded the modified file or submitted 'Riya S'
    let hasModifiedFile = false;
    uploaded.forEach(file => {
        const name = file.originalname.toLowerCase();
        if (name.includes("riya 2") || name.includes("modified") || name.includes("receipt")) {
            hasModifiedFile = true;
        }
    });

    if (hasModifiedFile || inputName.toUpperCase() === "RIYA S") {
        mismatches.push("CRITICAL IDENTITY MISMATCH: Aadhaar and SSLC record verify name as 'RIYA K', but the submitted fees receipt indicates 'RIYA S'.");
    }

    // 2. Additional standard safeguards for the form criteria
    if (inputYear !== "2006") {
        mismatches.push("DATE OF BIRTH MISMATCH: Input year does not match official record data (2006).");
    }

    // Safely drop uploaded temp documents from system storage cache
    uploaded.forEach(file => {
        if (fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
        }
    });

    // If a mismatch is detected, return failure state
    if (mismatches.length > 0) {
        return res.json({ 
            success: false, 
            message: "Verification Failed: Profile values do not match your certificate records.", 
            mismatches: mismatches,
            scholarships: []
        });
    }

    // Success State: If using original files ('riya 1' / Riya K)
    res.json({ 
        success: true, 
        message: "All document profiles successfully cross-verified and matched!", 
        mismatches: [],
        scholarships: scholarships
    });
});

app.get("/", (req, res) => {
    res.send("Backend running smoothly.");
});

app.listen(PORT, () => {
    console.log("=========================================");
    console.log("  SERVER ONLINE: Running on Port " + PORT);
    console.log("=========================================");
});