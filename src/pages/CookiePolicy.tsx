
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const CookiePolicy = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow bg-scholarly-lightGray py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl font-serif font-bold mb-8">Cookie Policy</h1>
          
          <div className="bg-white rounded-lg shadow-sm p-8 space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">What Are Cookies?</h2>
              <p className="text-gray-700">
                Cookies are small text files that are placed on your device when you visit a website. 
                They are widely used to make websites work more efficiently and to provide information 
                to website owners about how users interact with their sites.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">How We Use Cookies</h2>
              <p className="text-gray-700 mb-3">
                ScholarSphere uses cookies for several purposes:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                <li>To keep you logged in during your session</li>
                <li>To remember your preferences and settings</li>
                <li>To analyze how our website is used</li>
                <li>To improve website performance and functionality</li>
                <li>To provide personalized content and recommendations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Types of Cookies We Use</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Essential Cookies</h3>
                  <p className="text-gray-700">
                    These cookies are necessary for the website to function properly. They enable core 
                    functionality such as security, network management, and accessibility.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Functional Cookies</h3>
                  <p className="text-gray-700">
                    These cookies enable enhanced functionality and personalization, such as remembering 
                    your login details and language preferences.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Analytical Cookies</h3>
                  <p className="text-gray-700">
                    These cookies help us understand how visitors interact with our website by collecting 
                    and reporting information anonymously.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Performance Cookies</h3>
                  <p className="text-gray-700">
                    These cookies collect information about how you use our website to help us improve 
                    its performance and user experience.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Third-Party Cookies</h2>
              <p className="text-gray-700">
                We may also use third-party cookies from trusted partners for analytics, advertising, 
                and other purposes. These third parties may collect information about your online 
                activities across different websites.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Managing Your Cookie Preferences</h2>
              <p className="text-gray-700 mb-3">
                You have several options for managing cookies:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                <li>Use your browser settings to block or delete cookies</li>
                <li>Opt out of analytical cookies through our preference center</li>
                <li>Use browser extensions that block tracking cookies</li>
                <li>Set your browser to notify you when cookies are being set</li>
              </ul>
              <p className="text-gray-700 mt-3">
                Please note that disabling certain cookies may affect the functionality of our website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Browser Cookie Settings</h2>
              <p className="text-gray-700 mb-3">
                You can control cookies through your browser settings. Here are links to cookie 
                settings for popular browsers:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                <li><a href="https://support.google.com/chrome/answer/95647" className="text-scholarly-blue hover:underline" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
                <li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" className="text-scholarly-blue hover:underline" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
                <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" className="text-scholarly-blue hover:underline" target="_blank" rel="noopener noreferrer">Safari</a></li>
                <li><a href="https://support.microsoft.com/en-us/help/17442/windows-internet-explorer-delete-manage-cookies" className="text-scholarly-blue hover:underline" target="_blank" rel="noopener noreferrer">Internet Explorer</a></li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Updates to This Policy</h2>
              <p className="text-gray-700">
                We may update this cookie policy from time to time to reflect changes in technology, 
                legislation, or our practices. Please check this page periodically for updates.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
              <p className="text-gray-700">
                If you have any questions about our use of cookies, please contact us at 
                cookies@scholarsphere.com.
              </p>
            </section>

            <div className="pt-6 border-t text-sm text-gray-500">
              <p>Last updated: {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CookiePolicy;
