const CONTACT_GOOGLE_SHEET_WEB_APP_URL = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";

const CONTACT_GOOGLE_SHEET_ID = "1eNAqL70MDqGDoqubCn9X7AfY6jYk01mFEyoGCYSajbk";

// Replace the placeholder script URL with your deployed Google Apps Script Web App URL.

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#contactForm");
  const responseBox = document.querySelector("#contactResponse");
  if (!form || !responseBox) {
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    responseBox.innerHTML = "";

    if (CONTACT_GOOGLE_SHEET_WEB_APP_URL.includes("YOUR_SCRIPT_ID")) {
      responseBox.innerHTML =
        '<div class="alert alert-warning">Please replace the placeholder URL in <code>assets/js/contact.js</code> with your deployed Google Apps Script Web App URL that writes to your spreadsheet.</div>';
      return;
    }

    const formData = new FormData(form);
    const payload = {
      firstName: formData.get("firstName")?.toString().trim() || "",
      lastName: formData.get("lastName")?.toString().trim() || "",
      email: formData.get("email")?.toString().trim() || "",
      subject: formData.get("subject")?.toString().trim() || "",
      message: formData.get("message")?.toString().trim() || "",
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await fetch(CONTACT_GOOGLE_SHEET_WEB_APP_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Submission failed (${response.status})`);
      }

      responseBox.innerHTML =
        '<div class="alert alert-success">Your message has been captured. We will contact you soon.</div>';
      form.reset();
    } catch (error) {
      responseBox.innerHTML =
        `<div class="alert alert-danger">Unable to send your message: ${error.message}</div>`;
    }
  });
});
