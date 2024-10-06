import React from "react";
import Image from "next/image";
import {
  FaCheckCircle,
  FaLock,
  FaCog,
  FaShip,
  FaDollarSign,
} from "react-icons/fa";
import bg from "../../img/Dashboard.jpg";

export const TextWithImage = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl gap-10 md:flex-row">
      <div className="flex flex-col w-full text-center md:w-6/12 md:text-left">
        <h1 className="text-5xl font-semibold text-black dark:text-white">
          The power of our service
        </h1>
        <p className="text-lg text-black dark:text-white">
          Aliqua labore laboris fugiat. Reprehenderit exercitation eu commodo.
          Officia nostrud sit et aliqua ea ex sunt minim incididunt sunt.
        </p>
        <div className="flex flex-col gap-4 mt-4">
          <div className="flex items-center gap-2 text-left">
            <FaCog className="text-blue-500" size={24} />
            <div>
              <h2 className="text-xl font-semibold text-black dark:text-white">
                Easy to use
              </h2>
              <p className="text-sm text-black dark:text-white">
                Id laborum laboris duis nostrud excepteur ut velit.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-left">
            <FaCheckCircle className="text-blue-500" size={24} />
            <div>
              <h2 className="text-xl font-semibold text-black dark:text-white">
                Reliable
              </h2>
              <p className="text-sm text-black dark:text-white">
                Magna Lorem ex cillum fugiat ad enim aute irure sit duis minim.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-left">
            <FaLock className="text-blue-500" size={24} />
            <div>
              <h2 className="text-xl font-semibold text-black dark:text-white">
                Secure
              </h2>
              <p className="text-sm text-black dark:text-white">
                Proident nostrud excepteur sint ut culpa consectetur aute
                adipisicing.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center w-full md:w-6/12">
        <Image className="rounded-xl" src={bg} alt="Dashboard" />
      </div>
    </div>
  );
};

export const SecondTextWithImage = () => {
  return (
    <div className="flex flex-col-reverse items-center justify-center max-w-5xl gap-10 md:flex-row">
      <div className="flex justify-center w-full md:w-6/12">
        <Image className="rounded-xl" src={bg} alt="Dashboard" />
      </div>
      <div className="flex flex-col w-full text-center md:w-6/12 md:text-left">
        <h1 className="text-5xl font-semibold text-black dark:text-white">
          The speed of our service
        </h1>
        <p className="text-lg text-black dark:text-white">
          Cillum sint enim excepteur ut deserunt qui nisi in deserunt in.
          Deserunt aliquip quis aliquip eu quis ex velit velit nostrud sit.
        </p>
        <div className="flex flex-col gap-4 mt-4">
          <div className="flex items-center gap-2 text-left">
            <FaShip className="text-blue-500" size={24} />
            <div>
              <h2 className="text-xl font-semibold text-black dark:text-white">
                Fast
              </h2>
              <p className="text-sm text-black dark:text-white">
                Qui reprehenderit nostrud dolore nisi ad fugiat labore eiusmod.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-left">
            <FaDollarSign className="text-blue-500" size={24} />
            <div>
              <h2 className="text-xl font-semibold text-black dark:text-white">
                Affordable
              </h2>
              <p className="text-sm text-black dark:text-white">
                Reprehenderit fugiat elit in do ipsum ut pariatur.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-left">
            <FaLock className="text-blue-500" size={24} />
            <div>
              <h2 className="text-xl font-semibold text-black dark:text-white">
                Scalable
              </h2>
              <p className="text-sm text-black dark:text-white">
                Lorem deserunt et eiusmod. Ea in consectetur minim officia.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
