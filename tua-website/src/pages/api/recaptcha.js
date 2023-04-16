const { RecaptchaEnterpriseServiceClient } = require('@google-cloud/recaptcha-enterprise');

async function verifyRecaptchaToken(req, res) {
  const { token } = req.body;
  const projectID = 'tua-website-1681296175377';
  const recaptchaSiteKey = '6Letzo8lAAAAAEV5hmLvRtKRenOEkLy8p0cgfh8A';
  const recaptchaAction = 'action-name';

  const client = new RecaptchaEnterpriseServiceClient();
  const projectPath = client.projectPath(projectID);

  const request = {
    assessment: {
      event: {
        token: token,
        siteKey: recaptchaSiteKey,
      },
    },
    // Include the following line to request an assessment in addition to the token verification
    assessmentConfig: {
      name: 'your-assessment-config-name',
      eventConfig: {
        allowAllDomains: true,
        allowlistedDomains: ['example.com'],
        riskLevelEntries: [
          {
            // Change this to reflect your desired risk threshold and corresponding action
            riskThreshold: 0.5,
            recommendedAction: 'CHALLENGE',
          },
        ],
      },
    },
    parent: projectPath,
  };

  try {
    const [response] = await client.createAssessment(request);

    if (!response.tokenProperties.valid) {
      console.log(`The CreateAssessment call failed because the token was: ${response.tokenProperties.invalidReason}`);
      res.status(400).json({ error: 'Invalid token' });
      return false;
    } else if (response.tokenProperties.action !== recaptchaAction) {
      console.log(`The action attribute in your reCAPTCHA tag does not match the action you are expecting to score`);
      res.status(400).json({ error: 'Invalid action' });
      return false;
    } else {
      console.log(`The reCAPTCHA score is: ${response.riskAnalysis.score}`);
      // Include the following line to extract the risk score from the response and include it in the JSON response
      const score = response.riskAnalysis.score;
      res.status(200).json({ score: score });
      return true;
    }
  } catch (error) {
    console.log(`Error verifying reCAPTCHA token: ${error}`);
    res.status(500).json({ error: 'Internal server error' });
    return false;
  }
}

export default verifyRecaptchaToken;
