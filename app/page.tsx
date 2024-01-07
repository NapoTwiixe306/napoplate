import React from 'react'
import '@/src/scss/App.scss'
import Navbar from '@/src/Components/Navbar'
import Footer from '@/src/Components/Footer'

export default function page() {
  return (
    <>
      <Navbar/>
      <div className="Home">
        <h1>Hello World</h1>
      </div>
      <Footer/>
    </>
  )
}
