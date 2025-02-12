import React, { Component } from "react";
import { Link, useLocation } from "react-router-dom";
import Hat from "../assets/Hat.png";
import achievement from "../assets/achievement.png";
import Stack from "../assets/Stack.png";
import envelope from "../assets/envelope.png";
import "../styles/nav.css";
import AudioPlayer from "../audio/Audio";


export default function Nav () {
  const location = useLocation();

  const getNavPositionClass = () =>{
    switch (location.pathname) {
      case "/":
        return "nav-about";
      case "/achievement":
        return "nav-achievement";
      case "/projects":
        return "nav-projects";
      case "/contact":
        return "nav-contact";
       default:
        return "";
    }
  };

  const getPageTitle = () => {
    switch (location.pathname) {
      case "/":
        return "ABOUT";
        case "/achievement":
          return "ACHIEVEMENT";
        case "/projects":
          return "PROJECTS";
        case "/contact":
          return "CONTACT";
        default:
          return "";
      }  
  };

  const navPositionClass = getNavPositionClass();
  const pageTitle = getPageTitle();

  const isCurrentPage = (navClass) => {
    return navClass === navPositionClass;
  };


  const renderNavLink = (to, imgSrc, altText, navClass) => {
    const isCurrent = isCurrentPage (navClass);
    const linkClass = isCurrent ? "nav-link current" : "nav-link"
  
    return(
      <Link to={to} className={linkClass}>
        <img src={imgSrc} alt={altText}/>
        {isCurrent && <h1 className='page-title'>{pageTitle}
        </h1>}
      </Link>
   );
  };

  return (
    <>
    <AudioPlayer />
   <nav className={`nav ${navPositionClass}`}>
     {renderNavLink(
      "/",
      Hat,
      "Hat icon",
      "nav-about"
      )}
      {renderNavLink("/achievement", achievement, "achievement icon",
      "nav-achievement")}
      {renderNavLink("/projects", Stack, "Stack icon",
      "nav-projects")}
      {renderNavLink("/contact", envelope, "envelope icon",
      "nav-contact")}
    </nav>
    </>
    );
  }