// components/ExpandingColumns.tsx
'use client';

import { useState } from 'react';

const ExpandingColumns = () => {
  const [expandedIndex, setExpandedIndex] = useState(0);

  return (
    <section className="bg-[#020b13] text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-3">Discover Our Process</h2>
        <p className="text-center text-300 max-w-2xl mx-auto mb-12 mt-10">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ullamcorper vitae lacus eu
          convallis. Phasellus ut lectus dolor. Vestibulum eleifend orci non dapibus tincidunt.
        </p>

        <div className="flex justify-center gap-4 h-[500px]">
          {[0, 1, 2, 3].map((index) => (
            <div
              key={index}
              className={`transition-all duration-700 ease-in-out rounded cursor-pointer bg-gradient-to-r from-lime-400 to-cyan-400 ${
                expandedIndex === index ? 'w-[40%]' : 'w-[15%]'
              }`}
              onClick={() => setExpandedIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpandingColumns;
