import React, { useEffect, useRef, useState } from 'react';
import './About.css';
import click from '../About/click.mp4'

function About() {
  const aboutRef = useRef(null);
  const Workpath=useRef(null);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [visibleItems, setVisibleItems] = useState([]);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [hmworkitems,sethmworkitems]=useState(null)

  const services = [
    'Web developer',
    'UI/UX developer',
    'Content Writer',
    'Freelancer'
  ];
  const Edupath=[
    {
      Title:"College",
      Name:"GCE-Salem",
      Grad:"ECE"
    },
    {
      Title:"Intern",
      Name:"Edureka",
      Grad:"Web-developer"
    },
    {
      Title:"Working",
      Name:"Telth Pvt.Ltd",
      Grad:"Web-developer"
    }
  ]

  // Scroll animation for circles
  useEffect(() => {
    const handleScroll = () => {
      if (!aboutRef.current) return;
      const section = aboutRef.current;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const scrolled = Math.min(Math.max((windowHeight - rect.top) / (windowHeight + rect.height), 0), 1);
      setScrollPercent(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Observer for typewriter animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          services.forEach((_, index) => {
            setTimeout(() => {
              setVisibleItems((prev) => [...prev, services[index]]);
            }, index * 2000); // 2 seconds per item
          });
        }
      },
      { threshold: 0.5 }
    );

    if (aboutRef.current) observer.observe(aboutRef.current);

    return () => observer.disconnect();
  }, [hasAnimated]);

  const translateX = scrollPercent * 1000;

  return (
    <div id="About" className="about" ref={aboutRef}>
      <h2 className="Abt-header">About</h2>
      <div className="workstatus">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className={`work${item}`}
            style={{
              transform: `translateX(${translateX}px)`,
              transition: 'transform 0.1s linear'
            }}
          />
        ))}
      </div>
      <div className="Services">
        <div className="Constant">
         <ul className="typewriter-list">
          <span className="iam">I am</span>
  {visibleItems.map((item, index) => {
    const allDone = visibleItems.length === services.length;
    return (
      <li
        key={index}
        className={`type-item ${allDone ? 'stop-blink' : ''}`}
      >
        <span>👉{item}</span>
      </li>
    );
  })}
</ul>
        </div>
      </div>
     <div className="workpath">
  <div className="borderline"></div>

  <div className="workitem">
    <div
      className="workitems"
     onMouseEnter={() => {
    if (!hmworkitems) sethmworkitems(true);
  }}
    ><video className="clickfile" src={click}></video></div>

    {hmworkitems && (
      <div className="aboutflipitems">
        {Edupath.map((Path, i) => (
          <div className="aboutflipcards" key={i}>
              <h3>{Path.Title}</h3>
              <p>{Path.Name}</p>
              <small>{Path.Grad}</small>
          
          </div>
        ))}
      </div>
    )}
  </div>
</div>


    </div>
  );
}

export default About;
