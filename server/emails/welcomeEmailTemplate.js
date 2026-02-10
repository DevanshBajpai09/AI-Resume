import dotenv from 'dotenv'
dotenv.config()

const welcomeEmailTemplate = ({ name, logoUrl }) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Welcome to Resume Builder Pro</title>
</head>

<body style="margin:0;padding:0;background-color:#f3f4f6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f3f4f6;padding:20px;">
    <tr>
      <td align="center">

        <!-- MAIN CONTAINER -->
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:12px;overflow:hidden;font-family:Arial,Helvetica,sans-serif;">

          <!-- HEADER -->
          <tr>
            <td align="center" style="background-color:#4f46e5;padding:40px 20px;">
              ${
                logoUrl
                  ? `<img src="${logoUrl}" alt="Resume Builder Pro" width="80" style="display:block;margin-bottom:16px;" />`
                  : `<div style="font-size:32px;font-weight:bold;color:#ffffff;margin-bottom:16px;">RB</div>`
              }
              <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:bold;">
                Welcome to Resume Builder Pro 🎉
              </h1>
              <p style="margin:12px 0 0;color:#e0e7ff;font-size:16px;">
                Your account is now verified
              </p>
            </td>
          </tr>

          <!-- CONTENT -->
          <tr>
            <td style="padding:32px 30px;color:#1f2937;">
              <h2 style="margin-top:0;font-size:22px;">
                Hi ${name}, 👋
              </h2>

              <p style="font-size:16px;line-height:1.6;color:#374151;">
                We’re excited to have you on board! Your email has been successfully verified and you’re all set to start building professional, ATS-friendly resumes.
              </p>

              <p style="font-size:16px;line-height:1.6;color:#374151;">
                Here’s what you can do next:
              </p>

              <ul style="padding-left:20px;color:#374151;font-size:15px;line-height:1.6;">
                <li>Create your first resume in minutes</li>
                <li>Choose from professional templates</li>
                <li>Export and apply with confidence</li>
              </ul>

              <!-- CTA BUTTON -->
              <table cellpadding="0" cellspacing="0" align="center" style="margin:30px auto;">
                <tr>
                  <td align="center" style="background-color:#4f46e5;border-radius:999px;">
                    <a
                      href="${process.env.FRONTEND_URL}/app"
                      style="display:inline-block;padding:14px 36px;color:#ffffff;text-decoration:none;font-size:16px;font-weight:bold;"
                    >
                      Go to Dashboard 🚀
                    </a>
                  </td>
                </tr>
              </table>

              <p style="font-size:14px;color:#6b7280;text-align:center;">
                If you have any questions, just reply to this email — we’re happy to help.
              </p>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td align="center" style="background-color:#111827;padding:24px;color:#9ca3af;font-size:12px;">
              <p style="margin:0;">
                © ${new Date().getFullYear()} Resume Builder Pro
              </p>
              <p style="margin:6px 0 0;">
                Crafting careers, one resume at a time.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</body>
</html>
  `
}

export default welcomeEmailTemplate
