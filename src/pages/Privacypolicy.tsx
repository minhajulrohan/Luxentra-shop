import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Shield, Lock, Eye, UserCheck, FileText, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Privacy Policy | Luxentra Shop - Your Data Protection";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Read Luxentra Shop\'s Privacy Policy: learn how we collect, protect, and use your data to provide secure shopping and rewards experience.');
    }
  }, []);

  const PolicySection = ({ icon: Icon, title, children }: { icon: any; title: string; children: React.ReactNode }) => (
    <section className="mb-12 animate-fade-in">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-primary/10">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
      </div>
      <div className="text-muted-foreground leading-relaxed space-y-3">
        {children}
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-secondary/10 to-background">
      <Header />
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-primary via-primary/90 to-accent text-white py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-block p-4 bg-white/10 rounded-full mb-4 backdrop-blur-sm">
            <Shield className="w-12 h-12" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Your privacy matters to us. Learn how Luxentra Shop protects and manages your personal information.
          </p>
          <p className="mt-4 text-sm text-white/80">
            <strong>Effective Date:</strong> January 2025 | <strong>Last Updated:</strong> January 2025
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto max-w-4xl px-4 py-12">
        {/* Introduction */}
        <PolicySection icon={FileText} title="1. Introduction">
          <p>
            Welcome to <strong>Luxentra Shop</strong>, your trusted source for premium USA-imported products in Bangladesh and Vietnam. 
            At Luxentra, we not only provide high-quality products but also reward our valued customers with gifts for completing simple tasks. 
            This Privacy Policy explains how we collect, use, protect, and share your personal information when you use our website and services.
          </p>
          <p>
            By using Luxentra Shop, you agree to the terms outlined in this policy. We are committed to safeguarding your privacy and 
            ensuring transparency in how we handle your data.
          </p>
        </PolicySection>

        {/* Information We Collect */}
        <PolicySection icon={Eye} title="2. Information We Collect">
          <p>To provide our services effectively, we may collect the following types of information:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Personal Information:</strong> Name, email address, phone number, shipping address, and billing details.</li>
            <li><strong>Order Information:</strong> Purchase history, product preferences, and delivery details.</li>
            <li><strong>Task & Reward Data:</strong> Information about tasks completed and gifts earned through our rewards program.</li>
            <li><strong>Payment Information:</strong> Payment method details (processed securely through third-party payment gateways).</li>
            <li><strong>Technical Data:</strong> IP address, browser type, device information, and cookies for website functionality and analytics.</li>
          </ul>
        </PolicySection>

        {/* How We Use Your Information */}
        <PolicySection icon={UserCheck} title="3. How We Use Your Information">
          <p>Luxentra Shop uses your information for the following purposes:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Processing and delivering your orders efficiently.</li>
            <li>Managing your account and providing customer support.</li>
            <li>Administering our task-based rewards program and distributing gifts.</li>
            <li>Sending order updates, promotional offers, and personalized recommendations (with your consent).</li>
            <li>Improving our website, services, and user experience through analytics.</li>
            <li>Ensuring secure transactions and preventing fraud.</li>
            <li>Complying with legal obligations and enforcing our terms of service.</li>
          </ul>
        </PolicySection>

        {/* Cookies & Tracking */}
        <PolicySection icon={Eye} title="4. Cookies & Tracking Technologies">
          <p>
            Luxentra Shop uses cookies and similar tracking technologies to enhance your browsing experience. Cookies are small data files 
            stored on your device that help us remember your preferences, analyze website traffic, and personalize content.
          </p>
          <p>
            You can control cookie settings through your browser, but disabling cookies may affect certain website functionalities. 
            We may also use third-party analytics tools like Google Analytics to understand user behavior and improve our services.
          </p>
        </PolicySection>

        {/* Data Sharing & Security */}
        <PolicySection icon={Lock} title="5. Data Sharing & Security">
          <p>
            Your trust is important to us. <strong>Luxentra Shop will never sell, rent, or trade your personal information to third parties 
            without your explicit consent.</strong> We may share your data only in the following circumstances:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Service Providers:</strong> Trusted partners who assist with payment processing, shipping, and website hosting.</li>
            <li><strong>Legal Requirements:</strong> When required by law, regulation, or legal processes.</li>
            <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets.</li>
          </ul>
          <p className="mt-3">
            We implement industry-standard security measures, including encryption and secure servers, to protect your data from 
            unauthorized access, alteration, or disclosure.
          </p>
        </PolicySection>

        {/* Payment Information */}
        <PolicySection icon={Lock} title="6. Payment Information Security">
          <p>
            Luxentra Shop offers both <strong>online payment</strong> and <strong>Cash on Delivery (COD)</strong> options for your convenience. 
            All online payments are processed through trusted and secure third-party payment gateways that comply with international security standards.
          </p>
          <p>
            We do not store your complete credit card or bank account details on our servers. Payment information is encrypted and handled 
            by certified payment processors to ensure maximum security.
          </p>
        </PolicySection>

        {/* User Rights */}
        <PolicySection icon={UserCheck} title="7. Your Privacy Rights">
          <p>As a valued customer, you have the following rights regarding your personal data:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Access:</strong> Request a copy of the personal information we hold about you.</li>
            <li><strong>Correction:</strong> Update or correct inaccurate information in your account.</li>
            <li><strong>Deletion:</strong> Request deletion of your personal data, subject to legal and contractual obligations.</li>
            <li><strong>Opt-Out:</strong> Unsubscribe from marketing emails at any time using the link provided in our communications.</li>
            <li><strong>Data Portability:</strong> Request your data in a structured, commonly used format.</li>
          </ul>
          <p className="mt-3">
            To exercise these rights, please contact us at the email provided in the "Contact Us" section below.
          </p>
        </PolicySection>

        {/* Third-Party Services */}
        <PolicySection icon={FileText} title="8. Third-Party Services">
          <p>
            Luxentra Shop may use third-party services to enhance functionality and improve user experience. These may include:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Google Analytics:</strong> For website traffic analysis and user behavior insights.</li>
            <li><strong>Social Media Platforms:</strong> For sharing content and promotional campaigns.</li>
            <li><strong>Advertising Partners:</strong> To display relevant ads (we do not share personal data for advertising without consent).</li>
          </ul>
          <p className="mt-3">
            These third parties have their own privacy policies, and we encourage you to review them. Luxentra Shop is not responsible 
            for the privacy practices of external websites or services.
          </p>
        </PolicySection>

        {/* Children's Privacy */}
        <PolicySection icon={Shield} title="9. Children's Privacy">
          <p>
            Luxentra Shop is not intended for children under the age of 13. We do not knowingly collect personal information from children. 
            If we discover that a child has provided us with personal data, we will take immediate steps to delete it.
          </p>
          <p>
            Parents or guardians who believe their child has provided information to us should contact us immediately so we can address the matter.
          </p>
        </PolicySection>

        {/* Changes to This Policy */}
        <PolicySection icon={FileText} title="10. Changes to This Privacy Policy">
          <p>
            Luxentra Shop reserves the right to update or modify this Privacy Policy at any time to reflect changes in our practices, 
            technology, legal requirements, or business operations. Any changes will be posted on this page with an updated "Last Updated" date.
          </p>
          <p>
            We encourage you to review this Privacy Policy periodically. Continued use of our website and services after changes are posted 
            constitutes your acceptance of the updated policy.
          </p>
        </PolicySection>

        {/* Contact Us */}
        <PolicySection icon={Mail} title="11. Contact Us">
          <p>
            If you have any questions, concerns, or requests regarding this Privacy Policy or how we handle your personal information, 
            please don't hesitate to reach out to us:
          </p>
          <div className="mt-4 p-6 bg-secondary/30 rounded-lg border border-primary/10">
            <p className="font-semibold text-foreground mb-2">Luxentra Shop - Privacy Team</p>
            <p><strong>Email:</strong> privacy@luxentra.shop</p>
            <p><strong>Support:</strong> support@luxentra.shop</p>
            <p className="mt-2 text-sm">We aim to respond to all privacy-related inquiries within 3-5 business days.</p>
          </div>
        </PolicySection>

        {/* CTA Section */}
        <div className="mt-16 text-center p-8 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl border border-primary/20">
          <h3 className="text-2xl font-bold mb-4 text-foreground">Ready to Shop with Confidence?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Now that you understand how we protect your data, explore our premium products and start earning rewards today!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/">
              <Button size="lg" className="bg-gradient-to-r from-primary to-primary/90 hover:shadow-lg">
                Start Shopping
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline">
                Learn More About Us
              </Button>
            </Link>
          </div>
        </div>

        {/* SEO Hidden Content */}
        <div className="sr-only">
          <p>Luxentra Shop Privacy Policy - E-commerce Data Protection and Security</p>
          <p>Keywords: privacy policy, data protection, secure shopping, customer privacy, Bangladesh e-commerce, Vietnam online shopping, 
          COD payment privacy, reward program privacy, USA imports privacy policy</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
