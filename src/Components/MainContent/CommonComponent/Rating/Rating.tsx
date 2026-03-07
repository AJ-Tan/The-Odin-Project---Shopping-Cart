import "./rating.css";

function Rating({ rating }: { rating: { rate: number; count: number } }) {
  const avgPercentage = `${(rating.rate - Math.floor(rating.rate) / 1) * 100}%`;
  return (
    <div className="rating">
      <div className="star-rating">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={crypto.randomUUID()} className="star-rating-container">
            <div
              className={`star-path${Math.ceil(rating.rate) === i + 1 ? " selected" : ""}`}
              style={{
                background: `${Math.ceil(rating.rate) === i + 1 ? `linear-gradient(to right, var(--primary-color-1) ${avgPercentage}, transparent ${avgPercentage})` : ""}`,
              }}
            ></div>

            <div className={`star-path-bg`}></div>
          </div>
        ))}
      </div>
      <div className="star-rating-detail">
        <div className="rate-avg">{rating.rate}</div>
        <span className="rate-count">({rating.count} reviews)</span>
      </div>
    </div>
  );
}

export default Rating;
