const API_BASE_URL = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" 
    ? "http://localhost:4000" 
    : "https://scholarship-system-1.onrender.com";

const checkEligibilityBtn = document.getElementById("checkEligibilityBtn");
const scholarshipSection = document.getElementById("scholarshipSection");
const scholarshipContainer = document.getElementById("scholarshipContainer");
const uploadSection = document.getElementById("uploadSection");
const documentUpload = document.getElementById("documentUpload");
const uploadedFilesDiv = document.getElementById("uploadedFiles");
const verifyBtn = document.getElementById("verifyBtn");
const reportSection = document.getElementById("reportSection");
const verificationResult = document.getElementById("verificationResult");

checkEligibilityBtn.addEventListener("click", () => {
    const fullName = document.getElementById("fullName").value.trim();
    const income = document.getElementById("income").value.trim();
    const marks = document.getElementById("marks").value.trim();

    if (!fullName || !income || !marks) {
        alert("Please fill in Name, Income, and Marks first.");
        return;
    }

    // Comprehensive scholarship mapping dataset with mode configuration
    const scholarships = [
        { name: "Tamil Nadu State Merit Scholarship", minMarks: 60, maxIncome: 250000, mode: "online" },
        { name: "Central Sector Scholarship Scheme", minMarks: 80, maxIncome: 800000, mode: "online" },
        { name: "First Graduate Tuition Fees Concession", minMarks: 50, maxIncome: 200000, mode: "offline", instruction: "Download the application form from the TNEA portal, obtain the signature from your Village Administrative Officer (VAO), and submit the physical copy to your college administration office." },
        { name: "Post Matric Scholarship (SC/ST/SCC)", minMarks: 40, maxIncome: 250000, mode: "online" },
        { name: "BC/MBC/DNC Government Scholarship", minMarks: 40, maxIncome: 200000, mode: "offline", instruction: "Collect the scholarship application form directly from your college scholarship section, attach your community and income certificates, and submit it manually to the head of your institution." },
        { name: "Moovalur Ramamirtham Ammaiyar Pudhumai Penn Scheme", minMarks: 50, maxIncome: 300000, mode: "online" },
        { name: "AICTE Pragati Scholarship for Girls", minMarks: 70, maxIncome: 800000, mode: "online" },
        { name: "National Means Cum Merit Scholarship", minMarks: 55, maxIncome: 350000, mode: "online" },
        { name: "HDFC Badhte Kadam Scholarship", minMarks: 60, maxIncome: 600000, mode: "online" },
        { name: "Sitaram Jindal Foundation Scholarship", minMarks: 65, maxIncome: 250000, mode: "offline", instruction: "Print the application form from the official Sitaram Jindal Foundation portal, fill it out manually, attach verified mark sheets, and send it by post to the foundation’s Bangalore head office." },
        { name: "Kotak Kanya Scholarship Portfolio", minMarks: 75, maxIncome: 600000, mode: "online" },
        { name: "Aditya Birla Capital Scholarship Scheme", minMarks: 60, maxIncome: 600000, mode: "online" },
        { name: "Inlaks Shivdasani Foundation Awards", minMarks: 85, maxIncome: 1000000, mode: "online" },
        { name: "Dr. Ambedkar Post-Matric Excellence Award", minMarks: 50, maxIncome: 250000, mode: "online" },
        { name: "Chief Minister's Merit Research Fellowship", minMarks: 75, maxIncome: 500000, mode: "online" }
    ];

    const eligible = scholarships.filter(s => Number(marks) >= s.minMarks && Number(income) <= s.maxIncome);
    scholarshipContainer.innerHTML = "";

    if (eligible.length === 0) {
        scholarshipContainer.innerHTML = "<p>No matching scholarships found.</p>";
    } else {
        eligible.forEach(s => {
            const card = document.createElement("div");
            card.className = "scholarship-card";
            card.innerHTML = `
                <div>
                    <h3>${s.name}</h3>
                    <p style="margin: 5px 0 0 0; font-size: 13px; color: ${s.mode === 'online' ? '#2ecc71' : '#e67e22'}; font-weight: bold;">
                        Application Mode: ${s.mode.toUpperCase()}
                    </p>
                </div>
                <button class="apply-btn" data-mode="${s.mode}" data-instruction="${s.instruction || ''}">Apply Now</button>
            `;
            scholarshipContainer.appendChild(card);
        });

        document.querySelectorAll(".apply-btn").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const mode = e.target.getAttribute("data-mode");
                const instruction = e.target.getAttribute("data-instruction");

                if (mode === "online") {
                    // Show digital upload portal instantly
                    uploadSection.style.display = "block";
                    uploadSection.scrollIntoView({ behavior: "smooth" });
                } else {
                    // Hide digital portal and present concrete instructions
                    uploadSection.style.display = "none";
                    alert(`📋 OFFLINE APPLICATION PROCESS:\n\n${instruction}`);
                }
            });
        });
    }
    scholarshipSection.style.display = "block";
    scholarshipSection.scrollIntoView({ behavior: "smooth" });
});

documentUpload.addEventListener("change", () => {
    uploadedFilesDiv.innerHTML = "";
    Array.from(documentUpload.files).forEach(file => {
        const item = document.createElement("div");
        item.textContent = "📄 " + file.name;
        uploadedFilesDiv.appendChild(item);
    });
});

verifyBtn.addEventListener("click", async () => {
    const fullName = document.getElementById("fullName").value.trim();
    const files = documentUpload.files;

    if (!files || files.length === 0) {
        alert("Please select your files to upload.");
        return;
    }

    const formData = new FormData();
    formData.append("name", fullName);
    for (let i = 0; i < files.length; i++) {
        formData.append("documents", files[i]);
    }

    reportSection.style.display = "block";
    verificationResult.innerHTML = "<p>Verifying documents... checking metadata...</p>";
    reportSection.scrollIntoView({ behavior: "smooth" });

    try {
        const response = await fetch(`${API_BASE_URL}/api/upload`, {
            method: "POST",
            body: formData
        });
        const data = await response.json();
        
        let html = "";
        if (data.success) {
            html += "<div class='report-success'><h3>✅ " + data.message + "</h3></div>";
        } else {
            html += "<div class='report-error'><h3>❌ " + data.message + "</h3></div>";
        }

        if (data.mismatches && data.mismatches.length > 0) {
            html += "<ul style='color: #c0392b;'>";
            data.mismatches.forEach(m => { html += "<li>" + m + "</li>"; });
            html += "</ul>";
        }

        if (data.auditLog && data.auditLog.length > 0) {
            html += "<h4>System Processing Logs:</h4><ul class='audit-list'>";
            data.auditLog.forEach(entry => { html += "<li>" + entry + "</li>"; });
            html += "</ul>";
        }
        verificationResult.innerHTML = html;

    } catch (err) {
        verificationResult.innerHTML = "<div class='report-error'><h3>Error</h3><p>Server verification processing broken.</p></div>";
    }
});