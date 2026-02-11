import { NextRequest } from "next/server";

const apiKey = process.env.BREVO_API_KEY;
const sender = process.env.BREVO_SENDER;
const brevoEmail = process.env.BREVO_EMAIL;
const receiverEmail = process.env.RECIEVER_EMAIL;
const receiverName = process.env.RECIEVER_NAME;

interface Product {
  name: string;
  imageurl: string;
  category: string;
}

export async function POST(req: NextRequest) {
  try {
    const { customerName, customerPhone, products } = await req.json();

    // 1️⃣ Validate input
    if (!customerName || !customerPhone || !products || !Array.isArray(products) || products.length === 0) {
      return Response.json(
        { message: "Customer name, phone, and at least one product are required" },
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

    // 3️⃣ Generate product list HTML (Email-client compatible)
    const productListHTML = products
      .map(
        (product: Product) => `
      <table cellpadding="0" cellspacing="0" border="0" style="width:100%;background:#ffffff;border-radius:12px;margin-bottom:12px;border:1px solid #e0f2fe">
        <tr>
          <td style="padding:16px;width:96px;vertical-align:top">
            <img src="${product.imageurl}" alt="${product.name}" width="80" height="80" style="display:block;width:80px;height:80px;max-width:80px;border:1px solid #e2e8f0;border-radius:8px;object-fit:contain" />
          </td>
          <td style="padding:16px;vertical-align:top">
            <h4 style="margin:0 0 8px 0;color:#0f172a;font-size:15px;font-weight:600">${product.name}</h4>
            <span style="background:#ecfeff;padding:4px 10px;border-radius:6px;display:inline-block;color:#0891b2;font-size:13px">
              ${product.category}
            </span>
          </td>
        </tr>
      </table>
    `
      )
      .join("");

    // 4️⃣ Send Email
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
        subject: `🛒 New Order from ${customerName}`,
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
                🎉 New Order Received
              </p>
            </td>
          </tr>

          <!-- Customer Information -->
          <tr>
            <td style="padding:0 28px 20px 28px">
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f8fafc;border-radius:14px;border:1px solid #e0f2fe">
                <tr>
                  <td style="padding:18px">
                    <h3 style="margin:0 0 12px 0;color:#0891b2;font-size:16px;font-family:Arial,sans-serif;font-weight:600">
                      👤 Customer Information
                    </h3>
                    <table cellpadding="6" cellspacing="0" border="0" width="100%" style="font-size:14px;color:#0f172a;font-family:Arial,sans-serif">
                      <tr>
                        <td style="padding:6px 0;font-weight:bold;width:100px">Name</td>
                        <td style="padding:6px 0">${customerName}</td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;font-weight:bold">📞 Phone</td>
                        <td style="padding:6px 0">${customerPhone}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Products Section -->
          <tr>
            <td style="padding:0 28px 28px 28px">
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:linear-gradient(135deg,#ecfeff,#f0f9ff);border-radius:14px;border:1px solid #bae6fd">
                <tr>
                  <td style="padding:18px">
                    <h3 style="margin:0 0 14px 0;color:#0891b2;font-size:16px;font-family:Arial,sans-serif;font-weight:600">
                      🛍️ Ordered Products (${products.length} ${products.length === 1 ? 'item' : 'items'})
                    </h3>
                    ${productListHTML}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:0 28px 28px 28px;text-align:center">
              <p style="margin:0 0 6px 0;font-size:12px;color:#64748b;font-family:Arial,sans-serif">
                This order was placed through Anukul Website
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
      { message: "Order placed successfully! We'll contact you soon." },
      { status: 200 }
    );
  } catch (error: any) {
    return Response.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}