import './AutoComplete.css'
import { useCallback, useEffect, useState } from 'react'
import SuggestionsList from './SuggestionsList';

function debounce(func, delay) {
    let timer;

    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), delay)
    }
}

function AutoComplete({ fetchSuggestions, placeholder, dataKey }) {
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

    function handleOnChange(value) {
        setInputValue(value)
    }

    const memoizedFetchSuggestions = useCallback(debounce(fetchData, 500), [inputValue])

    async function fetchData(query) {
        setLoading(true);
        try {
            const res = await fetchSuggestions(query);
            setSuggestions(res);
        } catch (e) {
            console.log(e);
            setError('Not able to load suggestions at the moment.')
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (inputValue.length > 1) {
            memoizedFetchSuggestions(inputValue)
        } else {
            setSuggestions([]);
        }
    }, [inputValue])

    function handleOnClick(data) {
        setInputValue(data[dataKey]);
        setSuggestions([]);
    }

    return (
        <>
            <div className='container'>
                <input
                    className='searchBar'
                    name='searchBar'
                    type='search'
                    value={inputValue}
                    placeholder={placeholder}
                    onChange={(e) => handleOnChange(e.target.value)} />

                {(suggestions.length > 0 || error || loading) &&
                    <ul className='suggestions-list'>
                        {error && <div className='error'>{error}</div>}
                        {loading && <div className='loading'>Loading...</div>}
                        <SuggestionsList
                            suggestions={suggestions}
                            dataKey={dataKey}
                            highlight={inputValue}
                            handleOnClick={handleOnClick}
                        />
                    </ul>
                }

                {inputValue && suggestions?.length === 0 && <div>No Result Found!</div>}
            </div>
        </>
    )
}

export default AutoComplete