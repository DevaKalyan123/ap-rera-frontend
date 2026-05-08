import React from "react";
import { Link } from "react-router-dom";
import "../styles/vrPage.css";

export default function VRInnovation() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <section className="vr-page">

      {/* Breadcrumb */}
        <div className="homeview-gap-zone"></div>
            <div className="homeview-breadcrumb-bar">
              <span className="homeview-bread-text">You are here :</span>
              <Link className="homeview-bread-link" to="/">Home</Link>
              <span className="homeview-bread-slash">/</span>
              <span className="homeview-bread-current">VR inovation in construction</span>
            </div>

      <div className="vr-container">

        <h1 className="vr-title">VR Innovation In Construction</h1>
        <div className="vr-line"></div>

        <h2 className="vr-subtitle">What is Virtual Reality?</h2>

        <p className="vr-para">
          Virtual reality is a computer simulated environment, accessed through stereoscopic goggles that include a variety of different tracking mechanisms that track the viewer's movement in physical space, and matches those movements within the simulated 3D environment. Headsets display a stereoscopic image, viewed through built-in lenses that creates the illusion of looking out into a space. 3D renderings of the environment are captured in 'real-time' - which means the computer is processing and presenting a new rendering of the scene 60 to 120 times per second. This provides the viewer with a very realistic sense of what it would be like to inhabit the simulated environment, which is what makes it such a powerful opportunity for architectural visualization.
        </p>

        <h2 className="vr-subtitle">
          Why Does it Matter for Building Design and Construction?
        </h2>

        <ul className="vr-list">
          <li>
            People have a very hard time visualizing architectural concepts. It's nearly impossible for most people to fully understand what an architectural space will be like by viewing 2D floor plans, illustrations, animations or scale models. These are all ultimately abstract and distorted ways of visualizing a design, and not at all representative of how we experience architecture in the real world.With virtual reality, we can gain a very holistic understanding of what the building will feel like before investing the massive amount of resources it takes to make it a reality. It's a lot easier to change a pixel than it is to move a brick wall after it's built. VR helps people understand architecture in a way nothing else comes close to, which we believe will ultimately lead to the creation of better, more efficient built environment.
          </li>

          <li>
            Residential sales are another great area of opportunity for virtual reality going forward. Prospective homebuyers would be able to tour and customize a home before its purchase or even its construction, including options like layout and optional features, and even painting and furniture.
          </li>

          <li>
            There is also an opportunity to use virtual reality for professional training, helping workers learn about potential risks on the job site in a virtual reality setting or training them on heavy equipment operation in a virtual environment without deploying or risking any material assets.
          </li>
        </ul>

      </div>

      {/* Scroll to top */}
      <button className="vr-scroll-btn" onClick={scrollTop}>⬆</button>
    </section>
  );
}