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

    // 3️⃣ Generate product list HTML
    const productListHTML = products
      .map(
        (product: Product) => `
      <div style="background:#ffffff;border-radius:12px;padding:16px;margin-bottom:12px;border:1px solid #e0f2fe;display:flex;align-items:center;gap:16px">
        <img src="${product.imageurl}" alt="${product.name}" style="width:80px;height:80px;object-fit:contain;border-radius:8px;border:1px solid #e2e8f0" />
        <div style="flex:1">
          <h4 style="margin:0 0 6px 0;color:#0f172a;font-size:15px">${product.name}</h4>
          <p style="margin:0;color:#64748b;font-size:13px">
            <span style="background:#ecfeff;padding:4px 10px;border-radius:6px;display:inline-block">
              ${product.category}
            </span>
          </p>
        </div>
      </div>
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
<div style="background:linear-gradient(135deg,#e0f2fe,#e0e7ff,#f0f9ff);padding:40px 0;">
  <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:18px;padding:28px;border:1px solid #bae6fd;box-shadow:0 20px 40px rgba(8,145,178,0.15);font-family:Segoe UI,Arial,sans-serif">
    
    <div style="text-align:center;margin-bottom:24px">
      <h1 style="margin:0;font-size:28px;background:linear-gradient(90deg,#06b6d4,#3b82f6);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">
        Anukul Electronics
      </h1>
      <p style="margin-top:6px;color:#64748b;font-size:14px">
        🎉 New Order Received
      </p>
    </div>

    <div style="background:#f8fafc;border-radius:14px;padding:18px;border:1px solid #e0f2fe;margin-bottom:20px">
      <h3 style="margin:0 0 12px 0;color:#0891b2;font-size:16px">
        👤 Customer Information
      </h3>
      <table style="width:100%;font-size:14px;color:#0f172a">
        <tr>
          <td style="padding:6px 0;"><strong>Name</strong></td>
          <td>${customerName}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;"><strong>📞 Phone</strong></td>
          <td>${customerPhone}</td>
        </tr>
      </table>
    </div>

    <div style="background:linear-gradient(135deg,#ecfeff,#f0f9ff);border-radius:14px;padding:18px;border:1px solid #bae6fd;">
      <h3 style="margin:0 0 14px 0;color:#0891b2;font-size:16px">
        🛍️ Ordered Products (${products.length} ${products.length === 1 ? 'item' : 'items'})
      </h3>
      ${productListHTML}
    </div>

    <div style="margin-top:28px;text-align:center;font-size:12px;color:#64748b">
      <p>This order was placed through Anukul Website</p>
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