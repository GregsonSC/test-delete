// components/ExpandingColumns.tsx
"use client";
import { useState } from "react";
// ! CH002: Discover Our Process cambie el texto de Lorem y contenido en los 4 procesos
const ExpandingColumns = () => {
  const [expandedIndex, setExpandedIndex] = useState(0);
  const images: string[] = [
    "images/expanding-columns/request.webp",
    "images/expanding-columns/estimated.webp",
    "images/expanding-columns/invoices.webp",
    "images/expanding-columns/proyect.webp",
  ];
  return (
    <section className="bg-[#04081e] text-white py-16 px-4">
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
              className={`relative overflow-hidden flex flex-col justify-end items-start p-4 transition-all duration-700 ease-in-out rounded cursor-pointer bg-gradient-to-r from-lime-400 to-cyan-400 ${
                expandedIndex === index ? "w-[40%]" : "w-[15%]"
              }`}
              onClick={() => setExpandedIndex(index)}
            >
              {/* Imagenes de los cuadros */}
              <img
                src={images[index]}
                alt={`Image ${index}`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
                  expandedIndex === index ? "opacity-50" : "opacity-100"
                }`}
              />
              {/*Texto de los cuadros */}
              {expandedIndex === index && (
                <>
                  {index === 0 && (
                    <h1 className="relative text-md md:text-5xl font-bold text-[#0A1248]">
                      Request
                    </h1>
                  )}
                  {index === 1 && (
                    <h1 className="relative text-md md:text-5xl font-bold text-[#0A1248]">
                      Estimated
                    </h1>
                  )}
                  {index === 2 && (
                    <h1 className="relative text-md md:text-5xl font-bold text-[#0A1248]">
                      Invoices
                    </h1>
                  )}
                  {index === 3 && (
                    <h1 className="relative text-md md:text-5xl font-bold text-[#0A1248]">
                      Proyect
                    </h1>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpandingColumns;
