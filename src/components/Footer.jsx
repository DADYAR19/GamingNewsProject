import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, Github, Twitter, Youtube, Mail, MapPin, Phone, ExternalLink } from 'lucide-react';

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
      { name: 'Twitter', icon: Twitter, href: 'https://twitter.com', color: 'hover:text-[#1DA1F2]' },
      { name: 'YouTube', icon: Youtube, href: 'https://youtube.com', color: 'hover:text-[#FF0000]' },
      { name: 'GitHub', icon: Github, href: 'https://github.com', color: 'hover:text-[#333]' },
    ]
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
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 ${item.color} transition-all duration-300 hover:scale-110`}
                  aria-label={item.name}
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
