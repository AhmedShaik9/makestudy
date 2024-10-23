import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class MailerService {
  async sendWelcomeEmail(
    email: string,
    subject: string,
    text: string,
    html: string,
  ): Promise<void> {
    const transporter = nodemailer.createTransport({
      host: 'smtp-mail.outlook.com',
      port: 587,
      secure: false,
      auth: {
        user: 'agents@makestudy.com',
        pass: 'Mahua@2010',
      },
    });

    const mailOptions = {
      from: 'agents@makestudy.com',
      to: email,
      subject: subject,
      text: text,
      html: html,
    };
    try {
      await transporter.sendMail(mailOptions);
      console.log('Welcome email sent successfully');
    } catch (error) {
      console.error('Error sending welcome email:', error);
    }
  }
}
