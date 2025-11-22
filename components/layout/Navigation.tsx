"use client";

import { useState, useEffect, useRef } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { gsap } from "gsap";
import styles from "../../styles/Navigation.module.css";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [activeSection, setActiveSection] = useState("home");
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Animate navigation on mount
    if (navRef.current) {
      gsap.from(navRef.current, {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 100);

      // Update active section based on scroll position
      const sections = ["home", "about", "skills", "journey", "projects", "contact"];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });

      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.body.setAttribute("data-theme", newTheme);

    // GSAP animation for theme toggle
    gsap.from("body", {
      opacity: 0.8,
      duration: 0.3,
      ease: "power2.inOut",
    });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav ref={navRef} className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.navContainer}>
        <div className={styles.logo}>
          <span className={styles.bracket}>{"<"}</span>
          <span className={styles.logoText}>DIBYA</span>
          <span className={styles.bracket}>{"/>"}</span>
          <span className={styles.cursor}>|</span>
        </div>

        <ul className={styles.navLinks}>
          {["home", "about", "skills", "journey", "projects", "contact"].map((section) => (
            <li key={section}>
              <a
                href={`#${section}`}
                onClick={(e) => handleNavClick(e, section)}
                className={activeSection === section ? styles.active : ""}
              >
                <span className={styles.linkPrefix}>{"{"}</span>
                {section}
                <span className={styles.linkSuffix}>{"}"}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className={styles.themeToggleContainer}>
          <button
            className={styles.themeToggle}
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            <div className={`${styles.toggleTrack} ${theme === "light" ? styles.light : ""}`}>
              <div className={styles.toggleThumb}>
                {theme === "dark" ? (
                  <FaMoon className={styles.icon} />
                ) : (
                  <FaSun className={styles.icon} />
                )}
              </div>
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
}
