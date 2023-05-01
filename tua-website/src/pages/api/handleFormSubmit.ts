import interpretAssessment from './assessment';
import { getRecaptchaToken } from './recaptcha';
import type { NextApiRequest, NextApiResponse } from 'next';

const handleFormSubmit = async (
  formData: { name: string, email: string, message: string, schedule: string, other: string },
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const token = await getRecaptchaToken();
    if (!token) {
      res.status(400).send('reCAPTCHA not verified');
      return;
    }
    await interpretAssessment(token, formData, req, res);
    res.status(200).send('Message sent successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error sending message');
  }
};

export default handleFormSubmit;