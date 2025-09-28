import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import "./Footer.css";
import logo from "./logo_big.png"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__brand">
          <img src={logo} alt="Logo" className="footer__logo" />
          <h1 className="footer__title">Shoppers.com</h1>
        </div>
      </div>

      <div className="footer__middle">
        <div className="footer__section">
          <h3>Company</h3>
        </div>
        <div className="footer__section">
          <h3>Product</h3>
        </div>
        <div className="footer__section">
          <h3>Offices</h3>
        </div>
        <div className="footer__section">
          <h3>Contact</h3>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="footer__socials">
          <FaLinkedinIn className="footer__socialIcon" />
          <FaInstagram className="footer__socialIcon" />
          <FaFacebookF className="footer__socialIcon" />
        </div>
        <hr className="footer__divider" />
        <p className="footer__copyright">
          Copyright 2024 @ Shoppers.com - All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
