import nodemailer from 'nodemailer';
import ejs from 'ejs';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: process.env.EMAIL_USER_NAME,
    pass: process.env.EMAIL_SECRET_KEY,
  },
});

const templatePath = path.join(__dirname, '..', 'templates');

interface EmailData {
  to: string;
  subject: string;
  templateName: string;
  templateData?: any;
}
interface MailOptions {
  from: string | undefined;
  to: string;
  subject: string;
  html: any;
}

const sendEmail = async (data: EmailData): Promise<void> => {
  try {
    const { to, subject, templateName, templateData } = data;
    const emailContent = await ejs.renderFile(
      path.join(templatePath, `${templateName}.ejs`),
      templateData ? templateData : {}
    );
    const mailOptions: MailOptions = {
      from: process.env.EMAIL_USER_NAME,
      to,
      subject,
      html: emailContent,
    };
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to} with subject: ${subject}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export { sendEmail };
