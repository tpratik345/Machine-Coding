import ProgressBar from './components/ProgressBar'

function App() {

  const bars = [5,20, 50, 70, 90];

  return (
    <div style={{ marginTop: '30vh'}}>
    {
      bars.map(bar => <ProgressBar progress={bar}/>)
    }
    </div>
  )
}

export default App
