'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useScrollTheme } from '@/hooks/useScrollTheme';
import ScrollSection from '@/components/ScrollSection';

export default function LegalPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  useScrollTheme(containerRef);

  return (
    <main
      ref={containerRef}
      style={{ scrollSnapType: 'y mandatory', overflowY: 'scroll', height: '100vh' }}
    >
      {/* 1 — HEADER */}
      <ScrollSection theme="light" className="items-center justify-center" style={{ background: '#faf9f7' }}>
        <div className="text-center px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-[clamp(2.5rem,6vw,5rem)] text-stone-900 leading-none"
          >
            Legal
          </motion.h1>
        </div>
      </ScrollSection>

      {/* 2 — PRIVACY POLICY */}
      <ScrollSection theme="light" className="justify-start" style={{ background: '#ffffff' }}>
        <div className="w-full h-full overflow-y-auto">
          <div className="max-w-3xl mx-auto px-8 py-20">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="font-serif text-3xl text-stone-900 mb-8"
            >
              Privacy Policy
            </motion.h2>
            {/* TODO: Replace with client-supplied legal text, reviewed by solicitor */}
            <div className="space-y-6 text-sm text-stone-500 leading-relaxed">
              <p>
                <strong className="text-stone-800 font-medium">Last updated:</strong> TODO — insert date
              </p>
              <p>
                CLASSICA (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is committed to protecting your personal information. This policy explains how we collect, use, and protect data when you use our website or services.
              </p>
              <h3 className="font-medium text-stone-800 text-base pt-2">Information We Collect</h3>
              <p>
                TODO: List categories of personal data collected (name, email, phone, enquiry details, etc.)
              </p>
              <h3 className="font-medium text-stone-800 text-base pt-2">How We Use Your Information</h3>
              <p>
                TODO: Describe lawful basis and purposes for data processing.
              </p>
              <h3 className="font-medium text-stone-800 text-base pt-2">Data Retention</h3>
              <p>
                TODO: Insert retention periods.
              </p>
              <h3 className="font-medium text-stone-800 text-base pt-2">Your Rights</h3>
              <p>
                Under UK GDPR you have the right to access, rectify, and erase your personal data. TODO: Add contact details for data requests.
              </p>
              <h3 className="font-medium text-stone-800 text-base pt-2">Cookies</h3>
              <p>
                TODO: List cookies used by the site. Consider adding a cookie consent banner.
              </p>
              <h3 className="font-medium text-stone-800 text-base pt-2">Contact</h3>
              <p>
                TODO: Insert data controller contact / DPO details.
              </p>
            </div>
          </div>
        </div>
      </ScrollSection>

      {/* 3 — TERMS */}
      <ScrollSection theme="light" className="justify-start" style={{ background: '#faf9f7' }}>
        <div className="w-full h-full overflow-y-auto">
          <div className="max-w-3xl mx-auto px-8 py-20">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="font-serif text-3xl text-stone-900 mb-8"
            >
              Terms &amp; Conditions
            </motion.h2>
            {/* TODO: Replace with client-supplied T&Cs, reviewed by solicitor */}
            <div className="space-y-6 text-sm text-stone-500 leading-relaxed">
              <p>
                <strong className="text-stone-800 font-medium">Last updated:</strong> TODO — insert date
              </p>
              <p>
                By using the CLASSICA website you agree to these terms. TODO: Full terms to be supplied by client solicitor.
              </p>
              <h3 className="font-medium text-stone-800 text-base pt-2">Use of the Site</h3>
              <p>TODO: Acceptable use policy.</p>
              <h3 className="font-medium text-stone-800 text-base pt-2">Intellectual Property</h3>
              <p>TODO: Copyright and IP ownership statements.</p>
              <h3 className="font-medium text-stone-800 text-base pt-2">Disclaimers &amp; Limitation of Liability</h3>
              <p>TODO: Insert appropriate disclaimers.</p>
              <h3 className="font-medium text-stone-800 text-base pt-2">Governing Law</h3>
              <p>TODO: Jurisdiction clause — England &amp; Wales assumed.</p>
            </div>
          </div>
        </div>
      </ScrollSection>
    </main>
  );
}
