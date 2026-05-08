import React from "react";
import "../styles/AudioVisualGallery.css";

const audioFiles = [
 "../../public/assets/Audios/jingle1.mp3",
  "../../public/assets/Audios/jingle2.mp3",
  "../../public/assets/Audios/jingle3.mp3",
  "../../public/assets/Audios/jingle4.mp3",
  "../../public/assets/Audios/jingle5.mp3",
  "../../public/assets/Audios/jingle6.mp3",
];

export default function AudioVisualGallery() {
  return (
    <div className="avg-wrapper">
      <div className="avg-container">

        <div className="avg-breadcrumb">
          You are here : <span>Home</span> / <span>Promotions</span> /{" "}
          <strong>Audio Visual Gallery</strong>
        </div>
      <div className="avg-mainheader">
        <h2 className="avg-page-title">Audio Jingles</h2>
        <div className="avg-title-underline"></div>

        <div className="avg-audio-grid">
          {audioFiles.map((src, index) => (
            <div className="avg-audio-box" key={index}>
              <audio
                controls
                preload="metadata"
                src={src}
              />
            </div>
          ))}
        </div>

        <h2 className="avg-page-title">Videos</h2>
        <div className="avg-title-underline"></div>
        <div className="avg-accordion">
          <div className="avg-accordion-header">+ Videos</div>
        </div>

        <h2 className="avg-page-title">Photo Gallery</h2>
        <div className="avg-title-underline"></div>
        <div className="avg-accordion">
          <div className="avg-accordion-header">+ Office Inauguration Photos</div>
          <div className="avg-accordion-header">+ Website Launch Photos</div>
        </div>
</div>
      </div>
    </div>
  );
}