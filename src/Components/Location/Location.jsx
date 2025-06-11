import React, { useState } from 'react';
import './Location.css';
import call from './telephone.png';
import loc from './location.png';
import website from './link.png';
import email from './mail.png';

function Location() {
  const formdatas = ['Email', 'Name', 'Mobile-number'];

  const [querydata, setQuerydata] = useState({
    Email: '',
    Name: '',
    'Mobile-number': '',
    Description: ''
  });
const [enquirysubmission,setenquirySubmissions]=useState([])
  // Handle input changes
  const handleChange = (e, field) => {
    setQuerydata(prev => ({
      ...prev,
      [field]: e.target.value
    })); 
  };
   
  const handleSubmit = async (e) => {
  e.preventDefault();
  console.log('Form submitted:', querydata);

  try {
    const response = await fetch("http://localhost:5000/api/querybusinessideas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(querydata),
    });

    const result = await response.json();

    if (response.ok) {
      console.log("✅ Success:", result.message || "Form submitted!");
      setenquirySubmissions(prev => [...prev, querydata]);

      // Reset form
      setQuerydata({
        Email: '',
        Name: '',
        'Mobile-number': '',
        Description: ''
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
    <div id="Location">
      <div className="location-details">
        <div className="navlocation">
          <h2>location</h2>
          
        </div>
        <div className="Locationcontainer">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3602.079346714666!2d78.25586924170031!3d11.998528623523953!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2s!5e0!3m2!1sen!2sin!4v1747851242532!5m2!1sen!2sin"
            width="600"
            height="350"
            loading="lazy"
            style={{ border: 0 }}
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>

          <div className="locationdesc">
            <h5>Connect with</h5>
            <div className="connectflex">
              <div className="connectlocation">
                <p><img src={loc} alt="loc" />3/236, Gandhinagar, Bommidi-635301</p>
              </div>
              <div className="connectsite">
                <p><img src={website} alt="web" /> <a href="http:// www.kabilsolutions.com" target="_blank" className='lochref'> www.kabilsolutions.com</a></p>
              </div>
              <div className="connect-number">
                <p><img src={call} alt="call" /><a href="tel:+918608214689" className='lochref'>8608214689</a></p>
              </div>
              <div className="connectemail">
                <p><img src={email} alt="email" /><a href="mailto:kapilrhode0000@gmail.com" className='lochref'>kapilrhode0000@gmail.com</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="contact-details">
        <div className="navcontact">
          <h2>Contact form</h2>
        </div>
        <div className="contactcontainer">
          <form className="formdetails" onSubmit={handleSubmit}>
            <div className="Forminputs">
              {formdatas.map((field, i) => (
                <div className="inputflex" key={i}>
                  <span className="contactspan">{field}</span>
                  <input
                    type="text"
                    value={querydata[field]}
                    onChange={(e) => handleChange(e, field)}
                  />
                </div>
              ))}
              <h6>Description</h6>
              <textarea
                className="textdetails"
                placeholder="Tell us your business ideas..."
                value={querydata.Description}
                onChange={(e) => handleChange(e, 'Description')}
              ></textarea>

              <button type="submit" className="submit-button">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Location;
