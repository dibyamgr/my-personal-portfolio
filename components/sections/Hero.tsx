"use client";

import { useEffect, useState } from "react";
import styles from "../../styles/Hero.module.css";

export default function Hero() {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const texts = [
    "Full-Stack Software Engineer",
    "Code Enthusiast",
    "UI/UX Specialist",
    "MERN Specialist",
    "Problem Solver",
    "AI Enthusiast",
    "Detail-Oriented Developer",
  ];

  useEffect(() => {
    const currentText = texts[currentIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayedText.length < currentText.length) {
            setDisplayedText(currentText.slice(0, displayedText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (displayedText.length > 0) {
            setDisplayedText(displayedText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentIndex((currentIndex + 1) % texts.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentIndex]);

  return (
    <section className={styles.hero} id="home">
      <div className={styles.heroContent}>
        <h1 className={styles.glitchText}>DIBYA RS MAGAR</h1>

        <div className={styles.typingText}>
          <span>{displayedText}</span>
          <span className={styles.cursorTyping}></span>
        </div>

        {/* <div className={styles.funBadge}>
          Full Stack Wizard • Code Enthusiast • Dream Builder • Robot Friend 🤖
        </div> */}

        <p className={styles.heroDescription}>
          I’m a Full-Stack Developer with 6 years of professional experience
          building scalable and user-friendly applications. Passionate about AI
          and emerging technologies, I enjoy integrating intelligent solutions
          into software to solve complex problems efficiently. I continuously
          sharpen my skills, currently pursuing a Master’s in Software
          Engineering, and I love exploring new technologies while crafting
          elegant, efficient solutions—sometimes with a little caffeine-fueled
          creativity thrown in.
        </p>

        <div className={styles.heroStats}>
          <StatItem number={5} label="Years of Passion" />
          <StatItem number={30} label="Projects Built" />
          <StatItem number={999} label="Bugs Squashed" />
          <StatItem number={15} label="Tech Stack" />
        </div>

        <div className={styles.terminalBox}>
          <div className={styles.terminalHeader}>
            <div className={`${styles.terminalBtn} ${styles.btnRed}`}></div>
            <div className={`${styles.terminalBtn} ${styles.btnYellow}`}></div>
            <div className={`${styles.terminalBtn} ${styles.btnGreen}`}></div>
          </div>
          <div className={styles.terminalContent}>
            <div className={styles.terminalLine}>whoami</div>
            <div>
              dibya@developer:~$ Full Stack Developer | MERN Specialist | Code
              Enthusiast
            </div>
            <div className={styles.terminalLine} style={{ marginTop: "10px" }}>
              cat passions.txt
            </div>
            <div>Building cool stuff • Learning new tech • Creating impact</div>
            <div className={styles.terminalLine} style={{ marginTop: "10px" }}>
              echo $TECH_STACK
            </div>
            <div>React | Node.js | Python | MongoDB | TypeScript | Next.js</div>
          </div>
        </div>

        <div className={styles.ctaButtons}>
          <a href="#projects" className={styles.btn}>
            View My Works ✨
          </a>
          <a href="#contact" className={styles.btn}>
            Let's Connect
          </a>
        </div>
      </div>
    </section>
  );
}

function StatItem({
  number,
  label,
  decimals = false,
}: {
  number: number;
  label: string;
  decimals?: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = number / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= number) {
        setCount(number);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [number]);

  return (
    <div className={styles.statItem}>
      <div className={styles.statNumber}>
        {decimals ? count.toFixed(1) : Math.floor(count)}+
      </div>
      <div className={styles.statLabel}>{label}</div>
    </div>
  );
}
