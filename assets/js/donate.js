const GOOGLE_SHEETS_SPREADSHEET_ID = "1FxbelxYvuClXnlN5JnhgmllrmcPm5gPYeYkFi_mm0vc";
const GOOGLE_SHEETS_WEB_APP_URL = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";

// Deploy a Google Apps Script Web App bound to the spreadsheet above,
// then replace the placeholder URL with the deployed web app URL.

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#donationForm");
  const responseBox = document.querySelector("#donationResponse");
  if (!form || !responseBox) {
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    responseBox.innerHTML = "";

    if (GOOGLE_SHEETS_WEB_APP_URL.includes("YOUR_SCRIPT_ID")) {
      responseBox.innerHTML =
        '<div class="alert alert-warning">Please replace the placeholder URL in <code>assets/js/donate.js</code> with your deployed Google Apps Script Web App URL that writes to your spreadsheet.</div>';
      return;
    }

    const formData = new FormData(form);
    const payload = {
      name: formData.get("fullName")?.toString().trim() || "",
      email: formData.get("email")?.toString().trim() || "",
      amount: formData.get("donationAmount")?.toString().trim() || "",
      message: formData.get("message")?.toString().trim() || "",
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await fetch(GOOGLE_SHEETS_WEB_APP_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Submission failed (${response.status})`);
      }

      responseBox.innerHTML =
        '<div class="alert alert-success">Donation request captured. We will confirm receipt once the transfer is complete.</div>';
      form.reset();
    } catch (error) {
      responseBox.innerHTML =
        `<div class="alert alert-danger">Unable to send donation request: ${error.message}</div>`;
    }
  });
});
