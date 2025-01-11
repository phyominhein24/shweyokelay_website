const PrivacyPolicy = () => {
  return (
    <div className="mx-auto max-w-[1280px] px-4 md:px-8 py-16">
      <h1 className="text-3xl md:text-4xl font-extrabold text-primary-0 mb-12">
        Privacy Policy
      </h1>
      <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
        <section>
          <h2 className="text-2xl font-semibold text-primary-0 mb-4">
            Introduction
          </h2>
          <p className="text-sm">
            Welcome to our bus ticket booking website. Your privacy is of utmost
            importance to us. This Privacy Policy outlines how we collect, use,
            disclose, and safeguard your information when you visit our website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-primary-0 mb-4">
            Information We Collect
          </h2>
          <p className="text-sm">
            We may collect information about you in various ways, including:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>
              **Personal Information**: Name, email address, phone number,
              payment details, etc.
            </li>
            <li>
              **Usage Data**: Information about your interactions with our
              website, such as pages visited and features used.
            </li>
            <li>
              **Cookies and Tracking Technologies**: Data to enhance user
              experience and optimize our services.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-primary-0 mb-4">
            How We Use Your Information
          </h2>
          <p className="text-sm">We use the information we collect to:</p>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>Process your bookings and payments.</li>
            <li>Provide customer support.</li>
            <li>Send you updates and promotional offers.</li>
            <li>Analyze user behavior to improve our services.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-primary-0 mb-4">
            Sharing of Information
          </h2>
          <p className="text-sm">
            We do not sell or share your personal information with third
            parties, except in the following circumstances:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>When required by law or to protect legal rights.</li>
            <li>With trusted service providers who assist in operations.</li>
            <li>
              To fulfill your booking requests (e.g., with bus operators).
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-primary-0 mb-4">
            Data Security
          </h2>
          <p className="text-sm">
            We implement reasonable measures to protect your information from
            unauthorized access, disclosure, or alteration. However, no method
            of transmission over the internet is 100% secure.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-primary-0 mb-4">
            Your Choices
          </h2>
          <p className="text-sm">You have the right to:</p>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>Access and update your personal information.</li>
            <li>Opt out of receiving promotional emails.</li>
            <li>Request the deletion of your account and data.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-primary-0 mb-4">
            Changes to This Policy
          </h2>
          <p className="text-sm">
            We may update this Privacy Policy from time to time. Any changes
            will be reflected on this page with a revised date.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-primary-0 mb-4">
            Contact Us
          </h2>
          <p className="text-sm">
            If you have any questions or concerns about this Privacy Policy,
            please contact us at:
          </p>
          <p className="text-sm">
            <strong>Email:</strong> support@yourwebsite.com
          </p>
          <p className="text-sm">
            <strong>Phone:</strong> +1-234-567-890
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
