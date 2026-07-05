// ===========================================
// AI SCHOLARSHIP FINDER
// dashboard.js - Frontend User Interface Logic
// ===========================================

// -------------------------------
// DOM Element Registry
// -------------------------------
const checkEligibilityBtn = document.getElementById("checkEligibilityBtn");
const scholarshipSection = document.getElementById("scholarshipSection");
const scholarshipContainer = document.getElementById("scholarshipContainer");
const applicationSection = document.getElementById("applicationSection");
const applicationContent = document.getElementById("applicationContent");
const documentSection = document.getElementById("documentSection");
const requiredDocumentsList = document.getElementById("requiredDocumentsList");
const uploadSection = document.getElementById("uploadSection");
const reportSection = document.getElementById("reportSection");

// -------------------------------
// Local Client Scholarship Mirror (15)
// -------------------------------
const scholarships = [
    // --- STATE GOVERNMENT SCHOLARSHIPS (TAMIL NADU) ---
    {
        title: "Pudhumai Penn Scheme",
        provider: "Government of Tamil Nadu",
        amount: "₹12,000",
        minMarks: 40,
        maxIncome: 300000,
        communities: ["OC", "BC", "MBC", "SC", "ST"],
        mode: "online",
        website: "https://www.pudhumapenn.tn.gov.in",
        documents: ["Aadhaar Card", "School Bonafide Certificate (6th-12th)", "12th Marksheet", "Bank Passbook"]
    },
    {
        title: "BC/MBC/DNC Post-Matric Scholarship",
        provider: "Department of Backward Classes Welfare, TN",
        amount: "₹6,000",
        minMarks: 50,
        maxIncome: 250000,
        communities: ["BC", "MBC"],
        mode: "offline",
        office: "Apply through your College Office",
        procedure: ["Collect application form.", "Fill details correctly.", "Attach required documents.", "Submit before deadline."],
        documents: ["Aadhaar Card", "10th Marksheet", "12th Marksheet", "Income Certificate", "Community Certificate"]
    },
    {
        title: "Adi Dravidar Higher Education Special Scholarship",
        provider: "Adi Dravidar and Tribal Welfare Dept, TN",
        amount: "₹8,000",
        minMarks: 50,
        maxIncome: 250000,
        communities: ["SC", "ST"],
        mode: "offline",
        office: "Apply through your College Office",
        procedure: ["Collect application form.", "Fill details correctly.", "Attach required documents.", "Submit before deadline."],
        documents: ["Aadhaar Card", "Income Certificate", "Community Certificate", "Hostel Certificate"]
    },
    {
        title: "Chief Minister’s Merit Scholarship",
        provider: "Government of Tamil Nadu",
        amount: "₹3,000",
        minMarks: 85,
        maxIncome: 500000,
        communities: ["OC", "BC", "MBC", "SC", "ST"],
        mode: "online",
        website: "https://scholarships.gov.in",
        documents: ["Aadhaar Card", "12th Public Exam Marksheet", "College Bonafide Certificate"]
    },
    {
        title: "Tamil Nadu Educational Trust Scholarship",
        provider: "Tamil Nadu Educational Trust",
        amount: "₹10,000",
        minMarks: 60,
        maxIncome: 300000,
        communities: ["OC", "BC", "MBC", "SC", "ST"],
        mode: "offline",
        office: "Download form from trust website and submit via College Principal",
        procedure: ["Download application form online.", "Get signature/seal from College Principal.", "Mail to Trust registration address."],
        documents: ["Aadhaar Card", "12th Marksheet", "Income Certificate", "First Graduate Certificate"]
    },
    // --- CENTRAL GOVERNMENT SCHOLARSHIPS (NSP) ---
    {
        title: "Central Sector Scheme for College Students",
        provider: "Ministry of Education, Government of India",
        amount: "₹12,000",
        minMarks: 80,
        maxIncome: 450000,
        communities: ["OC", "BC", "MBC", "SC", "ST"],
        mode: "online",
        website: "https://scholarships.gov.in",
        documents: ["Aadhaar Card", "12th Marksheet", "Income Certificate", "Top-20 Percentile Certificate"]
    },
    {
        title: "Prime Minister's Scholarship Scheme (PMSS)",
        provider: "Ministry of Home Affairs, Govt of India",
        amount: "₹36,000",
        minMarks: 60,
        maxIncome: 800000,
        communities: ["OC", "BC", "MBC", "SC", "ST"],
        mode: "online",
        website: "https://scholarships.gov.in",
        documents: ["Aadhaar Card", "12th Marksheet", "Ex-Serviceman Diary/Certificate", "Bonafide Certificate"]
    },
    {
        title: "Post-Matric Scholarship Scheme for Minorities",
        provider: "Ministry of Minority Affairs, Govt of India",
        amount: "₹10,000",
        minMarks: 50,
        maxIncome: 200000,
        communities: ["OC", "BC", "MBC", "SC", "ST"],
        mode: "online",
        website: "https://scholarships.gov.in",
        documents: ["Aadhaar Card", "Previous Class Marksheet", "Self-Declaration of Minority Community", "Income Certificate"]
    },
    {
        title: "National Means Cum Merit Scholarship",
        provider: "Department of School Education & Literacy",
        amount: "₹12,000",
        minMarks: 55,
        maxIncome: 350000,
        communities: ["OC", "BC", "MBC", "SC", "ST"],
        mode: "online",
        website: "https://scholarships.gov.in",
        documents: ["Aadhaar Card", "Income Certificate", "NMMS Exam Result Scorecard"]
    },
    {
        title: "Ishan Uday Special Scholarship Scheme",
        provider: "University Grants Commission (UGC)",
        amount: "₹64,800",
        minMarks: 50,
        maxIncome: 450000,
        communities: ["OC", "BC", "MBC", "SC", "ST"],
        mode: "online",
        website: "https://scholarships.gov.in",
        documents: ["Domicile Certificate", "Income Certificate", "12th Marksheet", "College Fee Receipt"]
    },
    // --- PRIVATE & CORPORATE SCHOLARSHIPS ---
    {
        title: "HDFC Bank Parivartan’s ECSS Scholarship",
        provider: "HDFC Bank",
        amount: "₹75,000",
        minMarks: 55,
        maxIncome: 250000,
        communities: ["OC", "BC", "MBC", "SC", "ST"],
        mode: "online",
        website: "https://www.buddy4study.com",
        documents: ["Aadhaar Card", "Previous Year Marksheet", "Income Certificate", "Proof of Personal Crisis"]
    },
    {
        title: "Sitaram Jindal Foundation Scholarship",
        provider: "Sitaram Jindal Foundation",
        amount: "₹24,000",
        minMarks: 65,
        maxIncome: 250000,
        communities: ["OC", "BC", "MBC", "SC", "ST"],
        mode: "offline",
        office: "Send application form by Post to Bangalore Office",
        procedure: ["Download configuration form.", "Secure Principal recommendation stamp.", "Courier packet to Jindal Office."],
        documents: ["Aadhaar Card", "10th/12th Marksheets", "Income Certificate", "College Fee Receipt"]
    },
    {
        title: "Reliance Foundation UG Scholarship",
        provider: "Reliance Foundation",
        amount: "₹200,000",
        minMarks: 60,
        maxIncome: 1500000,
        communities: ["OC", "BC", "MBC", "SC", "ST"],
        mode: "online",
        website: "https://www.reliancefoundation.org",
        documents: ["Aadhaar Card", "12th Marksheet", "Family Income Certificate", "Passbook details"]
    },
    {
        title: "Kotak Kanya Scholarship",
        provider: "Kotak Education Foundation",
        amount: "₹150,000",
        minMarks: 85,
        maxIncome: 600000,
        communities: ["OC", "BC", "MBC", "SC", "ST"],
        mode: "online",
        website: "https://www.kotakeducation.org",
        documents: ["Aadhaar Card", "12th Marksheet", "Income Certificate", "Fee Structure Proof"]
    },
    {
        title: "Tata Capital Pankh Scholarship",
        provider: "Tata Capital",
        amount: "₹15,000",
        minMarks: 60,
        maxIncome: 400000,
        communities: ["OC", "BC", "MBC", "SC", "ST"],
        mode: "online",
        website: "https://www.buddy4study.com",
        documents: ["Aadhaar Card", "Previous Class Grade Sheet", "Income Proof", "Current Year Fee Receipt"]
    }
];

// -------------------------------
// Check Eligibility Engine Execution
// -------------------------------
checkEligibilityBtn.addEventListener("click", checkEligibility);

function checkEligibility() {
  const community = document.getElementById("community").value;
  const incomeRaw = document.getElementById("income").value;
  const marksRaw = document.getElementById("marks").value;

  if (community === "" || incomeRaw === "" || marksRaw === "") {
    alert("Please complete the student profile.");
    return;
  }

  const income = Number(incomeRaw);
  const marks = Number(marksRaw);

  if (isNaN(income) || isNaN(marks)) {
    alert("Please enter valid numbers for income and marks.");
    return;
  }

  const eligible = scholarships.filter(function (item) {
    return (
      marks >= item.minMarks &&
      income <= item.maxIncome &&
      item.communities.includes(community)
    );
  });

  displayScholarships(eligible);
}

// -------------------------------
// Display Filtered Cards Interface
// -------------------------------
function displayScholarships(list) {
  scholarshipContainer.innerHTML = "";
  scholarshipSection.style.display = "block";

  applicationSection.style.display = "none";
  documentSection.style.display = "none";
  uploadSection.style.display = "none";
  reportSection.style.display = "none";

  if (list.length === 0) {
    scholarshipContainer.innerHTML =
      '<div class="no-result">' +
        '<h3>No Eligible Scholarships Found</h3>' +
        '<p>Try changing your profile details.</p>' +
      '</div>';
    return;
  }

  list.forEach(function (scholarship, index) {
    const card = document.createElement("div");
    card.className = "scholarship-card";

    card.innerHTML =
      '<h3>' + scholarship.title + '</h3>' +
      '<p><strong>Provider :</strong> ' + scholarship.provider + '</p>' +
      '<p><strong>Amount :</strong> ' + scholarship.amount + '</p>' +
      '<button class="applyBtn" data-index="' + index + '">Apply</button>';

    scholarshipContainer.appendChild(card);
  });

  const applyButtons = document.querySelectorAll(".applyBtn");
  applyButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const scholarship = list[button.dataset.index];
      showApplication(scholarship);
    });
  });
}

// -------------------------------
// Focus Selected Application
// -------------------------------
function showApplication(scholarship) {
  applicationSection.style.display = "block";

  if (scholarship.mode === "online") {
    applicationContent.innerHTML =
      '<h3>' + scholarship.title + '</h3>' +
      '<p>This scholarship can be applied online.</p>' +
      '<a href="' + scholarship.website + '" target="_blank">' +
        '<button>Apply Now</button>' +
      '</a>';
  } else {
    let steps = "";
    scholarship.procedure.forEach(function (step) {
      steps += '<li>' + step + '</li>';
    });

    applicationContent.innerHTML =
      '<h3>' + scholarship.title + '</h3>' +
      '<p>This scholarship is applied through Offline Mode.</p>' +
      '<p><strong>Where to Apply :</strong> ' + scholarship.office + '</p>' +
      '<ol>' + steps + '</ol>';
  }

  showRequiredDocuments(scholarship);
}

// -------------------------------
// Render Checklist Requirements
// -------------------------------
function showRequiredDocuments(scholarship) {
  documentSection.style.display = "block";
  uploadSection.style.display = "block";
  requiredDocumentsList.innerHTML = "";

  scholarship.documents.forEach(function (doc) {
    const li = document.createElement("li");
    li.innerHTML = '<i class="fa-solid fa-circle-check"></i> ' + doc;
    requiredDocumentsList.appendChild(li);
  });

  uploadSection.scrollIntoView({ behavior: "smooth" });
}

// -------------------------------
// Client File Sync Verification Handling
// -------------------------------
const documentUpload = document.getElementById("documentUpload");
const uploadedFiles = document.getElementById("uploadedFiles");
const verifyBtn = document.getElementById("verifyBtn");
const verificationResult = document.getElementById("verificationResult");

documentUpload.addEventListener("change", function () {
  uploadedFiles.innerHTML = "";
  const files = documentUpload.files;

  if (files.length === 0) {
    uploadedFiles.innerHTML = "<p>No documents selected.</p>";
    return;
  }

  for (let i = 0; i < files.length; i++) {
    const div = document.createElement("div");
    div.className = "file-item";
    div.innerHTML = '<i class="fa-solid fa-file"></i> ' + files[i].name;
    uploadedFiles.appendChild(div);
  }
});

verifyBtn.addEventListener("click", verifyDocuments);

async function verifyDocuments() {
  const files = documentUpload.files;

  if (files.length === 0) {
    alert("Please upload the required documents.");
    return;
  }

  verificationResult.innerHTML = '<p><i class="fa-solid fa-spinner fa-spin"></i> Verifying documents...</p>';
  reportSection.style.display = "block";

  const formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    formData.append("documents", files[i]);
  }

  try {
    const response = await fetch("http://localhost:4000/api/upload", {
        method: "POST",
        body: formData
    });
    const data = await response.json();

    if (data.success) {
      let report = '<h3 style="color:green;">Verification Successful</h3><br>';
      if (data.mismatches.length > 0) {
        report += "<h4>Mismatch Report</h4><ul>";
        data.mismatches.forEach(function (item) {
          report += '<li>' + item + '</li>';
        });
        report += "</ul>";
      } else {
        report += '<p>No mismatch found.</p><p>All required documents verified successfully.</p>';
      }
      report += '<br><div class="privacy-message">Uploaded documents were safely wiped immediately following automated check parameters.</div>';
      verificationResult.innerHTML = report;
      documentUpload.value = "";
      uploadedFiles.innerHTML = "";
    } else {
      verificationResult.innerHTML = '<h3 style="color:red;">Verification Failed</h3><p>' + data.message + '</p>';
    }
  } catch (error) {
    console.error(error);
    verificationResult.innerHTML = '<h3 style="color:red;">Server Error</h3><p>Unable to securely interface with internal server pipelines.</p>';
  }
}