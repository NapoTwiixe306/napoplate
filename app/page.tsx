'use client'
import React from 'react';
import './globals.css';
import Navbar from '@/src/Components/Navbar';
import Badge from '@/src/Components/Badges/Badges';
import Image from 'next/image';
import bg from '../src/img/Dashboard.jpg';
import { FaCheckCircle, FaLock, FaCog, FaShip, FaDollarSign } from 'react-icons/fa'; // Assurez-vous d'installer react-icons

export default function Page() {
  return (
    <>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="bg-white dark:bg-gray-900">
          <Navbar />
          <div className="p-5 ">
            <div className="flex flex-col items-center justify-center gap-5 mt-16">
              <Badge />
              <h1 className='text-6xl font-semibold text-black dark:text-white'>Build your SaaS in seconds</h1>
              <p className='text-black dark:text-white'>This template demonstrates most of NapoPlate&#39;s components. It&#39;s a great starting point to build your own SaaS.</p>
              <div className='mt-14'>
                <Image className='rounded-xl' src={bg} alt='' width={1375} />
              </div>
            </div>
            {/* First */}
            <div className="flex flex-col items-center justify-center mt-96">
              <div className='flex flex-col items-center justify-center max-w-5xl gap-10 md:flex-row'>
                <div className='flex flex-col w-full text-center md:w-6/12 md:text-left'>
                  <h1 className='text-5xl font-semibold text-black dark:text-white'>The power of our service</h1>
                  <p className='text-lg text-black dark:text-white'>Aliqua labore laboris fugiat. Reprehenderit exercitation eu commodo. Officia nostrud sit et aliqua ea ex sunt minim incididunt sunt.</p>
                  <div className="flex flex-col gap-4 mt-4">
                    <div className="flex items-center gap-2 text-left">
                      <FaCog className="text-blue-500" size={24} />
                      <div>
                        <h2 className="text-xl font-semibold text-black dark:text-white">Easy to use</h2>
                        <p className="text-sm text-black dark:text-white">Id laborum laboris duis nostrud excepteur ut velit.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-left">
                      <FaCheckCircle className="text-blue-500" size={24} />
                      <div>
                        <h2 className="text-xl font-semibold text-black dark:text-white">Reliable</h2>
                        <p className="text-sm text-black dark:text-white">Magna Lorem ex cillum fugiat ad enim aute irure sit duis minim.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-left">
                      <FaLock className="text-blue-500" size={24} />
                      <div>
                        <h2 className="text-xl font-semibold text-black dark:text-white">Secure</h2>
                        <p className="text-sm text-black dark:text-white">Proident nostrud excepteur sint ut culpa consectetur aute adipisicing.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='flex justify-center w-full md:w-6/12'>
                  <Image className='rounded-xl' src={bg} alt='' />
                </div>
              </div>
            </div>

            {/* Second */}
            <div className="flex flex-col items-center justify-center mt-52">
              <div className='flex flex-col-reverse items-center justify-center max-w-5xl gap-10 md:flex-row'>
                <div className='flex justify-center w-full md:w-6/12'>
                  <Image className='rounded-xl' src={bg} alt='' />
                </div>
                <div className='flex flex-col w-full text-center md:w-6/12 md:text-left'>
                  <h1 className='text-5xl font-semibold text-black dark:text-white'>The speed of our service</h1>
                  <p className='text-lg text-black dark:text-white'>Cillum sint enim excepteur ut deserunt qui nisi in deserunt in. Deserunt aliquip quis aliquip eu quis ex velit velit nostrud sit.</p>
                  <div className="flex flex-col gap-4 mt-4">
                    <div className="flex items-center gap-2 text-left">
                      <FaShip className="text-blue-500" size={24} />
                      <div>
                        <h2 className="text-xl font-semibold text-black dark:text-white">Fast</h2>
                        <p className="text-sm text-black dark:text-white">Qui reprehenderit nostrud dolore nisi ad fugiat labore eiusmod.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-left">
                      <FaDollarSign className="text-blue-500" size={24} />
                      <div>
                        <h2 className="text-xl font-semibold text-black dark:text-white">Affordable</h2>
                        <p className="text-sm text-black dark:text-white">Reprehenderit fugiat elit in do ipsum ut pariatur.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-left">
                      <FaLock className="text-blue-500" size={24} />
                      <div>
                        <h2 className="text-xl font-semibold text-black dark:text-white">Scalable</h2>
                        <p className="text-sm text-black dark:text-white">Lorem deserunt et eiusmod. Ea in consectetur minim officia.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
