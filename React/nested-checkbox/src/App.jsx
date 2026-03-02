import './App.css'
import NestedCheckbox from './component/NestedCheckbox'
import { checkBoxData } from './data/data'

function App() {

  return (
    <>
      <NestedCheckbox data={checkBoxData}/>
    </>
  )
}

export default App
