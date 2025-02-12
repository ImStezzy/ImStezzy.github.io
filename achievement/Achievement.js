import React, { Component } from 'react';
import "../styles/achievementStyle.css";
import Carousel from "../carouselAchievement/Carousel";

export default class Achievement extends Component {
  render() {
    return (
      <div className="achievement-container">
        <Carousel /> {/* Tambahkan Carousel di sini */}
      </div>
    );
  }
}