const GOOGLE_SHEETS_SPREADSHEET_ID = "1FxbelxYvuClXnlN5JnhgmllrmcPm5gPYeYkFi_mm0vc";
const GOOGLE_SHEETS_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyEyDGqGctY_rxzDlfRhhPzeenJTOeunue1pZQBAA4DjwLaOpYoPL9Dq19-71It2LhMZg/exec";

// Deploy Google Apps Script Web App bound to the spreadsheet above.

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
    const payload = new URLSearchParams();
    payload.append("name", formData.get("fullName")?.toString().trim() || "");
    payload.append("email", formData.get("email")?.toString().trim() || "");
    payload.append("amount", formData.get("donationAmount")?.toString().trim() || "");
    payload.append("message", formData.get("message")?.toString().trim() || "");
    payload.append("timestamp", new Date().toISOString());

    try {
      const response = await fetch(GOOGLE_SHEETS_WEB_APP_URL, {
        method: "POST",
        body: payload,
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
