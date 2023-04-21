import { RecaptchaEnterpriseServiceClient } from '@google-cloud/recaptcha-enterprise';
import { getRecaptchaToken } from './recaptcha';

/**
 * Create an assessment to analyze the risk of an UI action.
 *
 * projectID: GCloud Project ID
 * recaptchaSiteKey: Site key obtained by registering a domain/app to use recaptcha services.
 * token: The token obtained from the client on passing the recaptchaSiteKey.
 * recaptchaAction: Action name corresponding to the token.
 */
export async function createAssessment({
    projectID = "tua-website-1681296175377",
    recaptchaSiteKey = "6Letzo8lAAAAAEV5hmLvRtKRenOEkLy8p0cgfh8A",
    token,
    recaptchaAction = "submit",
  }: {
    projectID?: string,
    recaptchaSiteKey?: string,
    token?: string | null,
    recaptchaAction?: string,
  }): Promise<number | null> {
  // Create the reCAPTCHA client & set the project path. There are multiple
  // ways to authenticate your client. For more information see:
  // https://cloud.google.com/docs/authentication
  const client = new RecaptchaEnterpriseServiceClient();
  const projectPath = client.projectPath(projectID);

  // Build the assessment request.
  const request = {
    assessment: {
      event: {
        token: getRecaptchaToken(),
        siteKey: recaptchaSiteKey,
      },
    },
    parent: projectPath,
  };

  try {
    // Call the API to create the assessment and get the response.
    const [response] = await client.createAssessment(request);

    // Check if the token is valid.
    if (!response.tokenProperties?.valid) {
      console.log("The CreateAssessment call failed because the token was: " +
        response.tokenProperties?.invalidReason);

      return null;
    }

    // Check if the expected action was executed.
    // The `action` property is set by user client in the
    // grecaptcha.enterprise.execute() method.
    if (response.tokenProperties?.action === recaptchaAction) {

      // Get the risk score and the reason(s).
      // For more information on interpreting the assessment,
      // see: https://cloud.google.com/recaptcha-enterprise/docs/interpret-assessment
      const score = response.riskAnalysis?.score ?? null;
      const reasons = response.riskAnalysis?.reasons ?? [];

      console.log("The reCAPTCHA score is: " + score);
      reasons.forEach((reason) => {
        console.log(reason);
      });

      return score;
    } else {
      console.log("The action attribute in your reCAPTCHA tag " +
        "does not match the action you are expecting to score");
      return null;
    }
  } catch (error) {
    console.error("An error occurred while creating the assessment:", error);
    return null;
  }
}
