// ================= CONFIG =================
// When running locally, change this to "http://localhost:4000"
// When live on Render, keep it as your live link: "https://scholarship-system-uo2n.onrender.com"
const API_BASE_URL = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? "http://localhost:4000"
    : "https://scholarship-system-uo2n.onrender.com";

// ================= ELEMENT REFERENCES =================
const checkEligibilityBtn = document.getElementById("checkEligibilityBtn");
const scholarshipSection = document.getElementById("scholarshipSection");
const scholarshipContainer = document.getElementById("scholarshipContainer");

const documentSection = document.getElementById("documentSection");
const requiredDocumentsList = document.getElementById("requiredDocumentsList");

const uploadSection = document.getElementById("uploadSection");
const documentUpload = document.getElementById("documentUpload");
const uploadedFilesDiv = document.getElementById("uploadedFiles");
const verifyBtn = document.getElementById("verifyBtn");

const reportSection = document.getElementById("reportSection");
const verificationResult = document.getElementById("verificationResult");

// ================= 1. CHECK ELIGIBILITY =================
checkEligibilityBtn.addEventListener("click", () => {
    const fullName = document.getElementById("fullName").value.trim();
    const income = document.getElementById("income").value.trim();
    const marks = document.getElementById("marks").value.trim();

    if (!fullName || !income || !marks) {
        alert("Please fill in at least Name, Income, and 12th Percentage before checking eligibility.");
        return;
    }

    // Full 15+ Scholarship dataset matching criteria
    const scholarships = [
        { name: "Tamil Nadu State Merit Scholarship", minMarks: 60, maxIncome: 250000 },
        { name: "Central Sector Scholarship Scheme", minMarks: 80, maxIncome: 800000 },
        { name: "First Graduate Tuition Fees Concession", minMarks: 50, maxIncome: 200000 },
        { name: "Post Matric Scholarship (SC/ST/SCC)", minMarks: 40, maxIncome: 250000 },
        { name: "BC/MBC/DNC Government Scholarship", minMarks: 40, maxIncome: 200000 },
        { name: "Moovalur Ramamirtham Ammaiyar Pudhumai Penn Scheme", minMarks: 50, maxIncome: 300000 },
        { name: "AICTE Pragati Scholarship for Girls", minMarks: 70, maxIncome: 800000 },
        { name: "National Means Cum Merit Scholarship", minMarks: 55, maxIncome: 350000 },
        { name: "HDFC Badhte Kadam Scholarship", minMarks: 60, maxIncome: 600000 },
        { name: "Sitaram Jindal Foundation Scholarship", minMarks: 65, maxIncome: 250000 },
        { name: "Kotak Kanya Scholarship Portfolio", minMarks: 75, maxIncome: 600000 },
        { name: "Aditya Birla Capital Scholarship Scheme", minMarks: 60, maxIncome: 600000 },
        { name: "Inlaks Shivdasani Foundation Awards", minMarks: 85, maxIncome: 1000000 },
        { name: "Dr. Ambedkar Post-Matric Excellence Award", minMarks: 50, maxIncome: 250000 },
        { name: "Chief Minister's Merit Research Fellowship", minMarks: 75, maxIncome: 500000 }
    ];

    const eligible = scholarships.filter(
        s => Number(marks) >= s.minMarks && Number(income) <= s.maxIncome
    );

    scholarshipContainer.innerHTML = "";

    if (eligible.length === 0) {
        scholarshipContainer.innerHTML = "<p>No matching scholarships found for the entered details.</p>";
    } else {
        eligible.forEach(s => {
            const card = document.createElement("div");
            card.className = "scholarship-card";
            card.innerHTML = `
                <h3>${s.name}</h3>
                <button class="apply-btn" data-name="${s.name}">Apply</button>
            `;
            scholarshipContainer.appendChild(card);
        });

        // Wire up Apply buttons
        document.querySelectorAll(".apply-btn").forEach(btn => {
            btn.addEventListener("click", () => selectScholarship(btn.dataset.name));
        });
    }

    scholarshipSection.style.display = "block";
    scholarshipSection.scrollIntoView({ behavior: "smooth" });
});

// ================= 2. SELECT SCHOLARSHIP -> SHOW REQUIRED DOCS =================
function selectScholarship(scholarshipName) {
    requiredDocumentsList.innerHTML = `
        <li>Aadhaar Card / Government ID</li>
        <li>Latest Mark Sheet</li>
        <li>Income Certificate</li>
        <li>College Bonafide / Fees Receipt</li>
    `;

    documentSection.style.display = "block";
    uploadSection.style.display = "block";
    documentSection.scrollIntoView({ behavior: "smooth" });
}

// ================= 3. FILE SELECTION PREVIEW =================
documentUpload.addEventListener("change", () => {
    uploadedFilesDiv.innerHTML = "";
    Array.from(documentUpload.files).forEach(file => {
        const item = document.createElement("div");
        item.textContent = `📄 ${file.name}`;
        uploadedFilesDiv.appendChild(item);
    });
});

// ================= 4. VERIFY DOCUMENTS =================
verifyBtn.addEventListener("click", async () => {
    const fullName = document.getElementById("fullName").value.trim();
    const files = documentUpload.files;

    if (!files || files.length === 0) {
        alert("Please choose at least one document to upload.");
        return;
    }

    const formData = new FormData();
    formData.append("name", fullName);
    for (let i = 0; i < files.length; i++) {
        formData.append("documents", files[i]);
    }

    reportSection.style.display = "block";
    verificationResult.innerHTML = "<p>Verifying documents, please wait...</p>";
    reportSection.scrollIntoView({ behavior: "smooth" });

    try {
        const response = await fetch(`${API_BASE_URL}/api/upload`, {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error(`Server responded with status ${response.status}`);
        }

        const data = await response.json();
        renderVerificationResult(data);

    } catch (error) {
        console.error("Verification request failed:", error);
        verificationResult.innerHTML = `
            <div class="report-error">
                <h3>Server Error</h3>
                <p>Unable to reach the verification server. Please check your connection and try again.</p>
            </div>
        `;
    }
});

// ================= 5. RENDER RESULT =================
function renderVerificationResult(data) {
    let html = "";

    if (data.success) {
        html += `<div class="report-success"><h3>✅ ${data.message}</h3></div>`;
    } else {
        html += `<div class="report-error"><h3>❌ ${data.message}</h3></div>`;
    }

    if (data.mismatches && data.mismatches.length > 0) {
        html += "<ul>";
        data.mismatches.forEach(m => {
            html += `<li>${m}</li>`;
        });
        html += "</ul>";
    }

    if (data.auditLog && data.auditLog.length > 0) {
        html += "<h4>Audit Log</h4><ul>";
        data.auditLog.forEach(entry => {
            html += `<li>${entry}</li>`;
        });
        html += "</ul>";
    }

    verificationResult.innerHTML = html;
}