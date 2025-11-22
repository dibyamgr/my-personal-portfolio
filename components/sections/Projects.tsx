"use client";

import { useEffect, useRef } from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "../../styles/Projects.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Project {
  title: string;
  description: string;
  icon: string;
  tech: string[];
  featured?: boolean;
  liveLink?: string;
  githubLink?: string;
}

const projects: Project[] = [
  {
    title: "AI-Powered Voice E-commerce System",
    description:
      "A revolutionary shopping experience that lets users browse and purchase products using natural voice commands. Integrated Google Cloud Speech-to-Text API with a custom Python NLP microservice to understand user intent and deliver accurate results.",
    icon: "🎤",
    tech: ["Next.js", "Node.js", "Express.js", "Google Cloud", "Python", "NLP", "MongoDB"],
    featured: true,
    liveLink: "https://voice-ecommerce.demo",
    githubLink: "https://github.com/yourusername/voice-ecommerce",
  },
  {
    title: "Intelligent RAG-Powered Chatbot for University Students",
    description:
      "Built on Retrieval-Augmented Generation, combining semantic search with Google Gemini 2.0 Flash for accurate, contextual responses",
    icon: "🧠",
    tech: ["NodeJS", "PostgreSQL (Neon)", "OpenAI", "React", "LangChain"],
    featured: false,
    liveLink: "https://university-chatbot.demo",
    githubLink: "https://github.com/yourusername/rag-chatbot",
  },
  {
    title: "Assignment Management System",
    description:
      "Comprehensive system for managing submissions, deadlines, and grading with role-based access control.",
    icon: "📚",
    tech: ["C#", ".NET", "SQL"],
    featured: false,
    githubLink: "https://github.com/yourusername/assignment-system",
  },
  {
    title: "Sales Tracking System",
    description:
      "Advanced analytics platform for comprehensive sales data tracking, reporting, and forecasting capabilities.",
    icon: "📊",
    tech: ["C#", "SQL", "Analytics"],
    featured: false,
    liveLink: "https://sales-tracker.demo",
  },
  {
    title: "Banking Application",
    description:
      "Secure Java-based banking system with comprehensive account management and transaction processing features.",
    icon: "🏦",
    tech: ["Java", "Security", "Database"],
    featured: false,
    githubLink: "https://github.com/yourusername/banking-app",
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (projectsRef.current) {
      const cards = projectsRef.current.querySelectorAll(`.${styles.projectCard}`);

      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 60,
          rotateX: -15,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, []);

  const featuredProject = projects.find((p) => p.featured);
  const regularProjects = projects.filter((p) => !p.featured);

  return (
    <section id="projects" ref={sectionRef}>
      <h2 className="section-title">Cool Stuff I've Built</h2>
      <p className="section-subtitle">
        // From ideas to reality, one commit at a time
      </p>

      <div className={styles.projectsSection}>
        {/* Featured Project */}
        {featuredProject && (
          <div className={styles.featuredProject}>
            <div className={styles.featuredBadge}>
              <span className={styles.badgeStar}>⭐</span>
              FEATURED PROJECT
              <span className={styles.badgeStar}>⭐</span>
            </div>
            <div className={styles.featuredContent}>
              <div className={styles.featuredInfo}>
                <h3>{featuredProject.title}</h3>
                <p className={styles.featuredDescription}>{featuredProject.description}</p>
                <div className={styles.projectTech}>
                  {featuredProject.tech.map((tech, index) => (
                    <span key={index} className={styles.techTag}>
                      {tech}
                    </span>
                  ))}
                </div>
                <div className={styles.projectLinks}>
                  {featuredProject.githubLink && (
                    <a
                      href={featuredProject.githubLink}
                      className={styles.projectLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaGithub />
                      <span>GitHub</span>
                    </a>
                  )}
                  {featuredProject.liveLink && (
                    <a
                      href={featuredProject.liveLink}
                      className={styles.projectLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaExternalLinkAlt />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
              <div className={styles.featuredVisual}>
                <div className={styles.projectEmoji}>{featuredProject.icon}</div>
              </div>
            </div>
          </div>
        )}

        {/* Project Grid */}
        <div className={styles.projectsGrid} ref={projectsRef}>
          {regularProjects.map((project, index) => (
            <div key={index} className={styles.projectCard}>
              <div className={styles.projectHeader}>
                <div className={styles.projectEmoji}>{project.icon}</div>
                <div className={styles.projectActions}>
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      className={styles.iconLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="View on GitHub"
                    >
                      <FaGithub />
                    </a>
                  )}
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      className={styles.iconLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="View Live Demo"
                    >
                      <FaExternalLinkAlt />
                    </a>
                  )}
                </div>
              </div>
              <h3 className={styles.projectTitle}>{project.title}</h3>
              <p className={styles.projectDescription}>{project.description}</p>
              <div className={styles.projectTech}>
                {project.tech.map((tech, techIndex) => (
                  <span key={techIndex} className={styles.techTag}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
