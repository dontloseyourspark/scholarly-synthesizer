import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-scholarly-lightGray border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-scholarly-blue" />
              <span className="font-serif text-xl font-bold text-scholarly-blue">ScholarSphere</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Visualizing scholarly consensus and expert insights on important topics.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://twitter.com" className="text-scholarly-gray hover:text-scholarly-blue transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="mailto:info@scholarsphere.com" className="text-scholarly-gray hover:text-scholarly-blue transition-colors">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-foreground mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-scholarly-blue transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/topics" className="text-sm text-muted-foreground hover:text-scholarly-blue transition-colors">
                  Topics
                </Link>
              </li>
              <li>
                <Link to="/contribute" className="text-sm text-muted-foreground hover:text-scholarly-blue transition-colors">
                  Contribute
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-scholarly-blue transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-foreground mb-4">Popular Topics</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/topics/climate-change" className="text-sm text-muted-foreground hover:text-scholarly-blue transition-colors">
                  Climate Change
                </Link>
              </li>
              <li>
                <Link to="/topics/artificial-intelligence" className="text-sm text-muted-foreground hover:text-scholarly-blue transition-colors">
                  Artificial Intelligence
                </Link>
              </li>
              <li>
                <Link to="/topics/vaccine-efficacy" className="text-sm text-muted-foreground hover:text-scholarly-blue transition-colors">
                  Vaccine Efficacy
                </Link>
              </li>
              <li>
                <Link to="/topics/nutrition-science" className="text-sm text-muted-foreground hover:text-scholarly-blue transition-colors">
                  Nutrition Science
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-foreground mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-sm text-muted-foreground hover:text-scholarly-blue transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-muted-foreground hover:text-scholarly-blue transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-sm text-muted-foreground hover:text-scholarly-blue transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} ScholarSphere. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
