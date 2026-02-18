// Wait until DOM loads
document.addEventListener("DOMContentLoaded", function () {
  // Section Switcher
  window.showSection = function (sectionId) {
    const sections = document.querySelectorAll(".section");

    sections.forEach((section) => {
      section.classList.remove("active");
    });

    const target = document.getElementById(sectionId);
    if (target) {
      target.classList.add("active");
    }
  };

  // AI Chat
  window.sendMessage = function () {
    const input = document.getElementById("chatInput");
    const chatBox = document.getElementById("chatBox");

    if (!input || !chatBox) return;

    const userText = input.value.trim();
    if (userText === "") return;

    chatBox.innerHTML += `<p><b>You:</b> ${userText}</p>`;

    const botReply = "I am here to help you with onboarding!";
    chatBox.innerHTML += `<p><b>AI:</b> ${botReply}</p>`;

    input.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;
  };

  // Admin Verification
  window.verifyDoc = function () {
    const status = document.getElementById("docStatus");
    if (status) status.innerText = "Verified";
  };

  window.rejectDoc = function () {
    const status = document.getElementById("docStatus");
    if (status) status.innerText = "Rejected";
  };

  // Modal Functions
  window.openModal = function (modalId) {
    const overlay = document.getElementById("modalOverlay");
    const modal = document.getElementById(modalId);

    if (overlay) overlay.style.display = "block";
    if (modal) modal.style.display = "block";
  };

  window.closeModal = function () {
    const overlay = document.getElementById("modalOverlay");
    if (overlay) overlay.style.display = "none";

    const modals = document.querySelectorAll(".custom-modal");
    modals.forEach((modal) => (modal.style.display = "none"));
  };

  // Progress Tracker
  function updateProgress() {
    const tasks = document.querySelectorAll(".task-card");
    const completed = document.querySelectorAll(".task-card.completed");

    const total = tasks.length;
    const done = completed.length;

    const percent = total > 0 ? Math.round((done / total) * 100) : 0;

    const completedCount = document.getElementById("completedCount");
    const totalTasks = document.getElementById("totalTasks");
    const progressPercent = document.getElementById("progressPercent");

    if (completedCount) completedCount.innerText = done;
    if (totalTasks) totalTasks.innerText = total;
    if (progressPercent) progressPercent.innerText = percent + "%";
  }

  updateProgress();

  document.querySelectorAll(".task-card").forEach((card) => {
    card.addEventListener("click", () => {
      card.classList.toggle("completed");
      updateProgress();
    });
  });
  // Document Filter
  window.filterDocs = function (status) {
    const cards = document.querySelectorAll(".doc-card");

    cards.forEach((card) => {
      if (status === "all") {
        card.style.display = "flex";
      } else {
        if (card.dataset.status === status) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      }
    });
  };

  // Document Modal
  window.openDocModal = function (docName, status) {
    const overlay = document.getElementById("modalOverlay");
    const modal = document.getElementById("docModalCustom");

    document.getElementById("modalDocTitle").innerText = docName;
    document.getElementById("modalDocStatus").innerText = "Status: " + status;

    if (overlay) overlay.style.display = "block";
    if (modal) modal.style.display = "block";
  };
  // ================= AI CHAT NEW =================

  window.quickAsk = function (question) {
    document.getElementById("chatInputNew").value = question;
    sendAIMessage();
  };

  window.sendAIMessage = function () {
    const input = document.getElementById("chatInputNew");
    const chatBox = document.getElementById("chatMessages");

    const userText = input.value.trim();
    if (userText === "") return;

    // User message
    const userMsg = document.createElement("div");
    userMsg.classList.add("message", "user-message");
    userMsg.innerText = userText;
    chatBox.appendChild(userMsg);

    input.value = "";

    // Fake AI reply logic
    let reply = "I am here to help with your onboarding 😊";

    if (userText.toLowerCase().includes("document")) {
      reply =
        "You need to submit 10th, 12th marksheets, entrance scorecard, medical certificate, ID proof and address proof.";
    } else if (userText.toLowerCase().includes("fee")) {
      reply =
        "You can pay your fees through the student portal under the Finance section.";
    } else if (userText.toLowerCase().includes("hostel")) {
      reply = "Hostel allocation deadline is 22nd March 2026.";
    } else if (userText.toLowerCase().includes("lms")) {
      reply = "You can access LMS using your registered college email ID.";
    } else if (userText.toLowerCase().includes("mentor")) {
      reply =
        "Your assigned mentor details are available in your profile section.";
    }

    setTimeout(() => {
      const aiMsg = document.createElement("div");
      aiMsg.classList.add("message", "ai-message");
      aiMsg.innerText = reply;
      chatBox.appendChild(aiMsg);

      chatBox.scrollTop = chatBox.scrollHeight;
    }, 500);
  };
  // ================= ADMIN DASHBOARD DYNAMIC BARS =================

  document.addEventListener("DOMContentLoaded", function () {
    // Animate Bar Graph (Completed vs Pending)
    const completedBar = document.querySelector(".completed-bar");
    const pendingBar = document.querySelector(".pending-bar");

    if (completedBar && pendingBar) {
      const completedWidth = completedBar.getAttribute("style").match(/\d+/)[0];
      const pendingWidth = pendingBar.getAttribute("style").match(/\d+/)[0];

      // Start from 0%
      completedBar.style.width = "0%";
      pendingBar.style.width = "0%";

      // Animate to real width
      setTimeout(() => {
        completedBar.style.transition = "width 1.2s ease-in-out";
        pendingBar.style.transition = "width 1.2s ease-in-out";

        completedBar.style.width = completedWidth + "%";
        pendingBar.style.width = pendingWidth + "%";
      }, 100);
    }

    // Animate Weekly Progress Bars
    const weekBars = document.querySelectorAll(".week-bars .day-bar");
    weekBars.forEach((bar) => {
      const targetHeight = bar.style.height;
      bar.style.height = "0%"; // start at 0

      setTimeout(() => {
        bar.style.transition = "height 1s ease-in-out";
        bar.style.height = targetHeight; // animate to original
      }, 200);
    });
  });
  // ================= WEEKLY STUDENT PROGRESS CHART =================
  const ctx = document.getElementById("weeklyChart").getContext("2d");

  const weeklyChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      datasets: [
        {
          label: "Completed Tasks",
          data: [40, 60, 50, 80, 70, 90],
          backgroundColor: "#7b2ff7",
          borderRadius: 5,
        },
        {
          label: "Pending Tasks",
          data: [60, 40, 50, 20, 30, 10],
          backgroundColor: "#ffc107",
          borderRadius: 5,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        tooltip: {
          enabled: true,
          mode: "index",
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          ticks: {
            stepSize: 20,
          },
          grid: {
            color: "#eee",
          },
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
    },
  });
  // ================= STUDENTS MANAGEMENT FILTER =================

  window.filterStudents = function () {
    const searchInput = document
      .getElementById("studentSearch")
      .value.toLowerCase();
    const statusFilter = document.getElementById("statusFilter").value;
    const rows = document.querySelectorAll(".student-row");

    rows.forEach((row) => {
      const name = row.cells[0].innerText.toLowerCase();
      const enrollment = row.cells[1].innerText.toLowerCase();
      const status = row.classList.contains("completed")
        ? "completed"
        : row.classList.contains("in-progress")
          ? "in-progress"
          : "at-risk";

      const matchesSearch =
        name.includes(searchInput) || enrollment.includes(searchInput);
      const matchesStatus = statusFilter === "all" || statusFilter === status;

      if (matchesSearch && matchesStatus) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  };

  // ================= VIEW STUDENT DETAILS =================
  window.viewStudent = function (studentName) {
    const modal = document.getElementById("studentModal");
    const overlay = document.getElementById("studentOverlay");

    const studentRows = Array.from(document.querySelectorAll(".student-row"));
    const student = studentRows.find(
      (r) => r.cells[0].innerText === studentName,
    );
    if (!student) return;

    document.getElementById("modalStudentName").innerText =
      student.cells[0].innerText;
    document.getElementById("modalEnrollment").innerText =
      student.cells[1].innerText;
    document.getElementById("modalBranch").innerText =
      student.cells[2].innerText;
    document.getElementById("modalProgress").innerText =
      student.cells[3].innerText;
    document.getElementById("modalEmail").innerText =
      student.cells[0].innerText.toLowerCase().replace(" ", ".") +
      "@student.college.edu";
    document.getElementById("modalContact").innerText = "+91-1234567890";

    modal.style.display = "block";
    overlay.style.display = "block";
  };

  window.closeStudentModal = function () {
    document.getElementById("studentModal").style.display = "none";
    document.getElementById("studentOverlay").style.display = "none";
  };
  // ================= DOCUMENT MANAGEMENT =================
  window.filterDocs = function () {
    const searchInput = document
      .getElementById("docSearch")
      .value.toLowerCase();
    const statusFilter = document.getElementById("docFilter").value;
    const rows = document.querySelectorAll(".doc-row");

    rows.forEach((row) => {
      const name = row.cells[0].innerText.toLowerCase();
      const enrollment = row.cells[1].innerText.toLowerCase();
      const docType = row.cells[2].innerText.toLowerCase();
      const status = row.classList.contains("pending")
        ? "pending"
        : row.classList.contains("verified")
          ? "verified"
          : row.classList.contains("rejected")
            ? "rejected"
            : "review";

      const matchesSearch =
        name.includes(searchInput) ||
        enrollment.includes(searchInput) ||
        docType.includes(searchInput);
      const matchesStatus = statusFilter === "all" || statusFilter === status;

      row.style.display = matchesSearch && matchesStatus ? "" : "none";
    });
  };

  // Review Modal
  window.reviewDocument = function (btn) {
    const row = btn.parentElement.parentElement;
    document.getElementById("docStudentName").innerText =
      row.cells[0].innerText;
    document.getElementById("docEnrollment").innerText = row.cells[1].innerText;
    document.getElementById("docType").innerText = row.cells[2].innerText;
    document.getElementById("docUploadDate").innerText = row.cells[3].innerText;
    document.getElementById("docFileSize").innerText = row.cells[4].innerText;

    document.getElementById("docReviewModal").style.display = "block";
    document.getElementById("docOverlay").style.display = "block";
  };

  window.closeDocModal = function () {
    document.getElementById("docReviewModal").style.display = "none";
    document.getElementById("docOverlay").style.display = "none";
  };

  // Verify, Reject, Save buttons
  window.verifyDoc = function () {
    alert("Document Verified!");
  };

  window.rejectDoc = function () {
    alert("Document Rejected!");
  };

  window.saveDoc = function () {
    alert("Changes Saved!");
  };
  // ================= ANALYSIS CHARTS =================

  // Department-wise Progress Bar Chart
  const deptCtx = document.getElementById("deptChart").getContext("2d");
  new Chart(deptCtx, {
    type: "bar",
    data: {
      labels: ["CSE", "CST", "ECE", "DS", "AI", "IT"],
      datasets: [
        {
          label: "Completed (%)",
          data: [70, 65, 80, 60, 75, 68],
          backgroundColor: "#764ba2",
        },
      ],
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          ticks: { callback: (val) => val + "%" },
        },
      },
    },
  });

  // Onboarding Status Donut Chart
  const statusCtx = document
    .getElementById("statusDonutChart")
    .getContext("2d");
  new Chart(statusCtx, {
    type: "doughnut",
    data: {
      labels: ["Completed", "Processing", "At Risk"],
      datasets: [
        {
          data: [70, 20, 10],
          backgroundColor: ["#28a745", "#2563eb", "#dc3545"],
        },
      ],
    },
    options: { responsive: true, plugins: { legend: { position: "bottom" } } },
  });

  // Monthly Enrollment vs Completion Trend Line Chart
  const trendCtx = document
    .getElementById("enrollmentTrendChart")
    .getContext("2d");
  new Chart(trendCtx, {
    type: "line",
    data: {
      labels: ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb"],
      datasets: [
        {
          label: "Enrolled Students",
          data: [50, 70, 60, 80, 90, 100],
          borderColor: "#764ba2",
          backgroundColor: "rgba(118,75,162,0.1)",
          fill: true,
        },
        {
          label: "Completed Onboarding",
          data: [20, 40, 50, 60, 70, 80],
          borderColor: "#28a745",
          backgroundColor: "rgba(40,167,69,0.1)",
          fill: true,
        },
      ],
    },
    options: { responsive: true },
  });

  // ================= TASK / RISK POPUP =================
  window.showRiskPopup = function (taskName) {
    const modal = document.getElementById("riskModal");
    const overlay = document.getElementById("riskOverlay");
    document.getElementById("riskTitle").innerText = taskName + " Risk Factor";

    const riskList = document.getElementById("riskList");
    riskList.innerHTML = ""; // reset

    const risks = [
      "Missing deadlines",
      "Incomplete documents",
      "Payment pending",
      "No LMS activity",
      "Mentor not contacted",
    ];

    risks.forEach((risk) => {
      const li = document.createElement("li");
      li.innerText = risk;
      riskList.appendChild(li);
    });

    modal.style.display = "block";
    overlay.style.display = "block";
  };

  window.closeRiskPopup = function () {
    document.getElementById("riskModal").style.display = "none";
    document.getElementById("riskOverlay").style.display = "none";
  };
});