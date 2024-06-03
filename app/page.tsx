import React from 'react'
import '@/src/scss/App.scss'
import Navbar from '@/src/Components/Navbar'
import Footer from '@/src/Components/Footer'
import Link from 'next/link'

export default function page() {
  return (
    <>
      <Navbar/>
      <div className="Home">
        <h1>Hello World</h1>
        <Link href="/auth/signin">Signin</Link>
        <Link href="/auth/register">Register</Link>
      </div>
      <Footer/>
    </>
  )
}
