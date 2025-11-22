"use client";

import { useEffect, useState, useRef } from "react";
import styles from "../../styles/RobotCompanion.module.css";

const messages = [
  "Analyzing your scroll patterns... 📊",
  "Building something amazing? Let's code! 💻",
  "Optimizing user experience... ✨",
  "System status: Perfectly engineered 🤖",
  "Curiosity detected! Explore more below 🚀",
  "Coffee.exe is running... ☕",
];

export default function RobotCompanion() {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });
  const robotRef = useRef<HTMLDivElement>(null);

  // Eye tracking cursor movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!robotRef.current) return;

      const robot = robotRef.current.getBoundingClientRect();
      const robotCenterX = robot.left + robot.width / 2;
      const robotCenterY = robot.top + robot.height / 3;

      const deltaX = e.clientX - robotCenterX;
      const deltaY = e.clientY - robotCenterY;

      const angle = Math.atan2(deltaY, deltaX);
      const distance = Math.min(
        Math.sqrt(deltaX * deltaX + deltaY * deltaY) / 100,
        1
      );

      const eyeX = Math.cos(angle) * distance * 6;
      const eyeY = Math.sin(angle) * distance * 6;

      setEyePosition({ x: eyeX, y: eyeY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

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
    <div className={styles.robotCompanion} ref={robotRef}>
      <div
        className={`${styles.robotSpeechBubble} ${
          showMessage ? styles.show : ""
        }`}
        onClick={handleClick}
      >
        {messages[currentMessage]}
      </div>

      <div className={styles.robotBody}>
        {/* Modern antenna with pulse */}
        <div className={styles.robotAntenna}>
          <div className={styles.robotAntennaBall}></div>
        </div>

        {/* Realistic metallic head */}
        <div className={styles.robotHead}>
          <div className={styles.robotEyes}>
            <div className={styles.robotEye}>
              <div
                className={styles.robotPupil}
                style={{
                  transform: `translate(${eyePosition.x}px, ${eyePosition.y}px)`,
                }}
              >
                <div className={styles.robotPupilGlow}></div>
              </div>
            </div>
            <div className={styles.robotEye}>
              <div
                className={styles.robotPupil}
                style={{
                  transform: `translate(${eyePosition.x}px, ${eyePosition.y}px)`,
                }}
              >
                <div className={styles.robotPupilGlow}></div>
              </div>
            </div>
          </div>
          <div className={styles.robotMouth}></div>

          {/* Face panel details */}
          <div className={styles.robotFacePanel}></div>
        </div>

        {/* Metallic arms */}
        <div className={styles.robotArms}>
          <div className={`${styles.robotArm} ${styles.left}`}>
            <div className={styles.robotHand}></div>
          </div>
          <div className={`${styles.robotArm} ${styles.right}`}>
            <div className={styles.robotHand}></div>
          </div>
        </div>

        {/* Legs */}
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
