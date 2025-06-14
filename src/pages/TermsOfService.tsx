import React from 'react';
import StaticPageLayout from '@/components/layout/StaticPageLayout';
import LegalPageContainer from '@/components/legal/LegalPageContainer';
import LegalSection from '@/components/legal/LegalSection';

const TermsOfService = () => {
  return (
    <StaticPageLayout>
      <LegalPageContainer title="Terms of Service">
        <LegalSection title="1. Acceptance of Terms">
          <p className="text-gray-700">
            By accessing and using ScholarSphere, you accept and agree to be bound by the terms and 
            provision of this agreement. If you do not agree to abide by the above, please do not use this service.
          </p>
        </LegalSection>

        <LegalSection title="2. Use License">
          <p className="text-gray-700 mb-3">
            Permission is granted to temporarily download one copy of the materials on ScholarSphere's 
            website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>modify or copy the materials</li>
            <li>use the materials for any commercial purpose or for any public display (commercial or non-commercial)</li>
            <li>attempt to decompile or reverse engineer any software contained on ScholarSphere's website</li>
            <li>remove any copyright or other proprietary notations from the materials</li>
          </ul>
        </LegalSection>

        <LegalSection title="3. Disclaimer">
          <p className="text-gray-700">
            The materials on ScholarSphere's website are provided on an 'as is' basis. ScholarSphere makes 
            no warranties, expressed or implied, and hereby disclaims and negates all other warranties including 
            without limitation, implied warranties or conditions of merchantability, fitness for a particular 
            purpose, or non-infringement of intellectual property or other violation of rights.
          </p>
        </LegalSection>

        <LegalSection title="4. Limitations">
          <p className="text-gray-700">
            In no event shall ScholarSphere or its suppliers be liable for any damages (including, without 
            limitation, damages for loss of data or profit, or due to business interruption) arising out of 
            the use or inability to use the materials on ScholarSphere's website, even if ScholarSphere or 
            a ScholarSphere authorized representative has been notified orally or in writing of the possibility of such damage.
          </p>
        </LegalSection>

        <LegalSection title="5. Accuracy of Materials">
          <p className="text-gray-700">
            The materials appearing on ScholarSphere's website could include technical, typographical, or 
            photographic errors. ScholarSphere does not warrant that any of the materials on its website 
            are accurate, complete, or current. ScholarSphere may make changes to the materials contained 
            on its website at any time without notice.
          </p>
        </LegalSection>

        <LegalSection title="6. Links">
          <p className="text-gray-700">
            ScholarSphere has not reviewed all of the sites linked to our website and is not responsible 
            for the contents of any such linked site. The inclusion of any link does not imply endorsement 
            by ScholarSphere of the site. Use of any such linked website is at the user's own risk.
          </p>
        </LegalSection>

        <LegalSection title="7. Modifications">
          <p className="text-gray-700">
            ScholarSphere may revise these terms of service for its website at any time without notice. 
            By using this website, you are agreeing to be bound by the then current version of these terms of service.
          </p>
        </LegalSection>

        <LegalSection title="8. Governing Law">
          <p className="text-gray-700">
            These terms and conditions are governed by and construed in accordance with the laws of [Your Jurisdiction] 
            and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.
          </p>
        </LegalSection>
      </LegalPageContainer>
    </StaticPageLayout>
  );
};

export default TermsOfService;
