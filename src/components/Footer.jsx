import React from "react";
import tw from "../../public/assets/images/tw.png";
import fb from "../../public/assets/images/fb.png";
import youtube from "../../public/assets/images/youtube.png";
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  GitHub,
  YouTube,
} from "@mui/icons-material";
import "../styles/footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  const socialLinks = [
    { icon: <Facebook />, url: "https://facebook.com", color: "#1877f2", label: "Facebook" },
    { icon: <Twitter />, url: "https://twitter.com", color: "#1da1f2", label: "Twitter" },
    { icon: <Instagram />, url: "https://instagram.com", color: "#e4405f", label: "Instagram" },
    { icon: <LinkedIn />, url: "https://linkedin.com", color: "#0a66c2", label: "LinkedIn" },
    { icon: <GitHub />, url: "https://github.com", color: "#333", label: "GitHub" },
    { icon: <YouTube />, url: "https://youtube.com", color: "#ff0000", label: "YouTube" },
  ];

  const quickLinks = [
    { name: "Privacy Policy", url: "/privacypolicy" },
    { name: "Hyperlinking Policy", url: "/hyperlinkingpolicy" },
    { name: "Copyright Policy", url: "/copyrightPolicy" },
    { name: "Disclaimer", url: "/disclaimer" },
    { name: "Accessibility", url: "/accessibility" },
    { name: "Terms and Conditions", url: "/termsConditions" },
  ];

  

  return (
    <Box className="aprera-footer">
  {/* POLICY LINKS BAR */}
  <div className="aprera-policy-bar">
    <div className="aprera-policy-links">
      <Link to="/privacy-policy">Privacy Policy</Link> ›
      <Link to="/hyperlinking-policy">Hyperlinking Policy</Link> ›
      <Link to="/copyrightPolicy">Copyright Policy</Link> ›
      <Link to="/disclaimer">Disclaimer</Link> ›
      <Link to="/accessibility">Accessibility</Link> ›
      <Link to="/termsConditions">Terms & Conditions</Link> ›
      <Link to="/rateWebsite">Rate our website</Link>
    </div>

    <div className="aprera-policy-icons">
      <a className="aprera-icon aprera-fb" target="_blank" href="https://www.facebook.com/people/Andhra-Pradesh-Real-Estate-Regulatory-Authority/100067671638495/#">
        <img src={fb} />
      </a>
      <a className="aprera-icon aprera-tw" target="_blank" href="https://x.com/AP_RERA">
        <img src={tw} />
      </a>
      <a className="aprera-icon aprera-yt" target="_blank" href="https://www.youtube.com/channel/UC3LRSpXAhaiFkeBNtPLDdKA?view_as=subscriber">
        <img src={youtube} />
      </a>

      <i
        className="fa fa-angle-double-up aprera-icon aprera-up"
        aria-hidden="true"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      />
    </div>
  </div>

  {/* GOVT COPYRIGHT BAR */}
  <div className="aprera-govt-bar">
    <div className="aprera-govt-left">
      Copyright © 2017, All Rights Reserved by APRERA, Govt of A.P India
    </div>

    <div className="aprera-govt-center">
      <span className="aprera-label">No. Of Visitors :</span>
      <span className="aprera-counter">932969</span>
      <span className="aprera-updated">
        Last Updated on : 22/12/2025 17:14:45
      </span>
    </div>

    <div className="aprera-govt-right">
      Designed and Developed by
      <span className="aprera-aponline"> APOnline</span>
    </div>
  </div>
</Box>

  );
};

export default Footer;