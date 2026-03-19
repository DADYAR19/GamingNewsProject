import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, Github, Instagram, Mail, MapPin, Phone, ExternalLink } from 'lucide-react';
import { toast } from 'react-toastify';

const DiscordIcon = ({ className }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1887.3712-.2908a.0743.0743 0 01.0775-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1195.1011.2454.1965.3722.2908a.077.077 0 01-.0066.1277 12.2986 12.2986 0 01-1.8722.8923.0765.0765 0 00-.0416.1057c.3604.699.7719 1.3638 1.226 1.9942a.076.076 0 00.0842.0276c1.9516-.6066 3.9401-1.5218 5.9929-3.0294a.077.077 0 00.0312-.0561c.5004-5.177-.8382-9.6739-3.5493-13.6607a.061.061 0 00-.0312-.0281zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/>
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    explore: [
      { name: 'Home', path: '/' },
      { name: 'Categories', path: '/genre/action' },
      { name: 'About Us', path: '/about' },
      { name: 'Contact', path: '/contact' },
    ],
    legal: [
      { name: 'Privacy Policy', path: '#' },
      { name: 'Terms of Service', path: '#' },
      { name: 'Cookie Policy', path: '#' },
    ],
    social: [
      { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/dadyar_19', color: 'hover:text-[#E4405F]' },
      { name: 'GitHub', icon: Github, href: 'https://github.com/dadyar19', color: 'hover:text-white hover:bg-[#333]' },
      { name: 'Discord', icon: DiscordIcon, href: '#', color: 'hover:text-white hover:bg-[#5865F2]', username: 'dadyar_19' },
    ]
  };

  const handleDiscordClick = (e, username) => {
    e.preventDefault();
    navigator.clipboard.writeText(username);
    toast.success(`Discord username "${username}" copied!`, {
      icon: <DiscordIcon className="w-5 h-5 text-[#5865F2]" />,
      style: { borderRadius: '12px' }
    });
  };

  return (
    <footer className="bg-white dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800 transition-colors duration-300">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="p-2 bg-primary/10 dark:bg-primary/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Gamepad2 className="w-6 h-6 text-primary" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600 dark:from-primary dark:to-blue-400 leading-none">
                GamingNews
              </span>
            </Link>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-sm max-w-xs">
              Your ultimate destination for the latest gaming news, reviews, and insights. Stay updated with the ever-evolving world of gaming.
            </p>
            <div className="flex items-center gap-4">
              {footerLinks.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target={item.name === 'Discord' ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  onClick={(e) => item.name === 'Discord' ? handleDiscordClick(e, item.username) : null}
                  className={`p-2.5 rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 ${item.color} transition-all duration-300 hover:scale-110 flex items-center justify-center`}
                  aria-label={item.name}
                  title={item.name === 'Discord' ? `Click to copy Discord handle: ${item.username}` : item.name}
                >
                  <item.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-neutral-900 dark:text-white font-bold mb-6 text-lg">Explore</h3>
            <ul className="space-y-4">
              {footerLinks.explore.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-neutral-600 dark:text-neutral-400 hover:text-primary dark:hover:text-primary transition-colors duration-200 flex items-center gap-2 group text-sm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-neutral-900 dark:text-white font-bold mb-6 text-lg">Contact</h3>
            <ul className="space-y-4">
              <li>
                <div className="flex items-start gap-3 text-sm text-neutral-600 dark:text-neutral-400">
                  <MapPin className="w-5 h-5 text-primary shrink-0" />
                  <span>Kurdistan, Erbil</span>
                </div>
              </li>
              <li>
                <a href="mailto:dadyarfa2006@gmail.com" className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary transition-colors group">
                  <Mail className="w-5 h-5 text-primary shrink-0" />
                  <span>dadyarfa2006@gmail.com</span>
                </a>
              </li>
              <li>
                <div className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400">
                  <Phone className="w-5 h-5 text-primary shrink-0" />
                  <span>+964 750 868 6979</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter / Legal */}
          <div className="space-y-8">
            <div>
              <h3 className="text-neutral-900 dark:text-white font-bold mb-4 text-lg">Stay Informed</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                Subscribe to our newsletter for exclusive updates.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter email"
                  className="bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-neutral-900 dark:text-white"
                />
                <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg transition-colors duration-300">
                  <Mail className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div>
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-xs text-neutral-500 dark:text-neutral-500 hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-neutral-500 dark:text-neutral-500">
            © {currentYear} GamingNews. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-500">
            <span>Powered by</span>
            <a href="https://rawg.io" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center gap-1">
              RAWG API <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
