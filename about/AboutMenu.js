import React, { Component } from 'react';
import AboutMenuItem from "./AboutMenuItem";
import AboutSubheading from "./AboutSubheading";
import SubHeadingData from "./SubHeadingData";
import whoiamIcon from "../assets/moebius-triangle.png"
import academicIcon from "../assets/Toga.png"
import knowledgeIcon from "../assets/karir.png"

export default class AboutMenu extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
    activeMenuItem: 1,
    activeSubheading: 1,
  };
}
  
handleMenuItemClick = (menuItem) =>{
  this.setState({
    activeMenuItem: menuItem,
    activeSubheading: 1,
  });
};

handleSubheadingClick = (subheading) =>{
  this.setState({
    activeSubheading: subheading,
  });
};

  render() {
    const { activeMenuItem, activeSubheading } = this.state;
    const menuItems = ["WHO I AM", "ACADEMIC", "KNOWLEDGE"];
    const activeMenuTitle = menuItems [activeMenuItem - 1];
    const activeMenuIcon =
      activeMenuTitle === "WHO I AM"
      ? whoiamIcon
      : activeMenuTitle === "ACADEMIC"
      ? academicIcon
      : knowledgeIcon;

    const subheading = SubHeadingData[activeMenuItem];

    return (
    <>
    <div className="menu">
      {menuItems.map((item, index) => (
        <AboutMenuItem
        key={index}
        title={item}
        active={activeMenuItem === index + 1}
        onClick={() => this.handleMenuItemClick(index + 1)}
        />
      ))}
    </div>
     <div className="sub-container">
      <div className="icon-title-container">
        <img src={activeMenuIcon} alt={activeMenuTitle}
        className="icon"/>
        <h3>{activeMenuTitle}</h3>
      </div>
     {subheading.map((subheading, index) => (
       <AboutSubheading
       key={index}
       title={subheading.title}
       content={subheading.content}
       active={activeSubheading === index +1}
       onClick={() => this.handleSubheadingClick(index + 1)}
       menuItem={activeMenuItem}
       />
     ))}
   </div>
  </>
  );
 }
}
