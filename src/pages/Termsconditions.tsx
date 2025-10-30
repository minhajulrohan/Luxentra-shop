import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { 
  Shield, 
  User, 
  ShoppingCart, 
  Gift, 
  Truck, 
  RefreshCcw, 
  Lock, 
  Copyright,
  AlertTriangle,
  FileText,
  Mail,
  CheckCircle
} from "lucide-react";
import ScrollToTopButton from "@/components/Button";

const TermsConditions = () => {
  useEffect(() => {
    // Update meta description for SEO
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Terms & Conditions for Luxentra Shop - Read our terms covering purchases, rewards, payments, shipping, and returns for premium USA imports."
      );
    }
  }, []);

  const PolicySection = ({ 
    icon: Icon, 
    title, 
    children 
  }: { 
    icon: any; 
    title: string; 
    children: React.ReactNode 
  }) => (
    <section className="mb-12 animate-fade-in">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
      </div>
      <div className="text-muted-foreground leading-relaxed space-y-4 pl-15">
        {children}
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary/90 to-accent py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            Terms & Conditions
          </h1>
          <p className="text-xl text-primary-foreground/90 mb-6">
            Please read these terms carefully before using Luxentra Shop
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm text-primary-foreground/80">
            <span className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Effective from: January 2025
            </span>
            <span className="hidden sm:block">•</span>
            <span className="flex items-center gap-2">
              <RefreshCcw className="w-4 h-4" />
              Last Updated: January 2025
            </span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        
        {/* 1. Introduction */}
        <PolicySection icon={Shield} title="1. Introduction">
          <p>
            Welcome to <strong>Luxentra Shop</strong>. These Terms & Conditions ("Terms") govern your use of our website and services. By accessing or using Luxentra, you agree to be bound by these Terms. If you do not agree, please discontinue use immediately.
          </p>
          <p>
            Luxentra is an e-commerce platform offering premium USA-imported products and a reward system for completing simple tasks. We operate primarily in Bangladesh and Vietnam.
          </p>
        </PolicySection>

        {/* 2. User Eligibility */}
        <PolicySection icon={User} title="2. User Eligibility">
          <p>
            To use Luxentra Shop, you must:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Be at least 18 years old or have parental/guardian consent</li>
            <li>Have the legal capacity to enter into binding contracts</li>
            <li>Provide accurate and truthful information during registration</li>
            <li>Not be prohibited from using our services under applicable laws</li>
          </ul>
          <p>
            By creating an account, you confirm that you meet these eligibility requirements.
          </p>
        </PolicySection>

        {/* 3. Account Responsibility */}
        <PolicySection icon={Lock} title="3. Account Responsibility">
          <p>
            You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Keep your password secure and not share it with others</li>
            <li>Notify us immediately of any unauthorized access or security breach</li>
            <li>Accept responsibility for all purchases and activities made through your account</li>
            <li>Ensure all account information is accurate and up-to-date</li>
          </ul>
          <p>
            Luxentra reserves the right to suspend or terminate accounts that violate these Terms or engage in fraudulent activity.
          </p>
        </PolicySection>

        {/* 4. Product Information */}
        <PolicySection icon={ShoppingCart} title="4. Product Information">
          <p>
            We strive to provide accurate product descriptions, images, and pricing. However:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Product colors may vary slightly due to screen settings</li>
            <li>We reserve the right to correct errors in pricing or descriptions</li>
            <li>Product availability is subject to change without notice</li>
            <li>All products are USA-based premium imports and are 100% original</li>
          </ul>
          <p>
            If a product is unavailable after purchase, we will notify you and offer a refund or alternative.
          </p>
        </PolicySection>

        {/* 5. Orders & Payments */}
        <PolicySection icon={ShoppingCart} title="5. Orders & Payments">
          <p>
            When you place an order on Luxentra, you agree to the following:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Payment Methods:</strong> We accept online payments and Cash on Delivery (COD)</li>
            <li><strong>Order Confirmation:</strong> You will receive an email confirming your order details</li>
            <li><strong>Payment Security:</strong> Online payments are processed through secure third-party gateways</li>
            <li><strong>COD Terms:</strong> Payment must be made in cash upon delivery to the courier</li>
            <li><strong>Order Cancellation:</strong> Orders can be cancelled before shipment by contacting support</li>
          </ul>
          <p>
            By placing an order, you authorize us to charge the specified payment method for the total order amount, including shipping fees.
          </p>
        </PolicySection>

        {/* 6. Task & Gift Rewards */}
        <PolicySection icon={Gift} title="6. Task & Gift Rewards">
          <p>
            Luxentra offers gift rewards for completing simple tasks such as app installations or surveys. The following rules apply:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Tasks must be completed fully and genuinely to qualify for rewards</li>
            <li>Rewards are subject to verification and may take 3-7 business days to process</li>
            <li>Fraudulent activity, fake completions, or abuse will result in disqualification</li>
            <li>Luxentra reserves the right to modify or discontinue reward programs at any time</li>
            <li>Rewards cannot be exchanged for cash</li>
            <li>One reward per task per user unless otherwise specified</li>
          </ul>
          <p>
            We reserve the right to refuse rewards if we detect suspicious or dishonest activity.
          </p>
        </PolicySection>

        {/* 7. Shipping & Delivery */}
        <PolicySection icon={Truck} title="7. Shipping & Delivery">
          <p>
            Luxentra delivers products to Bangladesh and Vietnam. Our shipping terms include:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Delivery Time:</strong> Typically 5-10 business days depending on location</li>
            <li><strong>Shipping Fees:</strong> Calculated at checkout based on location and order value</li>
            <li><strong>Tracking:</strong> You will receive a tracking number once your order is shipped</li>
            <li><strong>Delays:</strong> We are not responsible for delays caused by customs, weather, or courier issues</li>
            <li><strong>Undeliverable Packages:</strong> If a package is returned due to incorrect address or refusal, reshipping fees may apply</li>
          </ul>
          <p>
            Please ensure your delivery address is accurate. Luxentra is not liable for lost packages due to incorrect information.
          </p>
        </PolicySection>

        {/* 8. Returns & Refunds */}
        <PolicySection icon={RefreshCcw} title="8. Returns & Refunds">
          <p>
            We offer a <strong>7-day return policy</strong> from the date of delivery. To be eligible for a return:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>The product must be unused, in original packaging, and in resalable condition</li>
            <li>Return requests must be initiated within 7 days of delivery</li>
            <li>Proof of purchase (order number) is required</li>
            <li>Damaged or defective products will be replaced or refunded at no additional cost</li>
          </ul>
          <p className="font-semibold mt-4">
            Non-Returnable Items:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Opened or used personal care products</li>
            <li>Gift cards and promotional items</li>
            <li>Customized or personalized products</li>
          </ul>
          <p>
            Refunds will be processed within 7-14 business days after we receive and inspect the returned item.
          </p>
        </PolicySection>

        {/* 9. Privacy & Data Protection */}
        <PolicySection icon={Shield} title="9. Privacy & Data Protection">
          <p>
            Your privacy is important to us. We collect and process personal data in accordance with our <Link to="/privacy-policy" className="text-primary hover:underline font-semibold">Privacy Policy</Link>.
          </p>
          <p>
            By using Luxentra, you consent to the collection, use, and storage of your information as described in our Privacy Policy.
          </p>
        </PolicySection>

        {/* 10. Intellectual Property */}
        <PolicySection icon={Copyright} title="10. Intellectual Property">
          <p>
            All content on Luxentra Shop, including text, images, logos, graphics, and software, is owned by Luxentra or its licensors and is protected by copyright and trademark laws.
          </p>
          <p>
            You may not:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Copy, reproduce, or distribute our content without written permission</li>
            <li>Use our logos, trademarks, or branding without authorization</li>
            <li>Modify, reverse-engineer, or create derivative works from our website</li>
          </ul>
          <p>
            Unauthorized use of our intellectual property may result in legal action.
          </p>
        </PolicySection>

        {/* 11. Limitation of Liability */}
        <PolicySection icon={AlertTriangle} title="11. Limitation of Liability">
          <p>
            Luxentra Shop is provided "as is" without warranties of any kind. To the fullest extent permitted by law, Luxentra is not liable for:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Indirect, incidental, or consequential damages</li>
            <li>Errors, inaccuracies, or omissions in product information</li>
            <li>Delays or interruptions in service</li>
            <li>Loss or damage resulting from misuse of products</li>
            <li>Third-party actions or failures (payment gateways, couriers, etc.)</li>
          </ul>
          <p>
            Our total liability for any claim shall not exceed the amount you paid for the specific product or service.
          </p>
        </PolicySection>

        {/* 12. Changes to Terms */}
        <PolicySection icon={RefreshCcw} title="12. Changes to Terms">
          <p>
            Luxentra reserves the right to update or modify these Terms at any time. Changes will be posted on this page with an updated "Last Updated" date.
          </p>
          <p>
            Continued use of our website after changes are posted constitutes your acceptance of the revised Terms. We encourage you to review this page periodically.
          </p>
        </PolicySection>

        {/* 13. Contact Information */}
        <PolicySection icon={Mail} title="13. Contact Information">
          <p>
            If you have any questions, concerns, or complaints regarding these Terms & Conditions, please contact us:
          </p>
          <div className="bg-primary/5 p-6 rounded-lg mt-4">
            <p className="font-semibold text-foreground mb-2">Luxentra Shop Support</p>
            <p><strong>Email:</strong> support@luxentra.shop</p>
            <p><strong>Website:</strong> www.luxentra.shop</p>
            <p className="mt-2 text-sm">We aim to respond to all inquiries within 24-48 hours.</p>
          </div>
        </PolicySection>

        {/* 14. Acceptance */}
        <PolicySection icon={CheckCircle} title="14. Acceptance">
          <p className="font-semibold">
            By using Luxentra Shop, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions.
          </p>
          <p>
            If you do not agree with any part of these Terms, you must stop using our website and services immediately.
          </p>
          <p className="text-primary font-semibold mt-4">
            Thank you for choosing Luxentra Shop! We look forward to serving you.
          </p>
        </PolicySection>

        {/* CTA Section */}
        <div className="mt-16 p-8 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl text-center animate-fade-in">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Ready to Shop with Confidence?
          </h3>
          <p className="text-muted-foreground mb-6">
            Explore our collection of premium USA imports and start earning rewards today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Start Shopping
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center justify-center px-8 py-3 bg-background text-foreground border-2 border-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors"
            >
              Learn More About Us
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-muted py-8 px-4 mt-16">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            &copy; 2025 Luxentra Shop. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mt-4">
            <Link to="/about" className="text-sm text-primary hover:underline">
              About Us
            </Link>
            <Link to="/privacy-policy" className="text-sm text-primary hover:underline">
              Privacy Policy
            </Link>
            <Link to="/terms-conditions" className="text-sm text-primary hover:underline">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </footer>

      {/* Hidden SEO Content */}
      <div className="sr-only">
        <h2>Luxentra Shop Terms & Conditions</h2>
        <p>
          Terms covering purchases, payments, COD, rewards, shipping, returns, and refunds for premium USA-imported products in Bangladesh and Vietnam.
        </p>
      </div>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default TermsConditions;
