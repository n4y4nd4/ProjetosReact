import React, { useState } from "react";
import styles from "./Header.module.css";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={styles.header}>
      <h1 className="numVoto">VOTE 28</h1>
      <button className={styles.hamburger} onClick={toggleMenu}>
        ☰
      </button>
      <nav>
        <ul className={`${styles.navbar} ${isOpen ? styles.open : ""}`}>
          <li>
            <a href="#biografia" className={styles["nav-link"]}>
              Biografia
            </a>
          </li>
          <li>
            <a href="#propostas" className={styles["nav-link"]}>
              Propostas
            </a>
          </li>
          <li>
            <a href="#agenda" className={styles["nav-link"]}>
              Agenda
            </a>
          </li>
          <li>
            <a href="#contato" className={styles["nav-link"]}>
              Contato
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
