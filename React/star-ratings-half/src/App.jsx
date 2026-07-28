import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import StarRatings from './components/StarRatings'

function App() {

  function handleSelectedRatings(value) {
    console.log(value)
  }

  return (
    <>
      <StarRatings size={10} handleSelectedRatings={handleSelectedRatings}/>
    </>
  )
}

export default App
