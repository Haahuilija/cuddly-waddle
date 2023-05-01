import interpretAssessment from './assessment';
import type { NextApiRequest, NextApiResponse } from 'next';

let token: string | undefined;

export const setRecaptchaToken = async (
  newToken: string,
  formData: { name: string, email: string, message: string, schedule: string, other: string },
  req: NextApiRequest,
  res: NextApiResponse
) => {
  token = newToken;
  await interpretAssessment(token, formData, req, res);
};

export const getRecaptchaToken = () => {
  return token;
}

export const onSubmit = (newToken: string, formData: { name: string, email: string, message: string, schedule: string, other: string }, req: NextApiRequest, res: NextApiResponse) => {
  console.log('reCAPTCHA token:', newToken);
  setRecaptchaToken(newToken, formData, req, res);
};