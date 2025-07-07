'use client';

import Link from 'next/link';
import { FaGithub, FaTwitter, FaLinkedin, FaDiscord } from 'react-icons/fa';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const productLinks = [
    { name: 'Dashboard', href: '/dashboard' },
    // { name: 'Pricing', href: '/pricing' },
    // { name: 'Issue Alerts', href: '/features/alerts' },
    // { name: 'Integrations', href: '/integrations' },
    // { name: 'Developer API', href: '/api/docs' },
  ];

  const resourceLinks = [
    // { name: 'Docs', href: '/docs' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    // { name: 'Pricing Policy', href: '/pricing-policy' },
    // { name: 'Refund Policy', href: '/refund-policy' },
  ];

  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/anuj123upadhyay', label: 'GitHub' },
    { icon: FaTwitter, href: 'https://twitter.com/anuj123upadhyay', label: 'Twitter' },
    { icon: FaLinkedin, href: 'https://linkedin.com/company/gitify', label: 'LinkedIn' },
    { icon: FaDiscord, href: 'https://discord.gg/gitify', label: 'Discord' },
  ];

  return (
    <footer className="bg-gray-900 dark:bg-black border-t border-gray-800 dark:border-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Section 1: Brand & Social */}
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <img src="/icon.png" alt="Gitify" className="h-11 w-12 rounded-lg" />
                  <h3 className="text-2xl font-bold text-primary-400 dark:text-primary-300 tracking-tight transition-colors">
                    Gitify
                  </h3>
                </div>
                <p className="text-secondary-300 dark:text-secondary-400 text-base leading-relaxed max-w-xs transition-colors">
                  Never miss a GitHub issue again.
                </p>
              </div>
              
              {/* Social Icons */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-secondary-400 dark:text-secondary-500 hover:text-primary-400 dark:hover:text-primary-300 transition-colors duration-200 p-2 hover:bg-gray-800 dark:hover:bg-gray-900 rounded-lg group"
                      aria-label={social.label}
                    >
                      <IconComponent className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                    </a>
                  );
                })}
              </div>

              {/* Copyright moved here */}
              <div className="pt-4 border-t border-gray-800 dark:border-gray-900">
                <p className="text-secondary-500 dark:text-secondary-600 text-sm transition-colors">
                  © {currentYear} Gitify. All rights reserved.
                </p>
              </div>
            </div>

            {/* Section 2: Products */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-primary-200 dark:text-primary-300 tracking-tight transition-colors">
                Products
              </h4>
              <ul className="space-y-3">
                {productLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-secondary-300 dark:text-secondary-400 hover:text-primary-400 dark:hover:text-primary-300 transition-colors duration-200 text-sm font-medium"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Section 3: Resources */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-primary-200 dark:text-primary-300 tracking-tight transition-colors">
                Resources
              </h4>
              <ul className="space-y-3">
                {resourceLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-secondary-300 dark:text-secondary-400 hover:text-primary-400 dark:hover:text-primary-300 transition-colors duration-200 text-sm font-medium"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Large Branding Wordmark with Enhanced Effects */}
        <div className="border-t border-gray-800 dark:border-gray-900 py-16 lg:py-24">
          <div className="text-center">
            <div className="relative inline-block">
              {/* Main Text with Top-to-Bottom Fade */}
              <h2 className="relative text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] 2xl:text-[14rem] font-bold uppercase tracking-wider bg-gradient-to-b from-primary-300 via-primary-500 to-primary-700/60 dark:from-primary-400 dark:via-primary-600 dark:to-primary-800/40 bg-clip-text text-transparent select-none transition-all duration-300 hover:scale-105">
                GITIFY
              </h2>
              
              {/* Subtle fade overlay for enhanced top-to-bottom effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900/20 dark:to-black/30 pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
