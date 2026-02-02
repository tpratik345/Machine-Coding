import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Counter from './components/Counter';

function App() {

  const [data, setData] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  const fetchData = async () => {
    try {
      const res = await fetch('https://dummyjson.com/products');
      const response = await res.json();
      // if (!response.ok) {
      //   throw new Error('No Data')
      // }
      setData(response?.products);
    } catch (e) {
      console.log(e)
      // setError(e.message);
    }
  }

  // console.log(data)

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <>
      {/* <ol>
        {data?.length > 0 && data.map(product => {
          return (
            <li key={product.id}>{product.title}</li>
          )
        })}
      </ol> */}
      <Counter />
    </>
  )
}

export default App
