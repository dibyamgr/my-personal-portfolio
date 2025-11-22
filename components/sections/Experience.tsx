"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "../../styles/Experience.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ExperienceItem {
  title: string;
  company: string;
  date: string;
  summary: string;
  highlights: string[];
}

const experiences: ExperienceItem[] = [
  {
    title: "Frontend Developer Intern",
    company: "Global Maritime - St. John's, Canada",
    date: "Oct 2025 - Present • Part of the GSE Program by PSDP MUN",
    summary: "Building the next-gen Deck Optimizer system with stunning interactive UIs and maritime-themed designs",
    highlights: [
      "Crafted an interactive UI for the Deck Optimizer featuring realistic SVG container visuals with smooth drag-and-drop magic",
      "Built a dynamic container library panel by weaving frontend components with Flask/Jinja backend data for real-time rendering",
      "Designed responsive maritime-themed layouts using Bootstrap, custom CSS, and JavaScript with glassmorphism and gradient vibes",
      "Integrated static HTML templates with backend APIs using Jinja, creating reusable components for vessel selection and deck views",
      "Enhanced UX with interactive dashboards and tool panels that make maritime container management actually enjoyable",
    ],
  },
  {
    title: "SWE Intern",
    company: "Angler Solutions Inc, St. John's, Canada",
    date: "Apr 2020 - Jul 2021 • 1 yr 4 mos",
    summary: "Full-stack development journey with the MERN stack, building scalable apps and making friends with Git merge conflicts",
    highlights: [
      "Developed full-stack applications using MongoDB, Express.js, React.js, and Node.js",
      "Collaborated with cross-functional teams to deliver high-quality features on tight deadlines",
      "Implemented RESTful APIs and integrated third-party services for enhanced functionality",
      "Participated in code reviews and contributed to improving team coding standards",
      "Learned that 'quick fix' is never actually quick (but got really good at debugging!)",
    ],
  },
  {
    title: "Full Stack Engineer",
    company: "Portpro Technologies, Nepal, US-based",
    date: "Jul 2021 - Feb 2023 • 1 yr 8 mos",
    summary: "Architected complex web apps, optimized databases, and became the 'why is this slow?' detective",
    highlights: [
      "Architected and developed complex web applications handling high traffic and large datasets",
      "Implemented and optimized RESTful APIs reducing response times by 40%",
      "Redesigned database queries and indexing strategies for maximum performance",
      "Led migration from monolithic to microservices architecture improving scalability",
      "Mentored junior developers on best practices for code quality and performance optimization",
      "Spoiler alert: It was usually the database queries (learned to love EXPLAIN ANALYZE)",
    ],
  },
  {
    title: "Frontend Developer",
    company: "Supreme Technologies",
    date: "Feb 2023 - Oct 2024 • 1 yr 9 mos",
    summary: "Led frontend initiatives, mentored devs, and discovered that naming variables is the true final boss of programming",
    highlights: [
      "Led frontend development for enterprise-level applications serving 10,000+ users",
      "Championed modern React patterns and TypeScript adoption across the team",
      "Implemented comprehensive testing strategies with Jest and React Testing Library",
      "Mentored 5+ junior developers through pair programming and code review sessions",
      "Established frontend best practices and coding standards that improved code quality by 60%",
      "Finally accepted that 'temp' and 'data2' are not acceptable variable names",
    ],
  },
  {
    title: "UI/UX and Frontend Developer",
    company: "Diprung Technologies",
    date: "Feb 2023 - Oct 2024 • 1 yr 9 mos",
    summary: "Bridged design and development, creating beautiful interfaces that users actually love to use",
    highlights: [
      "Designed and developed user interfaces with focus on accessibility and user experience",
      "Conducted user research and usability testing to inform design decisions",
      "Created design systems and component libraries for consistent UI across products",
      "Collaborated with designers and product managers to translate mockups into pixel-perfect implementations",
      "Reduced user friction by 35% through iterative UX improvements based on analytics",
      "Proved that developers can have good taste in colors (sometimes)",
    ],
  },
];

export default function Experience() {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
  const [lineHeight, setLineHeight] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const MAX_VISIBLE_HIGHLIGHTS = 3;

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    itemRefs.current.forEach((ref, index) => {
      if (!ref) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleItems((prev) => new Set([...prev, index]));

              // GSAP animation for the card
              gsap.from(entry.target, {
                x: index % 2 === 0 ? -100 : 100,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
              });
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

      const visibleTop = Math.max(0, -rect.top);
      const visibleBottom = Math.min(rect.height, viewportHeight - rect.top);
      const visibleHeight = Math.max(0, visibleBottom - visibleTop);

      const percentage = Math.min(
        100,
        (visibleHeight / rect.height) * 100 + 10
      );

      setLineHeight(percentage);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleExpanded = (index: number) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <section className={styles.section} id="experience">
      <h2 className="section-title">Journey So Far</h2>
      <p className="section-subtitle">
        // The story of coffee, code, and continuous learning
      </p>

      <div className={styles.timeline} ref={timelineRef}>
        <div className={styles.timelineLine}>
          <div
            className={styles.timelineLineProgress}
            style={{ height: `${lineHeight}%` }}
          />
        </div>

        {experiences.map((exp, index) => {
          const isExpanded = expandedItems.has(index);
          const displayedHighlights = isExpanded
            ? exp.highlights
            : exp.highlights.slice(0, MAX_VISIBLE_HIGHLIGHTS);
          const hasMore = exp.highlights.length > MAX_VISIBLE_HIGHLIGHTS;

          return (
            <div
              key={index}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              className={`${styles.timelineItem} ${
                visibleItems.has(index) ? styles.visible : ""
              }`}
            >
              <div className={styles.timelineDotContainer}>
                <div className={styles.timelineDot}>
                  <div className={styles.dotInner} />
                  <div className={styles.dotPulse} />
                </div>
              </div>

              <div className={styles.timelineContent}>
                <div className={styles.cardGlow} />
                <div className={styles.timelineHeader}>
                  <h3 className={styles.timelineTitle}>{exp.title}</h3>
                  <div className={styles.timelineCompany}>{exp.company}</div>
                  <div className={styles.timelineDate}>{exp.date}</div>
                </div>

                <p className={styles.timelineSummary}>{exp.summary}</p>

                <ul className={styles.highlightsList}>
                  {displayedHighlights.map((highlight, hIndex) => (
                    <li key={hIndex} className={styles.highlightItem}>
                      <span className={styles.bullet}>▹</span>
                      {highlight}
                    </li>
                  ))}
                </ul>

                {hasMore && (
                  <button
                    className={styles.showMoreBtn}
                    onClick={() => toggleExpanded(index)}
                  >
                    {isExpanded ? (
                      <>
                        Show Less <span className={styles.arrow}>▲</span>
                      </>
                    ) : (
                      <>
                        Show {exp.highlights.length - MAX_VISIBLE_HIGHLIGHTS} More{" "}
                        <span className={styles.arrow}>▼</span>
                      </>
                    )}
                  </button>
                )}

                <div className={styles.cardCorner} data-corner="top-left" />
                <div className={styles.cardCorner} data-corner="top-right" />
                <div className={styles.cardCorner} data-corner="bottom-left" />
                <div className={styles.cardCorner} data-corner="bottom-right" />
              </div>
            </div>
          );
        })}

        <div className={styles.timelineEnd}>
          <div className={styles.endDot}>
            <span className={styles.endText}>The journey continues...</span>
          </div>
        </div>
      </div>
    </section>
  );
}
