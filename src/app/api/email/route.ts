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
<div style="background:linear-gradient(135deg,#e0f2fe,#e0e7ff,#f0f9ff);padding:40px 0;">
  <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:18px;padding:28px;border:1px solid #bae6fd;box-shadow:0 20px 40px rgba(8,145,178,0.15);font-family:Segoe UI,Arial,sans-serif">
    
    <div style="text-align:center;margin-bottom:24px">
      <h1 style="margin:0;font-size:28px;background:linear-gradient(90deg,#06b6d4,#3b82f6);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">
        Anukul Electronics
      </h1>
      <p style="margin-top:6px;color:#64748b;font-size:14px">
        New Customer Contact Message
      </p>
    </div>

    <div style="background:#f8fafc;border-radius:14px;padding:18px;border:1px solid #e0f2fe;margin-bottom:20px">
      <table style="width:100%;font-size:14px;color:#0f172a">
        <tr>
          <td style="padding:6px 0;"><strong>👤 Name</strong></td>
          <td>${senderName}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;"><strong>📧 Email</strong></td>
          <td>${senderEmail}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;"><strong>📞 Phone</strong></td>
          <td>${senderPhone}</td>
        </tr>
      </table>
    </div>

    <div style="background:linear-gradient(135deg,#ecfeff,#f0f9ff);border-radius:14px;padding:18px;border:1px solid #bae6fd;">
      <h3 style="margin:0 0 10px 0;color:#0891b2;font-size:16px">
        💬 Customer Message
      </h3>
      <p style="margin:0;color:#334155;line-height:1.6;font-size:14px">
        ${message}
      </p>
    </div>

    <div style="margin-top:28px;text-align:center;font-size:12px;color:#64748b">
      <p>This message was sent from Anukul Website</p>
      <p>🌐 anukul.com</p>
    </div>

  </div>
</div>
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
