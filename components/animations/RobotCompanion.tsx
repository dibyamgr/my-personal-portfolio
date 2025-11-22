"use client";

import { useEffect, useState } from "react";
import styles from "../../styles/RobotCompanion.module.css";

const messages = [
  "Hi! I'm Dibya's Robot 🤖 Welcome to her amazing world of code!",
  "Let me show you around! Check out her incredible projects ✨",
  "Psst... she's really good at MERN stack! 💻",
  "Did you know? She has a perfect 4.0 GPA! 🎓",
  "Click anywhere to see more cool stuff! 🚀",
  "She loves building things that make a difference! 💚",
];

export default function RobotCompanion() {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    // Show first message after delay
    const initialTimeout = setTimeout(() => {
      setShowMessage(true);
    }, 3000);

    // Hide message after showing
    const hideTimeout = setTimeout(() => {
      setShowMessage(false);
    }, 8000);

    return () => {
      clearTimeout(initialTimeout);
      clearTimeout(hideTimeout);
    };
  }, []);

  useEffect(() => {
    // Cycle through messages
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 5000);
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    setCurrentMessage((prev) => (prev + 1) % messages.length);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 5000);
  };

  return (
    <div className={styles.robotCompanion}>
      <div
        className={`${styles.robotSpeechBubble} ${
          showMessage ? styles.show : ""
        }`}
        onClick={handleClick}
      >
        {messages[currentMessage]}
      </div>

      <div className={styles.robotBody}>
        <div className={styles.robotAntenna}>
          <div className={styles.robotAntennaBall}></div>
        </div>

        <div className={styles.robotHead}>
          <div className={styles.robotEyes}>
            <div className={styles.robotEye}>
              <div className={styles.robotPupil}></div>
            </div>
            <div className={styles.robotEye}>
              <div className={styles.robotPupil}></div>
            </div>
          </div>
          <div className={styles.robotMouth}></div>
        </div>

        <div className={styles.robotArms}>
          <div className={`${styles.robotArm} ${styles.left}`}>
            <div className={styles.robotHand}></div>
          </div>
          <div className={`${styles.robotArm} ${styles.right}`}>
            <div className={styles.robotHand}></div>
          </div>
        </div>

        <div className={styles.robotLegs}>
          <div className={styles.robotLeg}>
            <div className={styles.robotFoot}></div>
          </div>
          <div className={styles.robotLeg}>
            <div className={styles.robotFoot}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
