let token: string | null = null;

export const setRecaptchaToken = (newToken: string) => {
  token = newToken;
}

export const getRecaptchaToken = () => {
  return token;
}

export const onSubmit = (newToken: string) => {
  console.log('reCAPTCHA token:', newToken);
  setRecaptchaToken(newToken);
}