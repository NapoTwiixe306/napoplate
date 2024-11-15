"use client";
import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import DashboardContent from "./DashboardContent";

const DocTest: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<string>("");
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
    return <DashboardContent />;
  };

  if (!isClient) {
    return null; // or a loading spinner
  }

  return (
    <div className="w-full bg-white dark:bg-gray-900">
      <div className="">
        <div className="">
          {status === "loading" && (
            <p className="p-5 text-black dark:text-white">
              Chargement de la session...
            </p>
          )}
          {status === "authenticated" && renderContent()}
{/*           {status === "unauthenticated" && renderContent()} */}
          {status === 'unauthenticated' &&
          <>
            <div className="min-h-screen text-black dark:text-white">
              <p className='p-5 text-black dark:text-white'>Veuillez vous connecter pour accéder à cette page.</p>
              <Link href="/auth/signin">
                <button className="p-2 px-5 text-black rounded-md cursor-pointer bg-customBlue dark:text-white">
                  Connexion
                </button>
              </Link>
            </div>
          </>
          }
        </div>
      </div>
    </div>
  );
};

export default DocTest;
