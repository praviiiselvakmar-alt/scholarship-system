const checkEligibilityBtn = document.getElementById("checkEligibilityBtn");
const scholarshipSection = document.getElementById("scholarshipSection");
const scholarshipContainer = document.getElementById("scholarshipContainer");

checkEligibilityBtn.addEventListener("click", () => {
    const fullName = document.getElementById("fullName").value.trim();
    const incomeRaw = document.getElementById("income").value.trim();
    const marksRaw = document.getElementById("marks").value.trim();

    if (!fullName || !incomeRaw || !marksRaw) {
        alert("Please fill in Name, Income, and Marks first.");
        return;
    }

    // Validate that income/marks are actual numbers before proceeding.
    // Invalid input silently becomes NaN, and every comparison with NaN
    // is false — the user just saw "No matching scholarships found"
    // with no indication their input was the problem.
    const income = Number(incomeRaw);
    const marks = Number(marksRaw);

    if (Number.isNaN(income) || Number.isNaN(marks) || income < 0 || marks < 0) {
        alert("Please enter valid numeric values for Income and Marks.");
        return;
    }

    // Comprehensive scholarship mapping dataset with direct portal links and manual instructions
    const scholarships = [
        { name: "Tamil Nadu State Merit Scholarship", minMarks: 60, maxIncome: 250000, mode: "online", deadline: "31-Aug-2026", url: "https://www.scholarships.gov.in" },
        { name: "Central Sector Scholarship Scheme", minMarks: 80, maxIncome: 800000, mode: "online", deadline: "15-Sep-2026", url: "https://www.scholarships.gov.in" },
        { name: "First Graduate Tuition Fees Concession", minMarks: 50, maxIncome: 200000, mode: "offline", deadline: "30-Aug-2026", instruction: "Download the application form from the TNEA portal, obtain the signature from your Village Administrative Officer (VAO), and submit the physical copy to your college administration office." },
        { name: "Post Matric Scholarship (SC/ST/SCC)", minMarks: 40, maxIncome: 250000, mode: "online", deadline: "10-Oct-2026", url: "https://bcmbcmw.tn.gov.in" },
        { name: "BC/MBC/DNC Government Scholarship", minMarks: 40, maxIncome: 200000, mode: "offline", deadline: "05-Oct-2026", instruction: "Collect the scholarship application form directly from your college scholarship section, attach your community and income certificates, and submit it manually to the head of your institution." },
        { name: "Moovalur Ramamirtham Ammaiyar Pudhumai Penn Scheme", minMarks: 50, maxIncome: 300000, mode: "online", deadline: "25-Aug-2026", url: "https://www.pudhumaipenn.tn.gov.in" },
        { name: "AICTE Pragati Scholarship for Girls", minMarks: 70, maxIncome: 800000, mode: "online", deadline: "31-Oct-2026", url: "https://www.aicte-india.org" },
        { name: "National Means Cum Merit Scholarship", minMarks: 55, maxIncome: 350000, mode: "online", deadline: "20-Sep-2026", url: "https://www.scholarships.gov.in" },
        { name: "HDFC Badhte Kadam Scholarship", minMarks: 60, maxIncome: 600000, mode: "online", deadline: "30-Sep-2026", url: "https://www.buddy4study.com" },
        { name: "Sitaram Jindal Foundation Scholarship", minMarks: 65, maxIncome: 250000, mode: "offline", deadline: "15-Dec-2026", instruction: "Print the application form from the official Sitaram Jindal Foundation portal, fill it out manually, attach verified mark sheets, and send it by post to the foundation's Bangalore head office." },
        { name: "Kotak Kanya Scholarship Portfolio", minMarks: 75, maxIncome: 600000, mode: "online", deadline: "31-Oct-2026", url: "https://www.kotak.com" },
        { name: "Aditya Birla Capital Scholarship Scheme", minMarks: 60, maxIncome: 600000, mode: "online", deadline: "15-Nov-2026", url: "https://www.adityabirlacapital.com" },
        { name: "Inlaks Shivdasani Foundation Awards", minMarks: 85, maxIncome: 1000000, mode: "online", deadline: "15-Aug-2026", url: "https://www.inlaksfoundation.org" },
        { name: "Dr. Ambedkar Post-Matric Excellence Award", minMarks: 50, maxIncome: 250000, mode: "online", deadline: "30-Nov-2026", url: "https://scholarships.gov.in" },
        { name: "Chief Minister's Merit Research Fellowship", minMarks: 75, maxIncome: 500000, mode: "online", deadline: "31-Aug-2026", url: "https://www.tn.gov.in" }
    ];

    const eligible = scholarships.filter(s => marks >= s.minMarks && income <= s.maxIncome);
    scholarshipContainer.innerHTML = "";

    if (eligible.length === 0) {
        scholarshipContainer.innerHTML = "<p>No matching scholarships found.</p>";
    } else {
        eligible.forEach((s, index) => {
            const card = document.createElement("div");
            card.className = "scholarship-card";
            card.style = "border: 1px solid #ddd; padding: 15px; margin-bottom: 15px; border-radius: 8px; background: #fff;";

            let actionArea = "";
            if (s.mode === "online") {
                // rel="noopener noreferrer" prevents the new tab from keeping
                // a window.opener reference back to this page (reverse tabnabbing).
                actionArea = `<a href="${s.url}" target="_blank" rel="noopener noreferrer" class="apply-btn" style="display: inline-block; background: #2ecc71; color: white; padding: 8px 15px; text-decoration: none; border-radius: 4px; font-weight: bold;">Apply Online ↗️</a>`;
            } else {
                actionArea = `
                    <button class="instruction-toggle-btn" data-target="inst-${index}" style="background: #e67e22; color: white; padding: 8px 15px; border: none; border-radius: 4px; font-weight: bold; cursor: pointer;">How to Apply</button>
                    <div id="inst-${index}" style="display: none; margin-top: 10px; padding: 10px; background: #fdf2e9; border-left: 4px solid #e67e22; font-size: 13px; color: #d35400;">
                        <strong>Step-by-Step Instructions:</strong><br>${s.instruction}
                    </div>
                `;
            }

            card.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap;">
                    <div style="flex: 1; min-width: 250px;">
                        <h3 style="margin: 0 0 5px 0; color: #2c3e50;">${s.name}</h3>
                        <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; padding: 3px 8px; border-radius: 12px; font-weight: bold; background: ${s.mode === 'online' ? '#eafaf1' : '#fef5e7'}; color: ${s.mode === 'online' ? '#2ecc71' : '#e67e22'};">
                            ${s.mode} Mode
                        </span>
                        <p style="margin: 8px 0 0 0; font-size: 12px; color: #c0392b; font-weight: bold;">⏰ Deadline: ${s.deadline}</p>
                    </div>
                    <div style="margin-top: 10px;">
                        ${actionArea}
                    </div>
                </div>
            `;
            scholarshipContainer.appendChild(card);
        });

        // Set up click handlers for the offline instruction panels
        document.querySelectorAll(".instruction-toggle-btn").forEach(btn => {
            btn.addEventListener("click", (e) => {
                // Use e.currentTarget (the button the listener is bound to)
                // instead of e.target (whatever element was actually clicked).
                const id = e.currentTarget.getAttribute("data-target");
                const panel = document.getElementById(id);
                if (panel.style.display === "none") {
                    panel.style.display = "block";
                    e.currentTarget.textContent = "Hide Instructions";
                } else {
                    panel.style.display = "none";
                    e.currentTarget.textContent = "How to Apply";
                }
            });
        });
    }
    scholarshipSection.style.display = "block";
    scholarshipSection.scrollIntoView({ behavior: "smooth" });
});