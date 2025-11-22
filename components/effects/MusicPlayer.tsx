"use client";

import { useState, useRef, useEffect } from "react";
import { FaMusic, FaPlay, FaPause } from "react-icons/fa";
import styles from "../../styles/MusicPlayer.module.css";

const funMessages = [
  "Vibing to some chill beats 🎵",
  "Code better with lofi 💻",
  "Productivity mode: ON 🚀",
  "Let the music flow ✨",
  "Chillin' and codin' 😎",
  "Lofi beats to code to 🎧",
  "Good vibes only 🌊",
  "Smooth sounds ahead 🎶",
];

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(funMessages[0]);
  const [showTooltip, setShowTooltip] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Change fun message periodically
    const interval = setInterval(() => {
      setCurrentMessage(funMessages[Math.floor(Math.random() * funMessages.length)]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // Using a lofi music stream URL (you can replace with your preferred lofi playlist)
        // For now, using a placeholder - you can add actual lofi music files
        audioRef.current.play().catch(err => {
          console.log("Audio play failed:", err);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <div
        className={styles.musicPlayer}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={toggleMusic}
      >
        <div className={`${styles.musicIcon} ${isPlaying ? styles.playing : ""}`}>
          {isPlaying ? <FaPause /> : <FaMusic />}
        </div>

        {isPlaying && (
          <div className={styles.visualizer}>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
          </div>
        )}

        {showTooltip && (
          <div className={styles.tooltip}>
            {currentMessage}
          </div>
        )}
      </div>

      <audio
        ref={audioRef}
        loop
        // You can add your lofi music file here
        // For demonstration, using a data URL for a simple tone
        // Replace with actual lofi music URL or file
      >
        <source src="/audio/lofi-background.mp3" type="audio/mpeg" />
      </audio>
    </>
  );
}
