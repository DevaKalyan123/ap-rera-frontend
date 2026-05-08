import React from "react";
import "../styles/videoTutorial.css";

const VideoTutorial = () => {
  return (
    <div className="vt-wrapper">
      <div className="vt-breadcrumb">
        You are here :
        <span> Home </span> /
        <span> Registration </span> /
        <b> Video Tutorials </b>
      </div>

      <h2 className="vt-title">Video Tutorials</h2>

      <table className="vt-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Video Title</th>
            <th>Video Description</th>
            <th>Video Link</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>----No---</td>
            <td>----No---</td>
            <td>----No---</td>
            <td>----No---</td>
          </tr>

          <tr>
            <td>----No---</td>
            <td>----No---</td>
            <td>----No---</td>
            <td>----No---</td>
          </tr>

          <tr>
            <td>----No---</td>
            <td>----No---</td>
            <td>----No---</td>
            <td>----No---</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default VideoTutorial;