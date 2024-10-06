// components/CardService.tsx
import React from "react";
import { services } from "./CardData";

export default function CardService() {
  return (
    <div className="flex items-center justify-center min-h-screen text-white ">
      <div className="max-w-4xl px-4 py-12">
        <h2 className="mb-6 text-5xl font-bold text-center text-black dark:text-white">
          Why choose our service?
        </h2>
        <p className="mb-12 text-center text-black dark:text-white">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="flex flex-col items-center w-full gap-3 p-6 text-center transition-all duration-300 bg-gray-100 border-2 border-transparent rounded-lg shadow-lg dark:bg-gray-800 hover:border-blue-500"
            >
              <div className="flex items-center gap-6">
                <div className="mb-4 text-4xl">{service.icon}</div>
                <h3 className="mb-2 text-xl font-semibold text-black dark:text-white">
                  {service.title}
                </h3>
              </div>
              <p className="text-black dark:text-white">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
