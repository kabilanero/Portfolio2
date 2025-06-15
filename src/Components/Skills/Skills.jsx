import React, { useState, useEffect } from "react";
import "./Skills.css";

const skills = [
  { name: "MongoDB", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "Express", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
  { name: "React", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Node.js", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Docker", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "GitHub", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
  { name: "Firebase", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
  { name: "Markdown", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/markdown/markdown-original.svg" },
  { name: "Linux", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
  { name: "Java", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "Notion", img: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png" },
  { name: "Canva", img: "https://img.icons8.com/nolan/64/canva.png" },
  { name: "Redis", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
  { name: "Nginx", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg" }
];

const MAX_RATING = 5;
const ICON_TYPE = "heart"; // "star" or "heart"

function Skills() {
  const [reviews, setReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [reviewName, setReviewName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviewStars, setReviewStars] = useState(5);
  const [currentReview, setCurrentReview] = useState(0);

  useEffect(() => {
    fetch("/api/reviews")
      .then(res => res.json())
      .then(data => setReviews(data));
  }, []);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const newReview = { name: reviewName, text: reviewText, stars: reviewStars };
    const res = await fetch("/api/postreview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newReview),
    });
    if (!res.ok) {
      alert("Failed to submit review");
      return;
    }
    const saved = await res.json();
    setReviews(prev => [saved, ...prev]);
    setShowForm(false);
    setReviewName("");
    setReviewText("");
    setReviewStars(5);
    setCurrentReview(0); // Show the new review
  };

  // Icon selector component for rating
  const renderRatingIcons = (rating, setRating) => (
    <div className="skills-rating-icons" aria-label="Rating">
      {[...Array(MAX_RATING)].map((_, idx) => (
        <span
          key={idx}
          className={`skills-icon ${idx < rating ? "filled" : ""}`}
          onClick={() => setRating(idx + 1)}
          tabIndex={0}
          aria-label={`Rate ${idx + 1} ${ICON_TYPE === "heart" ? "hearts" : "stars"}`}
          onKeyDown={e => {
            if (e.key === "Enter" || e.key === " ") setRating(idx + 1);
          }}
        >
          {ICON_TYPE === "heart" ? "♥" : "★"}
        </span>
      ))}
    </div>
  );

  // For displaying icons in review cards
  const renderReviewIcons = (count) => (
    <span>
      {[...Array(count)].map((_, idx) => (
        <span key={idx} className="skills-icon filled">
          {ICON_TYPE === "heart" ? "♥" : "★"}
        </span>
      ))}
      {[...Array(MAX_RATING - count)].map((_, idx) => (
        <span key={idx} className="skills-icon">
          {ICON_TYPE === "heart" ? "♥" : "★"}
        </span>
      ))}
    </span>
  );

  // Carousel navigation
  const handlePrev = () => {
    setCurrentReview((prev) =>
      prev === 0 ? reviews.length - 1 : prev - 1
    );
  };
  const handleNext = () => {
    setCurrentReview((prev) =>
      prev === reviews.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="skills-bg">
      {/* Tech Stack Section */}
      <section className="skills-glass-section tech-section">
        <h2 className="skills-glass-title">Tech Stacks</h2>
        <div className="skills-techstacks-infinite">
          {[0, 1, 2].map(row => (
            <div
              className={`skills-techstacks-row direction-${row % 2 === 0 ? "left" : "right"}`}
              key={row}
            >
              <div className={`skills-techstacks-scroll ${row % 2 === 0 ? "left" : "right"}`}>
                {skills.map(skill => (
                  <div className="skills-skill-card-glass" key={skill.name + row}>
                    <img src={skill.img} alt={skill.name} className="skills-skill-icon" />
                    <span>{skill.name}</span>
                  </div>
                ))}
                {skills.map(skill => (
                  <div className="skills-skill-card-glass" key={skill.name + row + "repeat"}>
                    <img src={skill.img} alt={skill.name} className="skills-skill-icon" />
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews Section */}
      <section className="skills-glass-section skills-review-section">
        <h2 className="skills-glass-title">Customer Reviews</h2>
        <div className="skills-carousel-container">
          {reviews.length > 0 ? (
            <div className="skills-carousel-card">
              <button className="skills-carousel-arrow left" onClick={handlePrev} aria-label="Previous review">
                &#8592;
              </button>
              <div className="skills-flipcard-glass top">
                <div className="skills-flipcard-front-glass">
                  <div className="skills-star-glass">
                    {renderReviewIcons(reviews[currentReview].stars)}
                  </div>
                  <div className="skills-reviewsdetails-glass">{reviews[currentReview].text}</div>
                  <div className="skills-reviewer-glass">{reviews[currentReview].name}</div>
                </div>
              </div>
              <button className="skills-carousel-arrow right" onClick={handleNext} aria-label="Next review">
                &#8594;
              </button>
            </div>
          ) : (
            <div className="skills-flipcard-glass top">
              <div className="skills-flipcard-front-glass">
                <div className="skills-reviewsdetails-glass">No reviews yet. Be the first!</div>
              </div>
            </div>
          )}
          {/* Dots for navigation */}
          {reviews.length > 1 && (
            <div className="skills-carousel-dots">
              {reviews.map((_, idx) => (
                <span
                  key={idx}
                  className={`skills-carousel-dot${idx === currentReview ? " active" : ""}`}
                  onClick={() => setCurrentReview(idx)}
                ></span>
              ))}
            </div>
          )}
        </div>
        {/* Button or Form below */}
        {!showForm ? (
          <button className="skills-review-btn-glass" onClick={() => setShowForm(true)}>
            Leave a Review
          </button>
        ) : (
          <form className="skills-reviewform-glass" onSubmit={handleReviewSubmit}>
            <input
              value={reviewName}
              onChange={e => setReviewName(e.target.value)}
              placeholder="Your Name"
              required
              className="skills-review-input"
            />
            <textarea
              value={reviewText}
              onChange={e => setReviewText(e.target.value)}
              placeholder="Your Review"
              required
              className="skills-review-input"
              rows={5}
            />
            {renderRatingIcons(reviewStars, setReviewStars)}
            <div style={{ display: "flex", gap: "10px" }}>
              <button type="submit" className="skills-reviewform-btn">Submit</button>
              <button type="button" onClick={() => setShowForm(false)} className="skills-reviewform-btn cancel">Cancel</button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}

export default Skills;
