import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  async sendWelcomeEmail(
    email: string,
    subject: string,
    text: string,
    html: string,
  ): Promise<void> {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'shabbersk3@gmail.com',
        pass: 'mexp paan kqrh dztv',
      },
    });

    const mailOptions = {
      from: 'shabbersk3@gmail.com',
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
