
function SuggestionsList({ suggestions, dataKey, handleOnClick, highlight }) {

    function getHighlightedText(suggestion, highlight) {
        const parts = suggestion.split(new RegExp(`(${highlight})`, 'gi'));

        return (
            <span>
                {parts?.map((part, index) => {
                    return part.toLowerCase() === highlight.toLowerCase()
                        ? <b key={index}>{part}</b>
                        : part
                })}
            </span>
        )
    }

    return (
        <>
            {suggestions?.length > 0
                && suggestions.map((suggestion, index) => {
                    return (
                        <li
                            key={index}
                            className="suggestion-item"
                            onClick={() => handleOnClick(suggestion)}
                        >
                            {getHighlightedText(suggestion[dataKey], highlight)}
                        </li>
                    )
                })
            }
        </>
    )
}

export default SuggestionsList