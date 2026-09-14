/**
 * ==============================================================================
 * ADVANCING INVESTMENT 2026 - GOOGLE SHEETS REGISTRATION SYNC SCRIPT
 * ==============================================================================
 *
 * ХЭРХЭН АШИГЛАХ ВЭ (Заавар):
 * 1. Өөрийн Google Sheet-ээ нээгээд дээрх цэснээс: Extensions -> Apps Script сонгоно.
 * 2. Нээгдсэн цонхон дахь бүх кодыг арилгаад доорх кодыг бүтнээр нь хуулж (Paste) тавина.
 * 3. Баруун дээд талын Deploy -> New deployment дарна.
 * 4. "Select type" дээр "Web app"-ийг сонгоно.
 * 5. Тохиргоог дараах байдлаар тохируулна:
 *    - Execute as: "Me"
 *    - Who has access: "Anyone" (Заавал Anyone сонгоно)
 * 6. "Deploy" товч дараад эрхийг зөвшөөрнө (Authorize access).
 * ==============================================================================
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // 1. Толгой багануудыг шалгаж, анх удаа ажиллаж байвал автоматаар үүсгэнэ
    var headers = [
      "Full name",
      "Organization",
      "Job title",
      "Participation type",
      "Email",
      "Phone",
      "Investment amount (USD)",
      "Sectors of interest",
      "Additional notes",
      "Ticket number",
      "Registered at"
    ];

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(headers);
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#0F172A");
      headerRange.setFontColor("#F8FAFC");
      sheet.setFrozenRows(1);
    }

    // 2. Ирсэн өгөгдлийг задлах
    var data = {};
    if (e.parameter && e.parameter.payload) {
      data = JSON.parse(e.parameter.payload);
    } else if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter || {};
      }
    } else if (e.parameter) {
      data = e.parameter;
    }

    // 3. Таны хүссэн яг дарааллын дагуу утгуудыг авч хуваарилах
    var fullName = data.fullName || data["Full name"] || "";
    var organization = data.organization || data["Organization"] || "";
    var jobTitle = data.jobTitle || data["Job title"] || "";
    var participationType = data.participationType || data["Participation type"] || "";
    var email = data.email || data["Email"] || "";
    var phone = data.phone || data["Phone"] || "";
    var investmentAmount = data.investmentAmount || data["Investment amount (USD)"] || "";
    var sectorsOfInterest = data.sectorsOfInterest || data["Sectors of interest"] || "";
    var additionalNotes = data.additionalNotes || data["Additional notes"] || "";
    var ticketNumber = data.ticketNumber || data["Ticket number"] || "";
    var registeredAt = data.registeredAt || data["Registered at"] || new Date().toISOString();

    // 4. Мөр нэмэх (Google Sheet дээр дарааллаар нь бичнэ)
    sheet.appendRow([
      fullName,
      organization,
      jobTitle,
      participationType,
      email,
      phone,
      investmentAmount,
      sectorsOfInterest,
      additionalNotes,
      ticketNumber,
      registeredAt
    ]);

    // Багануудын өргөнийг тохируулах (эхний мөрүүдэд)
    if (sheet.getLastRow() <= 5) {
      for (var col = 1; col <= headers.length; col++) {
        sheet.autoResizeColumn(col);
      }
    }

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: "Registration saved successfully" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Тест хийхэд зориулсан GET шалгалт
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "Google Sheets Webhook is active and ready." }))
    .setMimeType(ContentService.MimeType.JSON);
}
