import axios from 'axios';

interface Assessment {
  event: {
    expectedAction: string;
    hashedAccountId: string;
    siteKey: string;
    token: string;
    userAgent: string;
    userIpAddress: string;
  };
  name: string;
  riskAnalysis: {
    reasons: string[];
    score: number;
  };
  tokenProperties: {
    action: string;
    createTime: string;
    hostname: string;
    invalidReason: string;
    valid: boolean;
  };
}

async function interpretAssessment(token: string): Promise<void> {
  try {
    const response = await axios.post('/api/verify', { token });
    const assessment: Assessment = response.data;

    if (!assessment.tokenProperties.valid) {
      console.log(`reCAPTCHA failed: ${assessment.tokenProperties.invalidReason}`);
      // Show error message to user
      return;
    }

    if (assessment.riskAnalysis.score < 0.4) {
      console.log(`reCAPTCHA score too low: ${assessment.riskAnalysis.score}`);
      // Show error message to user
      return;
    }

    // Send email
    // Show success message to user
  } catch (error) {
    console.log(error);
    // Show error message to user
  }
}

export default interpretAssessment;
