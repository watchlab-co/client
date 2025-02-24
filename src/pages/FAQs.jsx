import React from 'react';

const FAQs = () => {
  return (
    <div className="max-w-3xl mx-auto my-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">FAQs</h1>
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Do you offer refunds?</h2>
          <p>No, we do not offer refunds. However, if you receive a damaged product, you can request a refund by providing an unboxing video.</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold">How can I contact WatchLab?</h2>
          <p>Email: officialwatchlab@gmail.com</p>
          <p>Phone: 9744676504</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Where are you located?</h2>
          <p>Chemmankadavu, Malappuram, Kerala, India.</p>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
