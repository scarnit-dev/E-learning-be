import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GOOGLE_MAIL,
    pass: process.env.GOOGLE_MAILER_PASSWORD
  }
});

const sendOTP = async (gmail, otp) => {
  const mailOptions = {
    from: '"Tinn Verification" <your_email@gmail.com>',
    to: gmail,
    subject: 'Your OTP Code from tinn.edu.vn',
    text: `Your OTP code is: ${otp}. It is valid for 5 minutes. Do not share this code.`,
    html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
            <div style="max-width: 600px; margin: auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); text-align: center;">
              <h2 style="color: #4CAF50;">Account Verification</h2>
              <img src="https://res.cloudinary.com/djabzzjd4/image/upload/v1744248816/INN_1_ztolh0.png" alt="tinn.edu.vn Logo" style="max-width: 150px; margin-bottom: 20px;" />
              <p>Hello,</p>
              <p>Your OTP code for verifying your account at <strong>tinn.edu.vn</strong> is:</p>
              <div style="font-size: 24px; font-weight: bold; color: #333; margin: 20px 0;">
                ${otp}
              </div>
              <p>This code is valid for <strong>5 minutes</strong>. Do not share it with anyone.</p>
              <p style="font-size: 12px; color: #888;">You received this email because you signed up on tinn.edu.vn.</p>
            </div>
          </div>
        `
  };
  const { response } = await transporter.sendMail(mailOptions);
  return response;
};

export { sendOTP };
export default transporter;
