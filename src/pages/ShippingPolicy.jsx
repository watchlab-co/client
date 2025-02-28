import React from 'react';

const ShippingPolicy = () => {
  return (
    <div className="max-w-3xl mx-auto my-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Shipping Policy</h1>
      
      <h2 className="text-lg font-semibold mt-4">📦 Shipping Time</h2>
      <p>Orders are processed within 1-2 business days. Delivery times vary based on location:</p>
      <ul className="list-disc pl-6 mt-2 space-y-2">
        <li><span className="font-semibold">Within Kerala:</span> 3-5 business days</li>
        <li><span className="font-semibold">Rest of India:</span> 5-7 business days</li>
      </ul>

      <h2 className="text-lg font-semibold mt-4">💰 Shipping Charges</h2>
      <p>Shipping charges are calculated at checkout. Free shipping may be available for certain orders.</p>

      <h2 className="text-lg font-semibold mt-4">🚚 Tracking</h2>
      <p>Once shipped, you will receive a tracking ID via email or SMS.</p>

      <h2 className="text-lg font-semibold mt-4">📍 Delivery Address</h2>
      <p>Please ensure the correct address is provided. WatchLab is not responsible for delivery failures due to incorrect addresses.</p>

      <h2 className="text-lg font-semibold mt-4">📞 Contact Us</h2>
      <p>For shipping-related queries, contact us at:</p>
      <p className="mt-2 font-semibold">📧 Email: support@watchlab.in</p>
      <p className="font-semibold">📞 Phone: 9744676504</p>
    </div>
  );
};

export default ShippingPolicy;
