import { SessionProvider } from 'next-auth/react'
import React from 'react'
import Navbar from './Navbar'

export default function NavbarComponents() {
  return (
    <SessionProvider>
        <Navbar/>
    </SessionProvider>
  )
}
