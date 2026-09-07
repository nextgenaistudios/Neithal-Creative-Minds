/**
 * Neithal Creatives — Contact Form Backend
 * ------------------------------------------------------
 * What this does:
 *   1. Receives contact form submissions from the website (as JSON).
 *   2. Appends each one as a new row in this spreadsheet.
 *   3. Emails you a notification for every new lead.
 *
 * SETUP — see README.md Step 2 for the full walkthrough:
 *   1. Change NOTIFY_EMAIL below to your real email address.
 *   2. Deploy this script as a Web App (Deploy > New deployment >
 *      type: Web app > Execute as: Me > Who has access: Anyone).
 *   3. Copy the Web App URL it gives you into js/script.js
 *      (the APPS_SCRIPT_URL constant).
 *   4. Run the "setupSheet" function once from the Apps Script editor
 *      to create the header row (see README.md for how).
 */

// ---- EDIT THIS: where lead notifications should be emailed ----
const NOTIFY_EMAIL = "your-email@gmail.com";

const SHEET_NAME = "Leads";

/**
 * Handles the POST request sent from the website's contact form.
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = getOrCreateSheet();

    sheet.appendRow([
      new Date(),
      data.name || "",
      data.email || "",
      data.phone || "",
      data.service || "",
      data.message || "",
      data.page || ""
    ]);

    sendNotificationEmail(data);

    return jsonResponse({ result: "success" });
  } catch (err) {
    return jsonResponse({ result: "error", message: err.message });
  }
}

/**
 * Lets you open the Web App URL in a browser to confirm it's live.
 */
function doGet(e) {
  return jsonResponse({ result: "ok", message: "Neithal Creatives contact API is running." });
}

/**
 * Creates the "Leads" sheet with headers if it doesn't exist yet.
 * Run this once manually from the Apps Script editor (see README.md).
 */
function setupSheet() {
  getOrCreateSheet();
}

function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(["Timestamp", "Name", "Email", "Phone", "Service", "Message", "Page"]);
    sheet.setFrozenRows(1);
  }

  return sheet;
}

function sendNotificationEmail(data) {
  const subject = "New enquiry — " + (data.name || "Website contact form");
  const body =
    "New enquiry from Neithal Creatives website:\n\n" +
    "Name: " + (data.name || "-") + "\n" +
    "Email: " + (data.email || "-") + "\n" +
    "Phone: " + (data.phone || "-") + "\n" +
    "Service: " + (data.service || "-") + "\n" +
    "Message:\n" + (data.message || "-") + "\n\n" +
    "Submitted from: " + (data.page || "-");

  MailApp.sendEmail(NOTIFY_EMAIL, subject, body);
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
