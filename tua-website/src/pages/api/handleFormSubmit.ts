import interpretAssessment from './assessment';
import { getRecaptchaToken, setRecaptchaToken } from './recaptcha';
import type { NextApiRequest, NextApiResponse } from 'next';

const handleFormSubmit = async (
  formData: { name: string, email: string, message: string, schedule: string, other: string },
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const token = await getRecaptchaToken(); // get the token
    setRecaptchaToken(token, formData, req, res); // set the token
    await interpretAssessment(token, formData, req, res); // use the token
    res.status(200).send('Message sent successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error sending message 3');
  }
};

export default handleFormSubmit;