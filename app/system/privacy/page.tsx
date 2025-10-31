'use client';

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { Shield, Lock, Eye, FileText, AlertTriangle } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-desert-tan mb-2">Privacy & Compliance</h1>
          <p className="text-desert-sand">Data privacy controls and compliance management</p>
        </div>

        {/* Coming Soon Banner */}
        <div className="bg-phoenix-gradient p-12 rounded-lg text-center">
          <Shield className="w-24 h-24 text-white mx-auto mb-6 animate-pulse" />
          <h2 className="text-4xl font-bold text-white mb-4">Privacy & Compliance Center</h2>
          <p className="text-white text-xl mb-6">Coming Soon</p>
          <p className="text-white/90 max-w-2xl mx-auto">
            We&apos;re building a comprehensive privacy management system with GDPR/CCPA compliance tools,
            cookie consent management, data deletion requests, and audit logs.
          </p>
        </div>

        {/* Planned Features */}
        <DashboardCard title="Planned Features">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-patriot-darkNavy border-2 border-phoenix-coral/30 rounded-lg">
              <Lock className="w-12 h-12 text-phoenix-coral mb-4" />
              <h3 className="text-desert-tan font-bold text-lg mb-2">Cookie Consent Manager</h3>
              <p className="text-desert-sand text-sm">
                Customizable cookie banner with granular consent options for different tracking categories
              </p>
            </div>

            <div className="p-6 bg-patriot-darkNavy border-2 border-phoenix-coral/30 rounded-lg">
              <FileText className="w-12 h-12 text-phoenix-coral mb-4" />
              <h3 className="text-desert-tan font-bold text-lg mb-2">Privacy Policy Generator</h3>
              <p className="text-desert-sand text-sm">
                Auto-generate compliant privacy policies based on your enabled tracking features
              </p>
            </div>

            <div className="p-6 bg-patriot-darkNavy border-2 border-phoenix-coral/30 rounded-lg">
              <Eye className="w-12 h-12 text-phoenix-coral mb-4" />
              <h3 className="text-desert-tan font-bold text-lg mb-2">Data Access Portal</h3>
              <p className="text-desert-sand text-sm">
                Allow users to view, download, and delete their data in compliance with privacy laws
              </p>
            </div>

            <div className="p-6 bg-patriot-darkNavy border-2 border-phoenix-coral/30 rounded-lg">
              <AlertTriangle className="w-12 h-12 text-phoenix-coral mb-4" />
              <h3 className="text-desert-tan font-bold text-lg mb-2">Compliance Dashboard</h3>
              <p className="text-desert-sand text-sm">
                GDPR/CCPA compliance checklist, audit logs, and data retention policies
              </p>
            </div>
          </div>
        </DashboardCard>

        {/* Temporary Info */}
        <DashboardCard title="Current Privacy Status">
          <div className="p-6 bg-patriot-darkNavy rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-8 h-8 text-yellow-400" />
              <div>
                <p className="text-desert-tan font-bold text-lg">Privacy Controls: In Development</p>
                <p className="text-desert-sand text-sm">Full privacy management features are being built</p>
              </div>
            </div>

            <div className="space-y-3 text-sm text-desert-sand">
              <p>✅ All visitor data is hashed and anonymized</p>
              <p>✅ IP addresses are masked for storage</p>
              <p>✅ No personally identifiable information (PII) is collected without consent</p>
              <p>⏳ Cookie consent banner - Coming Soon</p>
              <p>⏳ Data deletion requests - Coming Soon</p>
              <p>⏳ Privacy policy generator - Coming Soon</p>
            </div>
          </div>
        </DashboardCard>

        {/* Contact */}
        <div className="bg-patriot-navy border-2 border-phoenix-coral rounded-lg p-6 text-center">
          <p className="text-desert-tan mb-2">Questions about privacy or data handling?</p>
          <p className="text-desert-sand text-sm">
            Contact us at <a href="mailto:privacy@patriotdisposal.com" className="text-phoenix-coral hover:underline font-bold">privacy@patriotdisposal.com</a>
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
