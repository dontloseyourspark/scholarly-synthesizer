import React from 'react';
import StaticPageLayout from '@/components/layout/StaticPageLayout';
import LegalPageContainer from '@/components/legal/LegalPageContainer';
import LegalSection from '@/components/legal/LegalSection';

const PrivacyPolicy = () => {
  return (
    <StaticPageLayout>
      <LegalPageContainer title="Privacy Policy">
        <LegalSection title="1. Information We Collect">
          <p className="text-gray-700 mb-3">
            We collect information you provide directly to us, such as when you create an account, 
            contribute to discussions, or contact us. This may include:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>Name and email address</li>
            <li>Academic credentials and affiliations</li>
            <li>Contributions, comments, and insights</li>
            <li>Communication preferences</li>
          </ul>
        </LegalSection>

        <LegalSection title="2. How We Use Your Information">
          <p className="text-gray-700 mb-3">
            We use the information we collect to:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>Provide, maintain, and improve our services</li>
            <li>Verify academic credentials and expertise</li>
            <li>Enable participation in scholarly discussions</li>
            <li>Send you technical notices and updates</li>
            <li>Respond to your comments and questions</li>
          </ul>
        </LegalSection>

        <LegalSection title="3. Information Sharing">
          <p className="text-gray-700">
            We do not sell, trade, or otherwise transfer your personal information to third parties 
            without your consent, except as described in this policy. We may share information in 
            the following circumstances:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-1 mt-3">
            <li>With your consent</li>
            <li>To comply with legal obligations</li>
            <li>To protect our rights and safety</li>
            <li>In connection with a business transfer</li>
          </ul>
        </LegalSection>

        <LegalSection title="4. Data Security">
          <p className="text-gray-700">
            We implement appropriate security measures to protect your personal information against 
            unauthorized access, alteration, disclosure, or destruction. However, no method of 
            transmission over the internet is 100% secure.
          </p>
        </LegalSection>

        <LegalSection title="5. Cookies and Tracking">
          <p className="text-gray-700">
            We use cookies and similar technologies to enhance your experience, analyze usage patterns, 
            and improve our services. You can control cookie settings through your browser preferences.
          </p>
        </LegalSection>

        <LegalSection title="6. Your Rights">
          <p className="text-gray-700 mb-3">
            Depending on your location, you may have the following rights regarding your personal information:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>Access and update your information</li>
            <li>Request deletion of your data</li>
            <li>Object to processing</li>
            <li>Data portability</li>
            <li>Withdraw consent</li>
          </ul>
        </LegalSection>

        <LegalSection title="7. Children's Privacy">
          <p className="text-gray-700">
            Our services are not intended for children under 13. We do not knowingly collect 
            personal information from children under 13. If we learn that we have collected 
            such information, we will delete it promptly.
          </p>
        </LegalSection>

        <LegalSection title="8. Changes to This Policy">
          <p className="text-gray-700">
            We may update this privacy policy from time to time. We will notify you of any 
            changes by posting the new policy on this page and updating the "last updated" date.
          </p>
        </LegalSection>

        <LegalSection title="9. Contact Us">
          <p className="text-gray-700">
            If you have any questions about this privacy policy, please contact us at 
            privacy@scholarsphere.com.
          </p>
        </LegalSection>
      </LegalPageContainer>
    </StaticPageLayout>
  );
};

export default PrivacyPolicy;
