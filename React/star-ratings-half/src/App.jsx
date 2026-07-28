import { useState } from 'react'
import StarRatings from './components/StarRatings'
import './App.css'

function App() {

  function handleSelectedRatings(value) {
    console.log(value)
  }

  return (
    <div id='center'>
      <StarRatings size={5} handleSelectedRatings={handleSelectedRatings}/>
    </div>
  )
}

export default App
