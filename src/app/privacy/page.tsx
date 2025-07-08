'use client';

import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Shield, Eye, Lock, Database } from 'lucide-react';
import Link from 'next/link';
import LegalBackground from '@/components/ui/LegalBackground';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-black dark:via-black dark:to-black transition-colors relative">
      <LegalBackground />
      {/* Navigation */}
      <nav className="bg-white/90 dark:bg-black/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-start items-center h-16">
            <div className="flex items-center space-x-3">
              <img src="/icon.png" alt="Gitify" className="h-12 w-12 rounded-lg" />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Gitify
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="space-y-6">
            <div className="text-left">
              <Link href="/">
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Home</span>
                </Button>
              </Link>
            </div>
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 rounded-full w-20 h-20 flex items-center justify-center transition-colors">
                  <Shield className="h-10 w-10 text-primary-600 dark:text-primary-400" />
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-secondary-700 dark:text-primary-300 transition-colors">
                Privacy Policy
              </h1>
              <p className="text-xl text-secondary-600 dark:text-secondary-300 max-w-2xl mx-auto leading-relaxed transition-colors">
                Your privacy is important to us. Learn how we collect, use, and protect your information.
              </p>
              <div className="text-sm text-secondary-500 dark:text-secondary-400 transition-colors">
                Last updated: January 7, 2025
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden transition-colors">
          <div className="p-8 lg:p-12 space-y-8">
            
            {/* Quick Overview */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl transition-colors">
                <Eye className="h-8 w-8 text-primary-600 dark:text-primary-400 mx-auto mb-3" />
                <h3 className="font-semibold text-secondary-700 dark:text-primary-300 mb-2 transition-colors">Transparency</h3>
                <p className="text-sm text-secondary-600 dark:text-secondary-300 transition-colors">We're clear about what data we collect and why</p>
              </div>
              <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl transition-colors">
                <Lock className="h-8 w-8 text-primary-600 dark:text-primary-400 mx-auto mb-3" />
                <h3 className="font-semibold text-secondary-700 dark:text-primary-300 mb-2 transition-colors">Security</h3>
                <p className="text-sm text-secondary-600 dark:text-secondary-300 transition-colors">Your data is encrypted and securely stored</p>
              </div>
              <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl transition-colors">
                <Database className="h-8 w-8 text-primary-600 dark:text-primary-400 mx-auto mb-3" />
                <h3 className="font-semibold text-secondary-700 dark:text-primary-300 mb-2 transition-colors">Control</h3>
                <p className="text-sm text-secondary-600 dark:text-secondary-300 transition-colors">You can access, update, or delete your data</p>
              </div>
            </div>

            {/* Sections */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-secondary-700 dark:text-primary-300 transition-colors">Information We Collect</h2>
              <div className="prose prose-secondary dark:prose-invert max-w-none">
                <p className="text-secondary-600 dark:text-secondary-300 leading-relaxed transition-colors">
                  We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support.
                </p>
                <ul className="text-secondary-600 dark:text-secondary-300 space-y-2 transition-colors">
                  <li><strong>Account Information:</strong> Email address, name, and GitHub profile information</li>
                  <li><strong>Repository Data:</strong> GitHub repository URLs and issue tracking preferences</li>
                  <li><strong>Usage Data:</strong> How you interact with our service for improvement purposes</li>
                  <li><strong>Device Information:</strong> Browser type, IP address, and device identifiers</li>
                </ul>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-secondary-700 dark:text-primary-300 transition-colors">How We Use Your Information</h2>
              <div className="prose prose-secondary dark:prose-invert max-w-none">
                <p className="text-secondary-600 dark:text-secondary-300 leading-relaxed transition-colors">
                  We use the information we collect to provide, maintain, and improve our services:
                </p>
                <ul className="text-secondary-600 dark:text-secondary-300 space-y-2 transition-colors">
                  <li>To create and manage your account</li>
                  <li>To track GitHub issues and send notifications</li>
                  <li>To communicate with you about our services</li>
                  <li>To analyze usage patterns and improve our platform</li>
                  <li>To detect and prevent fraud or abuse</li>
                </ul>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-secondary-700 dark:text-primary-300 transition-colors">Information Sharing</h2>
              <div className="prose prose-secondary dark:prose-invert max-w-none">
                <p className="text-secondary-600 dark:text-secondary-300 leading-relaxed transition-colors">
                  We do not sell, trade, or otherwise transfer your personal information to third parties except as described below:
                </p>
                <ul className="text-secondary-600 dark:text-secondary-300 space-y-2 transition-colors">
                  <li><strong>Service Providers:</strong> We may share information with trusted service providers who assist us</li>
                  <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                  <li><strong>Business Transfers:</strong> In the event of a merger or acquisition</li>
                </ul>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-secondary-700 dark:text-primary-300 transition-colors">Data Security</h2>
              <p className="text-secondary-600 dark:text-secondary-300 leading-relaxed transition-colors">
                We implement appropriate security measures to protect your personal information against unauthorized access, 
                alteration, disclosure, or destruction. This includes encryption of data in transit and at rest, 
                regular security audits, and access controls.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-secondary-700 dark:text-primary-300 transition-colors">Your Rights</h2>
              <div className="prose prose-secondary dark:prose-invert max-w-none">
                <p className="text-secondary-600 dark:text-secondary-300 leading-relaxed transition-colors">
                  You have the following rights regarding your personal information:
                </p>
                <ul className="text-secondary-600 dark:text-secondary-300 space-y-2 transition-colors">
                  <li><strong>Access:</strong> Request a copy of your personal data</li>
                  <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                  <li><strong>Deletion:</strong> Request deletion of your account and data</li>
                  <li><strong>Portability:</strong> Export your data in a machine-readable format</li>
                  <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                </ul>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-secondary-700 dark:text-primary-300 transition-colors">Contact Us</h2>
              <p className="text-secondary-600 dark:text-secondary-300 leading-relaxed transition-colors">
                If you have any questions about this Privacy Policy or our data practices, please contact us at:
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg transition-colors">
                <p className="text-secondary-700 dark:text-primary-300 font-medium transition-colors">
                  Email: privacy@gitify.com<br />
                  Address: Agra<br />
                  Phone: +91 12345 67890
                </p>
              </div>
            </section>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
