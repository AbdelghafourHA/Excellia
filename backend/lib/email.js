import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  family: 4,
});

// Verify connection
transporter.verify((error, success) => {
  if (error) {
    console.error("Email configuration error:", error);
  } else {
    console.log("Email server is ready to send messages");
  }
});

// Send registration confirmation to parent
export const sendParentConfirmation = async (
  parentEmail,
  parentName,
  childName,
  ageGroup
) => {
  try {
    const ageGroupText = {
      "3years": "3 Years Old",
      "4years": "4 Years Old",
      "5years": "5 Years Old",
    };

    const info = await transporter.sendMail({
      from: `"EMINORA Kindergarten" <${process.env.EMAIL_USER}>`,
      to: parentEmail,
      subject: "Registration Received - EMINORA Kindergarten",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <div style="text-align: center; padding-bottom: 20px; border-bottom: 2px solid #2b5d30;">
            <h1 style="color: #2b5d30; margin: 0;">EMINORA Kindergarten</h1>
            <p style="color: #666; margin: 5px 0 0;">Quality Montessori Education</p>
          </div>
          
          <div style="padding: 20px 0;">
            <h2 style="color: #2b5d30;">Dear ${parentName},</h2>
            <p>Thank you for registering <strong>${childName}</strong> at EMINORA Kindergarten!</p>
            
            <div style="background-color: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #2b5d30; margin-top: 0;">Registration Summary:</h3>
              <p><strong>Child's Name:</strong> ${childName}</p>
              <p><strong>Age Group:</strong> ${ageGroupText[ageGroup]}</p>
              <p><strong>Status:</strong> <span style="color: #f15a29;">Pending Review</span></p>
            </div>
            
            <p>Our team will review your application within 24-48 hours.</p>
            
            <p>If you have any questions, please don't hesitate to contact us.</p>
            
            <p>Best regards,<br><strong>EMINORA Kindergarten Team</strong></p>
          </div>
          
          <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #999;">
            <p>© 2026 EMINORA Kindergarten. All rights reserved.</p>
            <p>Shaoula, Algiers, Algeria | 0775796180</p>
          </div>
        </div>
      `,
    });

    console.log("Parent email sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending parent email:", error);
    return { success: false, error: error.message };
  }
};

// Send notification to admin about new registration
export const sendAdminNotification = async (registrationData) => {
  try {
    const { childName, parentName, email, phone, ageGroup, address, message } =
      registrationData;

    const ageGroupText = {
      "3years": "3 Years Old",
      "4years": "4 Years Old",
      "5years": "5 Years Old",
    };

    const info = await transporter.sendMail({
      from: `"EMINORA Kindergarten" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: "New Registration Request - EMINORA Kindergarten",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <div style="text-align: center; padding-bottom: 20px; border-bottom: 2px solid #2b5d30;">
            <h1 style="color: #2b5d30; margin: 0;">New Registration Alert</h1>
            <p style="color: #666; margin: 5px 0 0;">A new student has registered</p>
          </div>
          
          <div style="padding: 20px 0;">
            <h2 style="color: #2b5d30;">Registration Details:</h2>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Child's Name:</td>
                <td style="padding: 8px 0;">${childName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Parent Name:</td>
                <td style="padding: 8px 0;">${parentName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Email:</td>
                <td style="padding: 8px 0;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Phone:</td>
                <td style="padding: 8px 0;">${phone}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Age Group:</td>
                <td style="padding: 8px 0;">${ageGroupText[ageGroup]}</td>
              </tr>
              ${
                address
                  ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Address:</td>
                <td style="padding: 8px 0;">${address}</td>
              </tr>
              `
                  : ""
              }
              ${
                message
                  ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Message:</td>
                <td style="padding: 8px 0;">${message}</td>
              </tr>
              `
                  : ""
              }
            </table>
            
            <div style="margin-top: 20px; padding: 15px; background-color: #f5f5f5; border-radius: 8px;">
              <p style="margin: 0;"><strong>Action Required:</strong> Please review this registration in the admin dashboard.</p>
            </div>
            
            <div style="margin-top: 20px; text-align: center;">
              <a href="${
                process.env.FRONTEND_URL
              }/hadashboard" style="background-color: #2b5d30; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Go to Dashboard</a>
            </div>
          </div>
          
          <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #999;">
            <p>© 2026 EMINORA Kindergarten. All rights reserved.</p>
          </div>
        </div>
      `,
    });

    console.log("Admin notification sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending admin notification:", error);
    return { success: false, error: error.message };
  }
};
