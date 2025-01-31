import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <section id="contato" className={styles.contato}>
      <h2> Contato</h2>
      <div>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          Twitter
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>
      </div>
    </section>
  );
};

export default Footer;
