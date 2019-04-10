import React from 'react'
import Alerts from './alerts'
import Angular from './angular'
import Footer from './footer'

export default function App() {
  return (
    <>
      <Alerts />
      <Angular component="pbsApp" />
      <Footer />
    </>
  )
}
