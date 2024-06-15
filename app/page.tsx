'use client'
import React from 'react'
import './globals.css'
import Navbar from '@/src/Components/Navbar'
import Footer from '@/src/Components/Footer'
import Link from 'next/link'
import {Button} from "@nextui-org/button";


export default function page() {
    function test() {
        console.log("test")
    }
  return (
    <>
      <Navbar/>
      <div className="Home">
        <h1 className="text-blue-600">Hello World</h1>
        <Link href="/auth/signin">Signin</Link>
        <Link href="/auth/register">Register</Link>
      </div>
        <Button>CVlick me</Button>
      <Footer/>
    </>
  )
}
