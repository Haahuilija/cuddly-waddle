import { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';
import { EMAIL_TO, EMAIL_FROM } from '/Users/Saul/projects/tua-website/env';

export default async function sendEmail(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { name, email, message, schedule, other } = req.body;

  const content = `
    Name: ${name}\n
    Email: ${email}\n
    Message: ${message}\n
    Schedule: ${schedule}\n
    Other: ${other}\n
  `;

  const msg = {
    to: EMAIL_TO,
    from: EMAIL_FROM,
    subject: 'New message from tua-website',
    html: `<p>${content}</p>`,
  };

  console.log('Sending email...');
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');
    await sgMail.send(msg);
    console.log('Email sent successfully');
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error(error);
    console.log('Error sending email');
    res.status(500).send('Error sending email');
  }
}
