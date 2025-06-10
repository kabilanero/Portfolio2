import React, { useState, useEffect } from "react";
import "./Skills.css";

const skills = [
  // Existing
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
  // New
  { name: "Notion", img: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png" },
  { name: "Canva", img: "https://static-00.iconduck.com/assets.00/canva-icon-2048x2048-9d6v0g9a.png" },
  { name: "Redis", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
  { name: "Nginx", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg" }
];

function Skills() {
  const [reviews, setReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [reviewName, setReviewName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviewStars, setReviewStars] = useState(5);

  useEffect(() => {
    fetch("/api/reviews")
      .then(res => res.json())
      .then(data => setReviews(data));
  }, []);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const newReview = { name: reviewName, text: reviewText, stars: reviewStars };
    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newReview),
    });
    const saved = await res.json();
    setReviews(prev => [saved, ...prev]);
    setShowForm(false);
    setReviewName("");
    setReviewText("");
    setReviewStars(5);
  };

  return (
    <div className="skills-bg">
      {/* Tech Stack Section */}
      <section className="glass-section tech-section">
        <h2 className="glass-title">Tech Stacks</h2>
        <div className="techstacks-infinite">
          {[0, 1, 2].map(row => (
            <div
              className={`techstacks-row direction-${row % 2 === 0 ? "left" : "right"}`}
              key={row}
            >
              <div className={`techstacks-scroll ${row % 2 === 0 ? "left" : "right"}`}>
                {skills.map(skill => (
                  <div className="skill-card-glass" key={skill.name + row}>
                    <img src={skill.img} alt={skill.name} className="skill-icon" />
                    <span>{skill.name}</span>
                  </div>
                ))}
                {skills.map(skill => (
                  <div className="skill-card-glass" key={skill.name + row + "repeat"}>
                    <img src={skill.img} alt={skill.name} className="skill-icon" />
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews Section */}
      <section className="glass-section review-section">
        <h2 className="glass-title">Customer Reviews</h2>
        {/* Reviews on top */}
        <div className="reviewsflipcards-stack-glass">
          {reviews.map((review, idx) => (
            <div className="flipcard-glass top" key={review.id || idx}>
              <div className="flipcard-front-glass">
                <div className="star-glass">
                  {"★".repeat(review.stars)}
                  <span className="star-fade">
                    {"★".repeat(5 - review.stars)}
                  </span>
                </div>
                <div className="reviewsdetails-glass">{review.text}</div>
                <div className="reviewer-glass">{review.name}</div>
              </div>
            </div>
          ))}
          {reviews.length === 0 && (
            <div className="flipcard-glass top">
              <div className="flipcard-front-glass">
                <div className="reviewsdetails-glass">No reviews yet. Be the first!</div>
              </div>
            </div>
          )}
        </div>
        {/* Button or Form below */}
        {!showForm ? (
          <button className="review-btn-glass" onClick={() => setShowForm(true)}>
            Leave a Review
          </button>
        ) : (
          <form className="reviewform-glass" onSubmit={handleReviewSubmit}>
            <input
              value={reviewName}
              onChange={e => setReviewName(e.target.value)}
              placeholder="Your Name"
              required
              className="review-input"
            />
            <textarea
              value={reviewText}
              onChange={e => setReviewText(e.target.value)}
              placeholder="Your Review"
              required
              className="review-input"
              rows={5}
            />
            <select
              value={reviewStars}
              onChange={e => setReviewStars(Number(e.target.value))}
              className="review-input"
            >
              {[5, 4, 3, 2, 1].map(s => (
                <option key={s} value={s}>{s} Stars</option>
              ))}
            </select>
            <div style={{ display: "flex", gap: "10px" }}>
              <button type="submit" className="reviewform-btn">Submit</button>
              <button type="button" onClick={() => setShowForm(false)} className="reviewform-btn cancel">Cancel</button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}

export default Skills;
