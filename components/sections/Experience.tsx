"use client";

import { useEffect, useRef, useState } from "react";
import styles from "../../styles/Experience.module.css";

interface ExperienceItem {
  title: string;
  company: string;
  date: string;
  description: string;
}

const experiences: ExperienceItem[] = [
  {
    title: "Frontend Developer Intern",
    company: "Global Maritime - St. John's, Canada",
    date: "Oct 2025 - Present • Part of the GSE Program by PSDP MUN",
    description:
      "Started my journey with the Professional Skills Development Program by Government of Newfoundland. Built responsive web applications, learned to love (and hate) CSS, and discovered that 'it works on my machine' isn't a valid debugging strategy. 🐛",
  },
  {
    title: "SWE Intern",
    company: "Angler Solutions Inc, St. John's, Canada",
    date: "Apr 2020 - Jul 2021 • 1 yr 4 mos",
    description:
      "Leveled up to full-stack development with the MERN stack. Built scalable applications, collaborated with awesome teams, and became best friends with Git merge conflicts. Also learned that 'quick fix' is never quick. ⚡",
  },
  {
    title: "Full Stack Engineer",
    company: "Portpro Technologies, Nepal, US-based",
    date: "Jul 2021 - Feb 2023 • 1 yr 8 mos",
    description:
      "Architected and developed complex web applications, implemented RESTful APIs, and optimized database queries for maximum performance. Became the go-to person for 'why is this slow?' questions. Spoiler: It's usually the database. 🚀",
  },
  {
    title: "Frontend Developer",
    company: "Supreme Technologies",
    date: "Feb 2023 - Oct 2024 • 1 yr 9 mos",
    description:
      'Led frontend development initiatives, mentored junior developers (yes, I\'m the "senior" now!), and championed best practices for code quality. Learned that naming variables is actually the hardest part of programming. No cap. 💯',
  },
  {
    title: "UI/UX and Frontend   Developer",
    company: "Diprung Technologies",
    date: "Feb 2023 - Oct 2024 • 1 yr 9 mos",
    description:
      'Led frontend development initiatives, mentored junior developers (yes, I\'m the "senior" now!), and championed best practices for code quality. Learned that naming variables is actually the hardest part of programming. No cap. 💯',
  },
];

export default function Experience() {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const [lineHeight, setLineHeight] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    itemRefs.current.forEach((ref, index) => {
      if (!ref) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleItems((prev) => new Set([...prev, index]));
            }
          });
        },
        {
          threshold: 0.2,
          rootMargin: "-50px",
        }
      );

      observer.observe(ref);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;

      const timeline = timelineRef.current;
      const rect = timeline.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Calculate how much of the timeline is visible
      const visibleTop = Math.max(0, -rect.top);
      const visibleBottom = Math.min(rect.height, viewportHeight - rect.top);
      const visibleHeight = Math.max(0, visibleBottom - visibleTop);

      // Calculate percentage (0 to 100)
      const percentage = Math.min(
        100,
        (visibleHeight / rect.height) * 100 + 10
      );

      setLineHeight(percentage);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial calculation

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className={styles.section} id="experience">
      <h2 className="section-title">Journey So Far</h2>
      <p className="section-subtitle">
        // Places where I've shipped code and drunk coffee
      </p>

      <div className={styles.timeline} ref={timelineRef}>
        {/* Animated timeline line */}
        <div className={styles.timelineLine}>
          <div
            className={styles.timelineLineProgress}
            style={{ height: `${lineHeight}%` }}
          />
        </div>

        {experiences.map((exp, index) => (
          <div
            key={index}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            className={`${styles.timelineItem} ${
              visibleItems.has(index) ? styles.visible : ""
            }`}
            style={{
              animationDelay: `${index * 0.2}s`,
            }}
          >
            {/* Animated dot */}
            <div className={styles.timelineDotContainer}>
              <div className={styles.timelineDot}>
                <div className={styles.dotInner} />
                <div className={styles.dotPulse} />
              </div>
            </div>

            {/* Content card */}
            <div className={styles.timelineContent}>
              <div className={styles.cardGlow} />
              <div className={styles.timelineHeader}>
                <h3 className={styles.timelineTitle}>{exp.title}</h3>
                <div className={styles.timelineCompany}>{exp.company}</div>
                <div className={styles.timelineDate}>{exp.date}</div>
              </div>
              <p className={styles.timelineDescription}>{exp.description}</p>

              {/* Decorative elements */}
              <div className={styles.cardCorner} data-corner="top-left" />
              <div className={styles.cardCorner} data-corner="top-right" />
              <div className={styles.cardCorner} data-corner="bottom-left" />
              <div className={styles.cardCorner} data-corner="bottom-right" />
            </div>
          </div>
        ))}

        {/* End marker */}
        <div className={styles.timelineEnd}>
          <div className={styles.endDot}>{/* <span>Present</span> */}</div>
        </div>
      </div>
    </section>
  );
}
