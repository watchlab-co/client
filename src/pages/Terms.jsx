import React from 'react';

const Terms = () => {
  return (
    <div className="max-w-3xl mx-auto my-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Terms & Conditions</h1>
      <p>By purchasing from WatchLab, you agree to the following terms:</p>
      <ul className="list-disc pl-6 mt-4 space-y-2">
        <li>All sales are final. No refunds except for damaged products with video proof.</li>
        <li>We are not responsible for delays caused by courier services.</li>
        <li>Payment must be completed before shipping.</li>
      </ul>
      <p className="mt-4">For questions, contact:</p>
      <p className="mt-2 font-semibold">📧 support@watchlab.in</p>
      <p className="font-semibold">📞 9744676504</p>
    </div>
  );
};

export default Terms;
