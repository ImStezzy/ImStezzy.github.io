import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./nav/Nav.js";
import About from "./about/About";
import Achievement from "./achievement/Achievement";
import Projects from "./projects/Projects";
import Contact from "./contact/Contact";
import "./styles/app.css";
import Background from "./background/Background.js";
import PlayerStats from "./playerStats/PlayerStats.js";
import AudioPlayer from "./audio/Audio.js";

const App = () => {
  return (
   <Router>
    <Nav/>
    <AudioPlayer/>
    <Background/>
    <Routes>
      <Route path="/" element={<About/>}/>
      <Route path="/achievement" element={<Achievement/>}/>
      <Route path="/projects" element={<Projects/>}/>
      <Route path="/contact" element={<Contact/>}/>
    </Routes>
    <PlayerStats/>
   </Router>
  );
};

export default App;
