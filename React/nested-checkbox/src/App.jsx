import { useState } from 'react'
import './App.css'
import NestedCheckbox from './component/NestedCheckbox'
import { checkBoxData } from './data/data'

function App() {
  const [checked, setChecked] = useState({})

  return (
    <>
      <NestedCheckbox data={checkBoxData} checked={checked} setChecked={setChecked} />
    </>
  )
}

export default App
