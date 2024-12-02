import React from "react";

const MerchantAboutPage = () => {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">About the Merchant</h1>
      <p className="text-base mb-4">
        Welcome to our Merchant About page. Here, you'll find important
        information about how our merchant system works and how you can leverage
        it to effectively manage your business.
      </p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">What is a Merchant?</h2>
        <p className="text-base mb-4">
          A merchant is a feature that allows you to manage and market your
          products or services through our platform. By becoming a merchant, you
          can add products, manage inventory, and handle various other aspects
          of your business.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Key Features</h2>
        <ul className="list-disc pl-6 mb-4">
          <li className="text-base mb-2">
            Add and Manage Products: Add new products, manage stock, and update
            product information.
          </li>
          <li className="text-base mb-2">
            Order Management: Monitor and manage orders received from customers.
          </li>
          <li className="text-base mb-2">
            Reports and Analytics: Access reports and analytics to make better
            business decisions.
          </li>
          <li className="text-base mb-2">
            Customer Support: Get assistance from our customer support team if
            needed.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Getting Started</h2>
        <p className="text-base mb-4">
          To get started as a merchant, you'll need to sign up and create your
          merchant profile. Once your profile is approved, you can begin adding
          products and managing your store through the merchant dashboard.
        </p>
        <p className="text-base">
          If you need help or have any questions, feel free to reach out to our
          support team.
        </p>
      </section>
    </div>
  );
};

export default MerchantAboutPage;
