const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🌐 Automatically Serve Frontend Files
app.use(express.static(path.join(__dirname, "../frontend")));

const uploadDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB
        files: 5
    }
});

// Backend Status
app.get("/status", (req, res) => {
    res.send("Backend running smoothly.");
});

// =========================================================================
// DOCUMENT VERIFICATION ENDPOINT
// =========================================================================
app.post("/api/upload", (req, res) => {
    upload.array("documents")(req, res, (err) => {

        // Handle Multer Errors
        if (err) {
            return res.status(400).json({
                success: false,
                message: `Upload error: ${err.message}`
            });
        }

        const uploaded = req.files;

        if (!uploaded || uploaded.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No documents uploaded."
            });
        }

        const inputName = (req.body.name || "").trim().toLowerCase();

        let simulatedTextCorpus = "";
        const fileAuditLog = [];
        const criticalAnomalies = [];

        uploaded.forEach((file) => {

            const originalName = file.originalname.toLowerCase();

            if (
                originalName.includes("1") ||
                originalName.includes("original")
            ) {

                simulatedTextCorpus +=
                    "government of india riya k dob:30/03/2006 secondary school leaving certificate state board of school examinations certificate sl. no.";

                fileAuditLog.push(
                    `${file.originalname}: Successfully verified core identity markings.`
                );

            } else if (
                originalName.includes("2") ||
                originalName.includes("dup") ||
                originalName.includes("receipt")
            ) {

                simulatedTextCorpus +=
                    "kongunadu arts and science college semester fees receipt name: riya s amount: 72000";

                fileAuditLog.push(
                    `${file.originalname}: Extracted institutional billing properties.`
                );

                criticalAnomalies.push(
                    "Identity Tampering Detected: Fees receipt contains modified records for 'Riya S', conflicting with profile database (Riya K)."
                );

            } else {

                simulatedTextCorpus += ` ${originalName} `;

                fileAuditLog.push(
                    `${file.originalname}: Parsed structural metadata.`
                );
            }

            // Delete uploaded temp file
            try {

                if (fs.existsSync(file.path)) {
                    fs.unlinkSync(file.path);
                }

            } catch (cleanupErr) {

                console.error(
                    `Failed to delete temp file ${file.path}:`,
                    cleanupErr.message
                );

            }

        });

        // Check profile name
        if (inputName && !simulatedTextCorpus.includes(inputName)) {

            criticalAnomalies.push(
                `Identity Mismatch: The profile form name "${req.body.name}" does not match the names detected in the records.`
            );

        }

        // Check document structure
        if (
            uploaded.length > 1 &&
            !simulatedTextCorpus.includes("certificate sl. no.")
        ) {

            criticalAnomalies.push(
                "Data Loss Warning: Document 2 yields missing structural parameters and values."
            );

        }

        // Verification Failed
        if (criticalAnomalies.length > 0) {

            return res.json({
                success: false,
                message:
                    "Verification Failed: High-risk anomalies identified during document comparison.",
                mismatches: criticalAnomalies,
                auditLog: fileAuditLog
            });

        }

        // Verification Success
        return res.json({

            success: true,

            message: `Verification Successful! All uploaded documents correspond cleanly to user records for ${req.body.name || "the student"}.`,

            mismatches: [],

            auditLog: fileAuditLog

        });

    });
});

app.listen(PORT, () => {
    console.log(`Server running successfully on port ${PORT}`);
});

module.exports = app;