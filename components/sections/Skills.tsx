"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "../../styles/Skills.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const skillsData = [
  {
    icon: "⚛️",
    title: "Frontend Development",
    skills: [
      "React.js",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "HTML/CSS/SASS",
      "Styled Components",
      "Vue.js",
      "Angular.js",
    ],
  },
  {
    icon: "⚙️",
    title: "Backend Development",
    skills: [
      "Node.js",
      "Express.js",
      "Temporal",
      "GraphQL",
      "REST APIs",
      "Microservices",
      "Laravel",
      "Python",
    ],
  },
  {
    icon: "🤖",
    title: "AI & Machine Learning",
    skills: [
      "OpenAI GPT",
      "Google Gemini",
      "LangChain",
      "RAG Systems",
      "NLP",
      "TensorFlow",
      "Prompt Engineering",
      "Vector Databases",
    ],
  },
  {
    icon: "💾",
    title: "Database & Tools",
    skills: ["MongoDB", "PostgreSQL", "Timescale", "Redis", "Firebase", "SQL", "Pinecone", "ChromaDB"],
  },
  {
    icon: "🛠️",
    title: "DevOps & Cloud",
    skills: ["Git/GitHub", "Docker", "AWS", "GCP", "CI/CD", "Webpack", "Figma"],
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (skillsRef.current) {
      const cards = skillsRef.current.querySelectorAll(`.${styles.skillCategory}`);

      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 50,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, []);

  return (
    <section id="skills" ref={sectionRef}>
      <h2 className="section-title">My Arsenal</h2>
      <p className="section-subtitle">
        // Technologies I wield to craft digital experiences
      </p>

      <div className={styles.skillsCategories} ref={skillsRef}>
        {skillsData.map((category, index) => (
          <div key={index} className={styles.skillCategory}>
            <div className={styles.skillHeader}>
              <div className={styles.skillIcon}>{category.icon}</div>
              <div className={styles.skillCategoryTitle}>{category.title}</div>
            </div>
            <div className={styles.skillItems}>
              {category.skills.map((skill, skillIndex) => (
                <span key={skillIndex} className={styles.skillTag}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
