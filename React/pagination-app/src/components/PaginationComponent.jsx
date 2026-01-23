import './PaginationComponent.css'
import { useEffect, useState } from "react"

function PaginationComponent() {
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(3);

  const itemsPerPage = 12;

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('https://dummyjson.com/products?limit=100');
      const data = await res.json();
      console.log(data);
      setProducts(data?.products);
    }

    fetchData();
  }, [])

  return (
    <>
      {
        products.length > 0 && <div className="products">
          {
            products?.slice((page * itemsPerPage) - itemsPerPage, page * itemsPerPage).map((product) => {
              return (
                <div key={product.id} className="products__single">
                  <img src={product.thumbnail} alt={product.title} />
                  <div>{product.title}</div>
                </div>
              )
            })
          }
        </div>
      }
      {
        products.length > 0 && <div className='pagination'>
          <span onClick={() => setPage((prev) => prev > 1 ? prev -= 1 : 1)}> Previous </span>
          {
            [...Array(Math.ceil(products.length / itemsPerPage))].map((_, i) => {
              return (
                <span
                  className={`${i + 1 === page ? 'selected' : ''}`}
                  key={i}
                  onClick={() => setPage(i + 1)}>
                  {i + 1}
                </span>
              )
            })
          }
          <span onClick={() => setPage((prev) => prev < (Math.ceil(products.length / itemsPerPage)) ? prev += 1 : Math.ceil(products.length / itemsPerPage))}> Next </span>
        </div>
      }
    </>
  )
}

export default PaginationComponent