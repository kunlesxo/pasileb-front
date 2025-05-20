import React from 'react';
import { 
  Instagram, 
  Facebook, 
  Twitter, 
  MessageCircle, 
  Mail, 
  Phone, 
  ChevronUp, 
  ExternalLink
} from 'lucide-react';
import pasileb from "../../assets/Pasileb img.jpg";

export default function AnimatedFooter() {
  // Social media data with links and colors
  const socialLinks = [
    { name: 'Instagram', icon: <Instagram />, color: 'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500', href: '#' },
    { name: 'Facebook', icon: <Facebook />, color: 'bg-blue-600', href: '#' },
    { name: 'Twitter', icon: <Twitter />, color: 'bg-blue-400', href: '#' },
    { name: 'WhatsApp', icon: <MessageCircle />, color: 'bg-green-500', href: '#' }
  ];

  // Contact information
  const contactInfo = [
    { type: 'Email', value: 'support@pasileb.com', icon: <Mail size={16} />, href: 'mailto:support@pasileb.com' },
    { type: 'Phone', value: '+234 (7084764672)', icon: <Phone size={16} />, href: '+234 (7084764672)' }
  ];

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer 
      className="bg-gradient-to-r from-slate-900 to-slate-800"
    >
      {/* Wave SVG divider */}
      <div className="w-full overflow-hidden leading-none">
        <svg className="relative block w-full h-12" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-slate-800"></path>
        </svg>
      </div>
      
      <div className="container mx-auto px-6 pt-4 pb-12">
        <div className="flex flex-col items-center">
          {/* Back to top button */}
          <button 
            onClick={scrollToTop}
            className="relative -top-10 p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Back to top"
          >
            <ChevronUp size={24} />
          </button>
          
          {/* Company logo and name */}
        <div className="mb-8 flex flex-col items-center">
  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white text-xl font-bold mb-2 overflow-hidden">
    <img src={pasileb} alt="Pasileb" className="w-full h-full object-cover rounded-full" />
  </div>
  <h2 className="text-2xl font-bold text-white">Pasileb</h2>
  <p className="text-gray-400 mt-1">Experience the difference</p>
</div>

          {/* Social Media Links */}
          <div className="flex justify-center space-x-4 mb-8">
            {socialLinks.map((social, index) => (
              <a 
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`relative p-3 rounded-full text-white transition-all duration-300 ${social.color} hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-white group`}
                onMouseEnter={(e) => e.currentTarget.classList.add('scale-110')}
                onMouseLeave={(e) => e.currentTarget.classList.remove('scale-110')}
                aria-label={social.name}
              >
                {social.icon}
                <span 
                  className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white text-slate-900 text-xs font-medium px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                >
                  {social.name}
                </span>
              </a>
            ))}
          </div>

          {/* Contact Information */}
          <div className="flex flex-col md:flex-row justify-center gap-6 mb-8">
            {contactInfo.map((contact, index) => (
              <a 
                key={index}
                href={contact.href}
                className="flex items-center text-gray-300 hover:text-blue-400 transition-colors duration-300 group"
              >
                <span className="inline-flex items-center justify-center mr-2 text-blue-400 group-hover:scale-110 transition-transform duration-300">
                  {contact.icon}
                </span>
                <span className="text-sm">{contact.value}</span>
                <ExternalLink size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
            ))}
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mb-8 text-sm">
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 relative group">
              About Us
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 relative group">
              Services
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 relative group">
              Terms of Service
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 relative group">
              Privacy Policy
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 relative group">
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </div>
          
          {/* Copyright */}
          <div className="mt-4 text-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} Pasileb. All rights reserved.</p>
          </div>

          {/* Animated dots */}
      <div className="relative w-full h-12 mt-6 overflow-hidden">
        <div className="dot dot1"></div>
        <div className="dot dot2"></div>
        <div className="dot dot3"></div>
        <div className="dot dot4"></div>
        <div className="dot dot5"></div>
        <div className="dot dot6"></div>
        <div className="dot dot7"></div>
        <div className="dot dot8"></div>
      </div>
        </div>
      </div>

      <style jsx>{`
        .dot {
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #3b82f6;
          opacity: 0.7;
        }
        
        .dot1 { left: 10%; animation: floatUp 3s ease-in-out infinite; animation-delay: 0.2s; }
        .dot2 { left: 20%; animation: floatUp 3s ease-in-out infinite; animation-delay: 0.7s; }
        .dot3 { left: 35%; animation: floatUp 3s ease-in-out infinite; animation-delay: 1.1s; }
        .dot4 { left: 50%; animation: floatUp 3s ease-in-out infinite; animation-delay: 0.5s; }
        .dot5 { left: 65%; animation: floatUp 3s ease-in-out infinite; animation-delay: 0.9s; }
        .dot6 { left: 75%; animation: floatUp 3s ease-in-out infinite; animation-delay: 0.3s; }
        .dot7 { left: 85%; animation: floatUp 3s ease-in-out infinite; animation-delay: 1.4s; }
        .dot8 { left: 90%; animation: floatUp 3s ease-in-out infinite; animation-delay: 0.8s; }
        
        @keyframes floatUp {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-20px) scale(1.3);
            opacity: 0.3;
          }
          100% {
            transform: translateY(-40px) scale(0.8);
            opacity: 0;
          }
        }
      `}</style>
    </footer>
  );
}