const verifyEmailTemplate = ({ name, verifyUrl, logoUrl = null }) => {
    return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email</title>
    <style>
      /* Reset and base styles */
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
        line-height: 1.6;
        color: #333;
        background-color: #f8fafc;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      
      .email-wrapper {
        max-width: 600px;
        margin: 0 auto;
        background: #ffffff;
      }
      
      /* Header with gradient */
      .email-header {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 40px 30px 30px;
        text-align: center;
        border-radius: 0 0 20px 20px;
      }
      
      .logo-container {
        margin-bottom: 25px;
      }
      
      
      
      .header-content h1 {
        color: white;
        font-size: 28px;
        font-weight: 700;
        margin-bottom: 10px;
        letter-spacing: -0.5px;
      }
      
      .header-content p {
        color: rgba(255, 255, 255, 0.9);
        font-size: 16px;
        font-weight: 400;
      }
      
      /* Main content */
      .email-content {
        padding: 50px 40px 40px;
      }
      
      .greeting {
        font-size: 24px;
        color: #1a202c;
        margin-bottom: 20px;
        font-weight: 600;
      }
      
      .message {
        color: #4a5568;
        font-size: 16px;
        margin-bottom: 30px;
        line-height: 1.7;
      }
      
      /* Verification button */
      .verify-button-container {
        text-align: center;
        margin: 40px 0;
      }
      
      .verify-button {
        display: inline-block;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        text-decoration: none;
        padding: 18px 36px;
        border-radius: 50px;
        font-weight: 600;
        font-size: 16px;
        letter-spacing: 0.5px;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        transition: all 0.3s ease;
        min-width: 220px;
      }
      
      .verify-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
      }
      
      /* Divider */
      .divider {
        height: 1px;
        background: linear-gradient(to right, transparent, #e2e8f0, transparent);
        margin: 40px 0;
      }
      
      /* Instructions */
      .instructions {
        background: #f7fafc;
        padding: 25px;
        border-radius: 12px;
        border-left: 4px solid #667eea;
        margin-top: 30px;
      }
      
      .instructions h3 {
        color: #2d3748;
        font-size: 16px;
        margin-bottom: 12px;
        font-weight: 600;
      }
      
      .instructions ol {
        color: #4a5568;
        padding-left: 20px;
        font-size: 14px;
      }
      
      .instructions li {
        margin-bottom: 8px;
      }
      
      /* Expiry notice */
      .expiry-notice {
        text-align: center;
        color: #718096;
        font-size: 14px;
        margin-top: 30px;
        padding: 15px;
        background: #fff5f5;
        border-radius: 8px;
        border: 1px solid #fed7d7;
      }
      
      .expiry-notice strong {
        color: #c53030;
      }
      
      /* Fallback for old email clients */
      .fallback-link {
        margin-top: 20px;
        font-size: 14px;
        color: #718096;
        word-break: break-all;
        padding: 15px;
        background: #f7fafc;
        border-radius: 8px;
        border: 1px dashed #cbd5e0;
      }
      
      /* Footer */
      .email-footer {
        padding: 30px 40px;
        background: #1a202c;
        color: #a0aec0;
        text-align: center;
        border-radius: 20px 20px 0 0;
      }
      
      .social-links {
        margin-bottom: 20px;
      }
      
      .social-icon {
        display: inline-block;
        width: 36px;
        height: 36px;
        background: #2d3748;
        border-radius: 50%;
        margin: 0 8px;
        text-align: center;
        line-height: 36px;
        color: white;
        text-decoration: none;
        transition: background 0.3s ease;
      }
      
      .social-icon:hover {
        background: #4a5568;
      }
      
      .copyright {
        font-size: 12px;
        color: #718096;
        margin-top: 20px;
      }
      
      /* Responsive styles */
      @media only screen and (max-width: 600px) {
        .email-header {
          padding: 30px 20px 20px;
          border-radius: 0 0 15px 15px;
        }
        
        .header-content h1 {
          font-size: 24px;
        }
        
        .email-content {
          padding: 30px 25px;
        }
        
        .greeting {
          font-size: 20px;
        }
        
        .verify-button {
          padding: 16px 30px;
          font-size: 15px;
          width: 100%;
          text-align: center;
        }
        
        .email-footer {
          padding: 25px 20px;
          border-radius: 15px 15px 0 0;
        }
        
        .instructions {
          padding: 20px;
        }
      }
      
      @media only screen and (max-width: 480px) {
        .header-content h1 {
          font-size: 22px;
        }
        
        .email-content {
          padding: 25px 20px;
        }
        
        .logo {
          width: 70px;
          height: 70px;
        }
      }
      
      /* Dark mode support */
      @media (prefers-color-scheme: dark) {
        body {
          background-color: #1a202c;
        }
        
        .email-wrapper {
          background: #2d3748;
        }
        
        .greeting, 
        .instructions h3 {
          color: #e2e8f0;
        }
        
        .message,
        .instructions li {
          color: #cbd5e0;
        }
        
        .instructions {
          background: #4a5568;
        }
        
        .fallback-link {
          background: #4a5568;
          border-color: #718096;
        }
      }
    </style>
  </head>
  
  <body>
    <div class="email-wrapper">
      <!-- Header Section -->
      <div class="email-header">
        <div class="logo-container">
  ${logoUrl
            ? `<img
          src="${logoUrl}"
          alt="Your Company Logo"
          width="110"
          height="80"
          style="
            display: block;
            margin: 0 auto;
            border-radius: 16px;
            
          "
        />`
            : `<div
          style="
            width: 80px;
            height: 80px;
            margin: 0 auto;
            
            color: #667eea;
            
            font-size: 24px;
            font-weight: bold;
            line-height: 80px;
            text-align: center;
            
          "
        >
          LOGO
        </div>`
        }
</div>

        <div class="header-content">
          <h1>Welcome aboard! 🚀</h1>
          <p>Let's get your account verified</p>
        </div>
      </div>
      
      <!-- Main Content -->
      <div class="email-content">
        <h2 class="greeting">Hi ${name},</h2>
        
        <p class="message">
          Thank you for signing up! We're excited to have you on board. To complete your registration and access all features, please verify your email address by clicking the button below:
        </p>
        
        <!-- Verification Button -->
        <div class="verify-button-container">
          <a href="${verifyUrl}" class="verify-button">
            Verify Email Address
          </a>
        </div>
        
        <!-- Divider -->
        <div class="divider"></div>
        
        <!-- Instructions -->
        <div class="instructions">
          <h3>Need help verifying?</h3>
          <ol>
            <li>Click the "Verify Email Address" button above</li>
            <li>You'll be redirected to our verification page</li>
            <li>Your account will be activated immediately</li>
            <li>If you experience any issues, use the link below</li>
          </ol>
        </div>
        
        <!-- Fallback Link -->
        <p class="message">If the button doesn't work, copy and paste this link into your browser:</p>
        <div class="fallback-link">
          ${verifyUrl}
        </div>
        
        <!-- Expiry Notice -->
        <div class="expiry-notice">
          <strong>Note:</strong> This verification link will expire in 24 hours.
        </div>
      </div>
      
      <!-- Footer -->
      <div class="email-footer">
        <div class="social-links">
          <a href="#" class="social-icon">FB</a>
          <a href="#" class="social-icon">TW</a>
          <a href="#" class="social-icon">IN</a>
          <a href="#" class="social-icon">IG</a>
        </div>
        
        <p style="font-size: 14px; margin-bottom: 10px;">
          Questions? Contact our support team at 
          <a href="mailto:support@resume.com" style="color: #90cdf4; text-decoration: none;">
            support@yourdomain.com
          </a>
        </p>
        
        <p class="copyright">
          © ${new Date().getFullYear()} Your Company. All rights reserved.<br>
          123 Company Street, City, Country
        </p>
      </div>
    </div>
  </body>
  </html>
  `;
};

export default verifyEmailTemplate;