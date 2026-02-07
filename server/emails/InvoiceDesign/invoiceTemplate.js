const invoiceTemplate = (payment) => {
  const amount = (payment.amount / 100).toFixed(2);
  const gst = ((payment.amount * 0.18) / 100).toFixed(2);
  const date = new Date(payment.createdAt).toLocaleDateString("en-IN");

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8" />
    <style>
      body {
        font-family: Arial, sans-serif;
        padding: 40px;
        color: #1f2937;
      }

      .header {
        text-align: center;
        border-bottom: 4px solid #16a34a;
        margin-bottom: 30px;
        padding-bottom: 10px;
      }

      .box {
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        padding: 16px;
        margin-bottom: 20px;
        background: #f9fafb;
      }

      .row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 8px;
      }

      .title {
        color: #16a34a;
        font-weight: bold;
        margin-bottom: 10px;
      }

      .total {
        text-align: right;
        font-size: 20px;
        font-weight: bold;
        color: #16a34a;
        margin-top: 10px;
      }

      .footer {
        margin-top: 40px;
        text-align: center;
        font-size: 12px;
        color: #6b7280;
      }
    </style>
  </head>

  <body>

    <div class="header">
      <h1>AI Resume Builder</h1>
      <p>Payment Invoice</p>
    </div>

    <div class="box">
      <div class="row"><span>Invoice ID:</span><span>${payment._id}</span></div>
      <div class="row"><span>Payment ID:</span><span>${payment.razorpay_payment_id}</span></div>
      <div class="row"><span>Date:</span><span>${date}</span></div>
      <div class="row"><span>Status:</span><span>PAID</span></div>
    </div>

    <div class="box">
      <div class="title">Billed To</div>
      <p>${payment.userId.name}</p>
      <p>${payment.userId.email}</p>
    </div>

    <div class="box">
      <div class="title">Plan Details</div>
      <div class="row"><span>Plan:</span><span>Monthly Premium</span></div>
      <div class="row"><span>Amount:</span><span>₹${amount}</span></div>
      <div class="row"><span>GST (18%):</span><span>₹${gst}</span></div>

      <div class="total">Total Paid: ₹${amount}</div>
    </div>

    <div class="footer">
      Thank you for using AI Resume Builder ❤️ <br/>
      support@airesume.com
    </div>

  </body>
  </html>
  `;
};

export default invoiceTemplate;
