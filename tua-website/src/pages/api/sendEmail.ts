import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { getSecretValues } from './secrets';

export default async function sendEmail(req: NextApiRequest, res: NextApiResponse) {
  const { name, email, message, schedule, other, token } = req.body;

  // Get the email address values
  const { EMAIL_FROM, EMAIL_TO, SENDGRID_API_KEY } = await getSecretValues();

  // Verify the reCAPTCHA token
  try {
    await GoogleReCaptchaProvider(token);
  } catch (error) {
    console.error(error);
    return res.status(400).send('Invalid reCAPTCHA token');
  }

  // Create the email message
  const msg = {
    to: await EMAIL_TO,
    from: await EMAIL_FROM || 'default@example.com',
    subject: `New message from ${name} (${email})`,
    text: message,
    html: `<p>${message}</p>`,
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
    sgMail.setApiKey(await SENDGRID_API_KEY || '');
    await sgMail.send(msg);
    console.log('Email sent successfully');
    res.status(200).send('Viesti lähetetty! Otamme teihin mahdollisimman pian yhteyttä.');
  } catch (error) {
    console.error(error);
    console.log('Error sending email');
    res.status(500).send('Virhe lähettäessä viestiä.');
  }
}