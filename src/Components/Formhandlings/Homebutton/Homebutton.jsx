import React, { useState, useEffect } from "react";
import "./Homebutton.css";
import insta from '../Homebutton/instagram.png'
import whatsapp from '../Homebutton/social.png'
import youtube from '../Homebutton/youtube.png'
import github from '../Homebutton/github.png'

function Homebutton() {
  const [isHovered, setIsHovered] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // ✅ One object to hold all form data
  const [formData, setFormData] = useState({
    name: "",
    jobType: "",
    description: "",
  });

  // Optional: store multiple form entries
  const [formSubmissions, setFormSubmissions] = useState([]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const enableHoverEffect = windowWidth < 768;

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // ✅ Handle form submission
 const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    const response = await fetch("http://localhost:5000/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (response.ok) {
      console.log("✅ Success:", result.message || "Form submitted!");
      setFormSubmissions([...formSubmissions, formData]);

      // Reset form
      setFormData({
        name: "",
        jobType: "",
        description: "",
      });
    } else {
      console.error("❌ Error:", result.message);
      alert("Submission failed. Try again.");
    }

  } catch (error) {
    console.error("❌ Network error:", error);
    alert("Server error. Please try again later.");
  }
};

  return (
    <div className="Hirebtnform">
      <h2>Sending invitation mail</h2>
      <div className="container">
        <div
          className="btngrpdiv"
          onMouseEnter={() => enableHoverEffect && setIsHovered(true)}
          onMouseLeave={() => enableHoverEffect && setIsHovered(false)}
          onClick={() => enableHoverEffect && setIsHovered(!isHovered)}
        >
          <div
            className="btnformdiv1"
            style={{ flexGrow: isHovered ? 2 : 1 }}
          > <div className="reachme">
            <a href="https://wa.me/918608214689?text=Hi" target="_blank" rel="noopener noreferrer">
  <img src={whatsapp} alt="WhatsApp" />
</a>
<a href="https://github.com/kabilanero" target="_blank" rel="noopener noreferrer">
  <img src={github} alt="GitHub" />
</a>
<a href="" target="_blank" rel="noopener noreferrer">
  <img src={insta} alt="Instagram" />
</a>
<a href="" target="_blank" rel="noopener noreferrer">
  <img src={youtube} alt="YouTube" />
</a>

          </div></div>
          {!isHovered && <div className="btnformdiv2"></div>}
        </div>

        <div className="btnformdiv3">
          <form className="Homebtnformin" onSubmit={handleSubmit}>
            <div className="formsetdiv">
              <div className="formset">
                <span>Name</span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="formset">
                <span>Job-Type</span>
                <select
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleChange}
                  required
                >
                  <option value="">---select type----</option>
                  <option value="freelance">Contract Type - Freelance</option>
                  <option value="fulltime">Fulltime</option>
                </select>
              </div>

              <div className="formset">
                <span>Description</span>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Position and details of the company"
                  required
                />
              </div>

              <div className="formsubmitset">
                <button type="submit" className="btnformset">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Homebutton;
