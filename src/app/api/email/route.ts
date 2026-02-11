import { NextRequest } from "next/server";

const apiKey = process.env.BREVO_API_KEY;
const sender = process.env.BREVO_SENDER;
const brevoEmail = process.env.BREVO_EMAIL;
const receiverEmail = process.env.RECIEVER_EMAIL;
const receiverName = process.env.RECIEVER_NAME;

export async function POST(req: NextRequest) {
  try {
    const { senderEmail, senderPhone, senderName, message } = await req.json();

    // 1️⃣ Validate input
    if (!senderEmail || !senderPhone || !senderName || !message) {
      return Response.json(
        { message: "All fields are required" },
        { status: 400 } 
      );
    }

    // 2️⃣ Validate env variables
    if (!apiKey || !sender || !brevoEmail || !receiverEmail) {
      return Response.json(
        { message: "Email configuration missing" },
        { status: 500 }
      );
    }

    // 3️⃣ Send Email
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": apiKey,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: {
          name: sender,
          email: brevoEmail,
        },
        to: [
          {
            email: receiverEmail,
            name: receiverName || "Anukul",
          },
        ],
        subject: `📩 New Contact Message from ${senderName}`,
        htmlContent: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:linear-gradient(135deg,#e0f2fe,#e0e7ff,#f0f9ff)">
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:linear-gradient(135deg,#e0f2fe,#e0e7ff,#f0f9ff);padding:40px 0">
    <tr>
      <td align="center">
        <table cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px;background:#ffffff;border-radius:18px;border:1px solid #bae6fd;box-shadow:0 20px 40px rgba(8,145,178,0.15)">
          
          <!-- Header -->
          <tr>
            <td style="padding:28px 28px 24px 28px;text-align:center">
              <h1 style="margin:0;font-size:28px;background:linear-gradient(90deg,#06b6d4,#3b82f6);-webkit-background-clip:text;-webkit-text-fill-color:transparent;color:#06b6d4;font-family:Arial,sans-serif">
                Anukul Electronics
              </h1>
              <p style="margin:6px 0 0 0;color:#64748b;font-size:14px;font-family:Arial,sans-serif">
                New Customer Contact Message
              </p>
            </td>
          </tr>

          <!-- Contact Information -->
          <tr>
            <td style="padding:0 28px 20px 28px">
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f8fafc;border-radius:14px;border:1px solid #e0f2fe">
                <tr>
                  <td style="padding:18px">
                    <table cellpadding="6" cellspacing="0" border="0" width="100%" style="font-size:14px;color:#0f172a;font-family:Arial,sans-serif">
                      <tr>
                        <td style="padding:6px 0;font-weight:bold;width:100px">👤 Name</td>
                        <td style="padding:6px 0">${senderName}</td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;font-weight:bold">📧 Email</td>
                        <td style="padding:6px 0">${senderEmail}</td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;font-weight:bold">📞 Phone</td>
                        <td style="padding:6px 0">${senderPhone}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message Section -->
          <tr>
            <td style="padding:0 28px 28px 28px">
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:linear-gradient(135deg,#ecfeff,#f0f9ff);border-radius:14px;border:1px solid #bae6fd">
                <tr>
                  <td style="padding:18px">
                    <h3 style="margin:0 0 10px 0;color:#0891b2;font-size:16px;font-family:Arial,sans-serif;font-weight:600">
                      💬 Customer Message
                    </h3>
                    <p style="margin:0;color:#334155;line-height:1.6;font-size:14px;font-family:Arial,sans-serif">
                      ${message}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:0 28px 28px 28px;text-align:center">
              <p style="margin:0 0 6px 0;font-size:12px;color:#64748b;font-family:Arial,sans-serif">
                This message was sent from Anukul Website
              </p>
              <p style="margin:0;font-size:12px;color:#64748b;font-family:Arial,sans-serif">
                🌐 anukul.com
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return Response.json(
        { message: "Brevo failed", error: err },
        { status: 500 }
      );
    }

    return Response.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return Response.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
