import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import sendEmail from './sendEmail';

export default async function interpretAssessment(token: string | null, formData: { name: string, email: string, message: string, schedule: string, other: string }, req: NextApiRequest, res: NextApiResponse) {
  if (!token) {
    console.error('reCAPTCHA token is not set');
    throw new Error('reCAPTCHA token is missing');
  }

  console.log('Interpreting reCAPTCHA assessment...');
  try {
    const response = await axios.post(`https://recaptchaenterprise.googleapis.com/v1beta1/projects/tua-website/assessments?key=${process.env.RECAPTCHA_ENTERPRISE_SITE_KEY}`, {
      "event": {
        "token": token
      }
    });

    const { score } = response.data;
    console.log(`reCAPTCHA assessment score: ${score}`);

    if (score < 0.5) {
      console.log(`reCAPTCHA score too low: ${score}`);
      res.status(400).send('reCAPTCHA score too low');
      return;
    }

    console.log(`reCAPTCHA score high enough: ${score}`);
    await sendEmail(formData.name, formData.email, formData.message, formData.schedule, formData.other, token, req, res);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interpreting reCAPTCHA assessment');
  }
};