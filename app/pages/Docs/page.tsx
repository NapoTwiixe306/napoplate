'use client'

import { SessionProvider } from "next-auth/react"; 
import DocsTest from "./DocsTest";
const Dashboard = () => {
  return (
    <SessionProvider>
      <DocsTest />
    </SessionProvider>
  );
}

export default Dashboard;