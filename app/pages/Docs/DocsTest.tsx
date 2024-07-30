'use client'
import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';

const DocTest: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<string>('LibrairieUI');
  const { data: session, status } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSelectItem = (title: string) => {
    setSelectedItem(title);
    setSidebarOpen(false); 
  };

  const renderContent = () => {
    return (
      <div className="p-5 sm:p-0">
        <p className='text-black dark:text-white'>Composants</p>
      </div>
    )
  };

  if (!isClient) {
    return null; // or a loading spinner
  }

  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-900">
      <div className='w-full p-5 sm:p-0'>
        <div className="p-5 sm:p-0">
          <button
            className="p-2 mt-5 mb-5 text-white bg-blue-500 rounded-md sm:p-5 sm:hidden hover:bg-gray-400"
            onClick={() => setSidebarOpen(true)}
          >
            Menu
          </button>
        </div>
        <div className=''>
          {status === 'loading' && <p className='p-5 text-black dark:text-white'>Chargement de la session...</p>}
          {status === 'authenticated' && renderContent()}
          {status === 'unauthenticated' && <p className='p-5 text-black'>Veuillez vous connecter pour accéder à cette page.</p>}
        </div>
      </div>
    </div>
  );
};

export default DocTest;