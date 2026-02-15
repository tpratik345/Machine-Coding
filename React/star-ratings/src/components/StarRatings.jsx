import { useState } from 'react'
import './StarRatings.css'

function StarRatings({ size }) {
  const [starsSelected, setSelectedStars] = useState(0);
  const [hoveredRatings, setHoveredRatings] = useState(0);

  return (
    <div className='container'>
      {[...Array(size)].map((_, index) => {
        const starValue = index + 1;

        let starClass = 'star';

        if (starValue <= hoveredRatings) {
          starClass += ' hover'
        } else if(starValue <= starsSelected) {
          starClass += ' active'
        }

        return <span
          className={starClass}
          key={index}
          onClick={() => setSelectedStars(starValue)}
          onMouseEnter={() => setHoveredRatings(starValue)}
          onMouseLeave={() => setHoveredRatings(0)}
        >&#9733;</span>
      })

      }
    </div>
  )
}

export default StarRatings