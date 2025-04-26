import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import logo from "../assets/UoN_CEMA_Logo.jpg";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white shadow-md text-secondary py-10 overflow-x-hidden">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo Section */}
          <div className="flex flex-col items-start">
            <a href="/" className="flex items-center">
              <img src={logo} alt="Logo" className="h-10 w-44 mr-2" />
            </a>
            <div className="mt-4 text-lg font-bold text-primary">
              Health Information System
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg text-primary mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/clients/enroll"
                  className="text-gray-900 hover:text-secondary"
                >
                  Add a client
                </a>
              </li>
              <li>
                <a
                  href="/programs/add"
                  className="text-gray-900 hover:text-secondary"
                >
                  Add a Program
                </a>
              </li>
              <li>
                <a
                  href="/clients"
                  className="text-gray-900 hover:text-secondary"
                >
                  Manage Clients
                </a>
              </li>
              <li>
                <a
                  href="/programs"
                  className="text-gray-900 hover:text-secondary"
                >
                  Manage Programs
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-semibold text-lg text-primary mb-4">
              Connect With Us
            </h4>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com"
                className="text-gray-900 hover:text-secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF size={20} />
              </a>
              <a
                href="https://www.twitter.com"
                className="text-gray-900 hover:text-secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="https://www.instagram.com"
                className="text-gray-900 hover:text-secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://www.linkedin.com"
                className="text-gray-900 hover:text-secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-300 pt-6 text-center text-gray-600 text-sm">
          © {currentYear} Center for Epidemiological Modelling and Analysis.
          University of Nairobi. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
