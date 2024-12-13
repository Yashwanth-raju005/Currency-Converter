/* eslint-disable no-unused-vars */
import React from 'react'
import "./App.css"
import CurrencyConvertor from './components/CurrencyConvertor'

const App = () => {
  return (
    <div className='min-h-screen  flex flex-col 
    items-center justify-center pb-40'>
      <div className='container'>

      <CurrencyConvertor/>
      </div>
    </div>
  )
}

export default App