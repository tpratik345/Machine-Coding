import './App.css'
import AutoComplete from './components/AutoComplete';

function App() {

  async function fetchSuggestions(query) {
    const response = await fetch(`https://dummyjson.com/recipes/search?q=${query}`);
    if (!response.ok) {
      throw new Error('Network response was not ok.')
    }

    const result = await response.json();
    return result.recipes;
  }

  return (
    <>
      <AutoComplete
        fetchSuggestions={fetchSuggestions}
        palaceHolder={'Search a recipe...'}
        dataKey={'name'}
      />
    </>
  )
}

export default App
