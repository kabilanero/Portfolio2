// src/App.jsx
import './App.css';
import About from './Components/About/About';
import Achievements from './Components/Achievements/Achievements';
import Homebutton from './Components/Formhandlings/Homebutton/Homebutton';
import Home from './Components/Home/Home';
import Location from './Components/Location/Location';
import Projects from './Components/Projects/Projects';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Skills from './Components/Skills/Skills';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Homepage route (your main layout) */}
        <Route path="/" element={
          <div className='section'>
            <Home />
            <About />
            <Projects />
            <Achievements />
            <Skills />
            <Location />
          </div>
         } />
        {/* Route to open in new tab */}
        <Route path="/Home/Hiremebutton" element={<Homebutton />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
