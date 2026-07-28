import { useState } from "react";
import "./StarRatings.css";
import { AiFillStar } from "react-icons/ai";

function StarRatings({ size, handleSelectedRatings }) {
  const [starsSelected, setSelectedStars] = useState(0);
  const [hoveredRatings, setHoveredRatings] = useState(0);

  function handleClick(e, starValue) {
    const { clientX, clientY } = e;
    const { left, right } = e.target.getBoundingClientRect();
    const halfPosition = (right - left) / 2 + left;
    // console.log({ clientX, clientY })
    // console.log({ left, right })
    // console.log(halfPosition)

    if (clientX < halfPosition) {
      starValue -= 0.5;
    }

    setSelectedStars(starValue);
    handleSelectedRatings(starValue)
  }

  function handleMouseEnter(e, value) {
    const { clientX, clientY } = e;
    const { left, right } = e.target.getBoundingClientRect();
    const halfPosition = (right - left) / 2 + left;
    // console.log({ clientX, clientY })
    // console.log({ left, right })
    // console.log(halfPosition)

    if (clientX < halfPosition) {
      value -= 0.5;
    }
    setHoveredRatings(value);
  }

  return (
    <div className="container">
      {[...Array(size)].map((_, index) => {
        const starValue = index + 1;

        const currentRating = hoveredRatings || starsSelected;

        let fillPercentage = 0;

        if (currentRating >= starValue) {
          fillPercentage = 100;
        } else if (currentRating >= starValue - 0.5) {
          fillPercentage = 50;
        } else {
          fillPercentage = 0;
        }

        return (
          <span
            className="star-wrapper"
            key={index}
            onClick={(e) => handleClick(e, starValue)}
            onMouseEnter={(e) => handleMouseEnter(e, starValue)}
            onMouseLeave={() => setHoveredRatings(0)}
          >
            <AiFillStar className="empty-star" />
            {index <= currentRating - 0.5 && (
              <span
                className="filled-star"
                style={{ width: `${fillPercentage}%` }}
              >
                <AiFillStar />
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}

export default StarRatings;
