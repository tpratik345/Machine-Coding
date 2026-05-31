export const fetchQuotes = async () => {
  const response = await fetch(
    "https://dummyjson.com/quotes?limit=10000"
  );

  const data = await response.json();

  return data?.quotes;
};