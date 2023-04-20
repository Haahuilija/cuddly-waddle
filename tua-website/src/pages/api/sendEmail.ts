import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail, { MailDataRequired } from '@sendgrid/mail'; // Add MailDataRequired import
import { getSecretValues } from './secrets';

export default async function sendEmail(req: NextApiRequest, res: NextApiResponse) {
  const { name, email, message, schedule, other } = req.body;

  // Get the email address values
  const { EMAIL_FROM, EMAIL_TO, SENDGRID_API_KEY } = await getSecretValues();

  // Create the email message
  const msg: MailDataRequired = { // Use MailDataRequired instead of EmailData
    to: EMAIL_TO || 'default@example.com',
    from: EMAIL_FROM || 'default@example.com',
    subject: `New message from ${name} (${email})`,
    text: message,
    html: `<p>${message}</p>`,
    content: [] // Add empty content array
  };

  // Add schedule and other if available
  if (schedule) {
    msg.text += `\n\nSchedule:\n${schedule}`;
    msg.html += `<p>Schedule:</p><pre>${schedule}</pre>`;
  }
  if (other) {
    msg.text += `\n\nOther:\n${other}`;
    msg.html += `<p>Other:</p><pre>${other}</pre>`;
  }

  console.log('Sending email...');
  try {
    sgMail.setApiKey(SENDGRID_API_KEY || 'default');
    await sgMail.send(msg);
    console.log('Email sent successfully');
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error(error);
    console.log('Error sending email');
    res.status(500).send('Error sending email');
  }
}
