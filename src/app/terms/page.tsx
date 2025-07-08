'use client';

import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, FileText, Users, AlertTriangle, Scale } from 'lucide-react';
import Link from 'next/link';
import LegalBackground from '@/components/ui/LegalBackground';

export default function TermsOfService() {
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
                  <FileText className="h-10 w-10 text-primary-600 dark:text-primary-400" />
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-secondary-700 dark:text-primary-300 transition-colors">
                Terms of Service
              </h1>
              <p className="text-xl text-secondary-600 dark:text-secondary-300 max-w-2xl mx-auto leading-relaxed transition-colors">
                Please read these terms carefully before using our service. By using Gitify, you agree to these terms.
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
                <Users className="h-8 w-8 text-primary-600 dark:text-primary-400 mx-auto mb-3" />
                <h3 className="font-semibold text-secondary-700 dark:text-primary-300 mb-2 transition-colors">User Rights</h3>
                <p className="text-sm text-secondary-600 dark:text-secondary-300 transition-colors">Your rights and responsibilities as a user</p>
              </div>
              <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl transition-colors">
                <Scale className="h-8 w-8 text-primary-600 dark:text-primary-400 mx-auto mb-3" />
                <h3 className="font-semibold text-secondary-700 dark:text-primary-300 mb-2 transition-colors">Fair Use</h3>
                <p className="text-sm text-secondary-600 dark:text-secondary-300 transition-colors">Guidelines for acceptable use of our service</p>
              </div>
              <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl transition-colors">
                <AlertTriangle className="h-8 w-8 text-primary-600 dark:text-primary-400 mx-auto mb-3" />
                <h3 className="font-semibold text-secondary-700 dark:text-primary-300 mb-2 transition-colors">Limitations</h3>
                <p className="text-sm text-secondary-600 dark:text-secondary-300 transition-colors">Service limitations and liability terms</p>
              </div>
            </div>

            {/* Sections */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-secondary-700 dark:text-primary-300 transition-colors">Acceptance of Terms</h2>
              <div className="prose prose-secondary dark:prose-invert max-w-none">
                <p className="text-secondary-600 dark:text-secondary-300 leading-relaxed transition-colors">
                  By accessing and using Gitify, you accept and agree to be bound by the terms and provision of this agreement. 
                  If you do not agree to abide by the above, please do not use this service.
                </p>
                <p className="text-secondary-600 dark:text-secondary-300 leading-relaxed transition-colors">
                  We reserve the right to modify these terms at any time. Your continued use of the service constitutes 
                  acceptance of any changes to these terms.
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-secondary-700 dark:text-primary-300 transition-colors">Use License</h2>
              <div className="prose prose-secondary dark:prose-invert max-w-none">
                <p className="text-secondary-600 dark:text-secondary-300 leading-relaxed transition-colors">
                  Permission is granted to temporarily download one copy of Gitify for personal, non-commercial transitory viewing only. 
                  This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul className="text-secondary-600 dark:text-secondary-300 space-y-2 transition-colors">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose or for any public display</li>
                  <li>Attempt to reverse engineer any software contained on our service</li>
                  <li>Remove any copyright or other proprietary notations from the materials</li>
                </ul>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-secondary-700 dark:text-primary-300 transition-colors">User Accounts</h2>
              <div className="prose prose-secondary dark:prose-invert max-w-none">
                <p className="text-secondary-600 dark:text-secondary-300 leading-relaxed transition-colors">
                  When you create an account with us, you must provide information that is accurate, complete, and current at all times. 
                  You are responsible for safeguarding the password and for all activities that occur under your account.
                </p>
                <ul className="text-secondary-600 dark:text-secondary-300 space-y-2 transition-colors">
                  <li><strong>Account Security:</strong> You are responsible for maintaining the security of your account</li>
                  <li><strong>Accurate Information:</strong> You must provide truthful and complete information</li>
                  <li><strong>Activity Monitoring:</strong> We may monitor account activity for security purposes</li>
                  <li><strong>Account Termination:</strong> We reserve the right to terminate accounts that violate these terms</li>
                </ul>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-secondary-700 dark:text-primary-300 transition-colors">Acceptable Use</h2>
              <div className="prose prose-secondary dark:prose-invert max-w-none">
                <p className="text-secondary-600 dark:text-secondary-300 leading-relaxed transition-colors">
                  You agree not to use the service for any unlawful purposes or to conduct any unlawful activity. 
                  Prohibited activities include, but are not limited to:
                </p>
                <ul className="text-secondary-600 dark:text-secondary-300 space-y-2 transition-colors">
                  <li>Violating any applicable laws or regulations</li>
                  <li>Transmitting malicious code or compromising the security of the service</li>
                  <li>Attempting to gain unauthorized access to other users' accounts</li>
                  <li>Using the service to spam or send unsolicited messages</li>
                  <li>Interfering with the proper working of the service</li>
                </ul>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-secondary-700 dark:text-primary-300 transition-colors">Service Availability</h2>
              <div className="prose prose-secondary dark:prose-invert max-w-none">
                <p className="text-secondary-600 dark:text-secondary-300 leading-relaxed transition-colors">
                  We strive to maintain high availability of our service, but we do not guarantee uninterrupted access. 
                  Service may be temporarily unavailable due to:
                </p>
                <ul className="text-secondary-600 dark:text-secondary-300 space-y-2 transition-colors">
                  <li>Scheduled maintenance and updates</li>
                  <li>Technical issues beyond our control</li>
                  <li>Third-party service dependencies (GitHub API, etc.)</li>
                  <li>Emergency security measures</li>
                </ul>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-secondary-700 dark:text-primary-300 transition-colors">Limitation of Liability</h2>
              <p className="text-secondary-600 dark:text-secondary-300 leading-relaxed transition-colors">
                In no event shall Gitify or its suppliers be liable for any damages (including, without limitation, 
                damages for loss of data or profit, or due to business interruption) arising out of the use or inability 
                to use the service, even if Gitify or its authorized representative has been notified orally or in writing 
                of the possibility of such damage.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-secondary-700 dark:text-primary-300 transition-colors">Privacy Policy</h2>
              <p className="text-secondary-600 dark:text-secondary-300 leading-relaxed transition-colors">
                Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information 
                when you use our service. By using our service, you agree to the collection and use of information in accordance 
                with our Privacy Policy.
              </p>
              <Link href="/privacy" className="inline-block">
                <Button variant="outline" size="sm" className="mt-2">
                  Read Privacy Policy
                </Button>
              </Link>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-secondary-700 dark:text-primary-300 transition-colors">Termination</h2>
              <p className="text-secondary-600 dark:text-secondary-300 leading-relaxed transition-colors">
                We may terminate or suspend your account immediately, without prior notice or liability, for any reason 
                whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use 
                the service will cease immediately.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-secondary-700 dark:text-primary-300 transition-colors">Changes to Terms</h2>
              <p className="text-secondary-600 dark:text-secondary-300 leading-relaxed transition-colors">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
                If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-secondary-700 dark:text-primary-300 transition-colors">Contact Information</h2>
              <p className="text-secondary-600 dark:text-secondary-300 leading-relaxed transition-colors">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg transition-colors">
                <p className="text-secondary-700 dark:text-primary-300 font-medium transition-colors">
                  Email: legal@gitify.com<br />
                  Address: Agra <br />
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
