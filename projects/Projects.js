import React, { Component } from 'react';
import "../styles/projectStyle.css";
import Carousel from "../carouselProjects/Carousel";
import "../styles/button.css";

export default class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      downloadUrl: "/MabelHewanSerangga/FileGame.rar", // URL default untuk item pertama
      currentTopic: "", // Menambahkan currentTopic untuk melacak topik saat ini
    };
  }

  setDownloadUrl = (url, topic) => {
    this.setState({ downloadUrl: url, currentTopic: topic }); // Simpan URL dan topik
  };

  render() {
    const { downloadUrl, currentTopic } = this.state;

    return (
      <div className="projects-container">
        <Carousel setDownloadUrl={this.setDownloadUrl} /> {/* Menghubungkan ke Carousel */}
        
        {/* Hanya tampilkan tombol download jika currentTopic bukan "MY PORTOFOLIO" */}
        {currentTopic !== "MY PORTOFOLIO" && (
          <a
            href={downloadUrl} // Menggunakan href untuk mengarahkan ke file
            download
            className="download-button"
          >
            Download
          </a>
        )}
      </div>
    );
  }
}
