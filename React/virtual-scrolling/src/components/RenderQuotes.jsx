import React, { useEffect, useState } from 'react'
import { fetchQuotes } from '../services/apiService';
import VirtualScroll from './VirtualScroll';

function RenderQuotes() {
    const [quotes, setQuotes] = useState([]);

    useEffect(() => {
        async function callApi() {
            const data = await fetchQuotes();
            setQuotes(data);
        }

        callApi();
    }, [])

    console.log(quotes)

    return (
        <>
            {/* <ul>
                {quotes.map((quote) => {
                    return <li key={quote.id}>{quote.quote}</li>
                })}
            </ul> */}
            <VirtualScroll
                data={quotes}
                itemHeight={60}
                containerHeight={600}
                renderItem={(item, index) => (
                    <div
                        style={{
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            paddingLeft: 20,
                            borderBottom: "1px solid #eee",
                        }}
                    >
                        <span key={item.id}>
                           #{index + 1} - {item.quote}
                        </span>
                    </div>
                )
                }
            />
        </>
    )
}

export default RenderQuotes