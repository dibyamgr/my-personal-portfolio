"use client";

import { useEffect, useRef } from "react";
import "./CustomCursor.css";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorFollower = followerRef.current;

    if (!cursor || !cursorFollower) return;

    let mouseX = 0,
      mouseY = 0;
    let followerX = 0,
      followerY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + "px";
      cursor.style.top = mouseY + "px";
    };

    const animateFollower = () => {
      followerX += (mouseX - followerX) * 0.1;
      followerY += (mouseY - followerY) * 0.1;
      cursorFollower.style.left = followerX + "px";
      cursorFollower.style.top = followerY + "px";
      requestAnimationFrame(animateFollower);
    };

    document.addEventListener("mousemove", handleMouseMove);
    animateFollower();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="cursor"></div>
      <div ref={followerRef} className="cursor-follower"></div>
    </>
  );
}
