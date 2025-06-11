import React, { useEffect, useRef, useState } from 'react';
import './Achievements.css';

import portfolio from './GK.mp4'
import Smalllogics from './Small logic site.png'
import Dynamicsites from './Dynamic websites.png'
import CRM from './CRM.png'
import LMS from './LMS-dev.png'
import Saas from './Saas.jpg'
import Bookingsystem from './Booking system.png'
import Travelbooking from './Travel.mp4'
import Enquiry from './Enquiry.webp'
import money from './money.png'
import partypopper  from './icons8-party-popper.gif'


function Achievements() {
  const [radius, setRadius] = useState(0);
  const [angle, setAngle] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const sectionRef = useRef(null);
  const animationRef = useRef(null); 

  const cardCount = 8;
  const ROTATION_SPEED = 0.45;
  const degreeStep = 360 / cardCount;

  // Responsive 3D radius
  const getRadius = () => {
    const width = window.innerWidth;
    if (width < 480) return 180;
    if (width < 768) return 240;
    return 300;
  };

  const [radius3D, setRadius3D] = useState(getRadius());

  

  useEffect(() => {
    const handleResize = () => setRadius3D(getRadius());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Background scroll gradient effect
  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (rect.top < windowHeight && rect.bottom > 0) {
        const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
        const scrollProgress = visibleHeight / rect.height;
        const size = Math.min(scrollProgress * 30, 100);
        setRadius(size);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-rotate carousel
  useEffect(() => {
    if (!autoRotate) return;
    const rotate = () => {
      setAngle((prev) => prev + ROTATION_SPEED);
      animationRef.current = requestAnimationFrame(rotate);
    };
    animationRef.current = requestAnimationFrame(rotate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [autoRotate]);

  const handleMouseEnter = () => {
    setAutoRotate(false);
    cancelAnimationFrame(animationRef.current);
  };

  const handleMouseLeave = () => {
    setAutoRotate(true);
  };

  // Service data (mixed image + video)
  const services = [
    {
      id: 1,
      type: 'video',
      video: portfolio ,
      title: 'Professional portfolio',
      description: 'Professional UI/UX design services with detailed branding',
    },
    {
      id: 2,
      type: 'image',
      image: Smalllogics,
      title: 'Small services & Product branding',
      description: 'Delivering small automations or small logic devlopemnt based on clinet needs',
    },
    {
      id: 3,
      type: 'image',
      image: Dynamicsites,
      title: 'Dynamic Website Development',
      description: 'Responsive and dynamic web apps.',
    },
    {
      id: 4,
      type: 'image',
      image: CRM,
      title: 'CRM development',
      description: 'Develop customer based management system',
    },
    {
      id: 5,
      type: 'image',
      image: LMS,
      title: 'LMS System',
      description: 'Boost your potential with online learning with good seo friendly site',
    },
    {
      id: 6,
      type: 'image',
      image: Saas,
      title: 'Saas-services',
      description: 'We develop a Saas services for microservices',
    },
    {
      id: 7,
      type: 'image',
      image: Bookingsystem,
      title: 'Appointment management',
      description: 'Full branding and maintenance of each professional meetings like interview one person can simply choose own slot based on availabilty check in a date or months',
    },
    {
      id: 8,
      type: 'video',
      video: Travelbooking,
      title: 'Travelbooking and marketing site',
      description: 'Expert consultation of tours and guide for travels ',
    }
  ];

  return (
    <div className="bgachivements">
      <div className="confetti">
      <div style={{ position: 'relative', height: '100vh', background: 'white', overflow: 'hidden' }}>
      <div className="popper" />
      <div id="confetti-container"></div>
    </div>
      </div>
    <div className="Btndiv">
    <button className="enquiry"><a href="tel:+91 8608214689">Enquiry</a></button>
    </div>
    <div className="Productoffers">
  <h2>Offers:</h2>
  
    <li><img src="https://cdn-icons-png.flaticon.com/512/5610/5610944.png" alt="Domain" className="offer-icon" /> Free Domain hosting For 1 month</li>
    <li><img src="https://cdn-icons-png.flaticon.com/512/4249/4249871.png" alt="Server" className="offer-icon" /> Free server hosting for 1 month</li>
    <li><img src="https://cdn-icons-png.flaticon.com/512/2892/2892600.png" alt="SEO" className="offer-icon" /> SEO optimization</li>
    <li><img src="https://cdn-icons-png.flaticon.com/512/597/597177.png" alt="Support" className="offer-icon" /> 24/7 Service support</li>
    <li><img src={money} alt="Installments" className="offer-icon" /> Payment in installments</li>
  
</div>
      <div
        ref={sectionRef}
        id="Achievements"
        className="bgstyle"
        style={{
          background: `
            radial-gradient(circle at top left, rgba(255, 255, 255, 0.4) ${radius + 15}%, transparent ${radius + 15}%),
            radial-gradient(circle at top right, rgba(255, 255, 255, 0.4) ${radius}%, rgb(82, 188, 217) 1%)
          `
        }}>
        <div className="navachieve">
        <h1>Achievements And Services</h1>
        <p>Choose your business needs below</p>  
        </div>

        <div className="serviceslist">
          <div
            className="slider"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="carousel-container">
              {services.map((service, i) => {
                const rotation = angle + i * degreeStep;   
                const transform = `
                  rotateY(${rotation}deg)
                  translateZ(${radius3D}px)
                `;

                return (
                 <div className="carousel-card" key={service.id} style={{ transform }}>
<div className="card-media">
  {service.type === 'image' ? (
    <img src={service.image} alt={service.title} />
  ) : (
    <video width="100%" height="100%" autoPlay loop muted>
      <source src={service.video} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  )}
</div>
<div className="card-content">
  <h3>{service.title}</h3>
  <div className="card-description">{service.description}</div>
              <button onClick={() => alert(`Added ${service.title} to cart`)}>
                  Add to Cart
              </button>
          </div>
        </div>
              );
            })}
          </div> 
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default Achievements;
