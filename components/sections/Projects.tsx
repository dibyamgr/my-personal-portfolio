"use client";

import styles from "../../styles/Projects.module.css";

const projects = [
  {
    title: "Intelligent RAG-Powered Chatbot for University Students",
    description:
      "Built on Retrieval-Augmented Generation, combining semantic search with Google Gemini 2.0 Flash for accurate, contextual responses",
    icon: "🧠",
    tech: ["NodeJS", " PostgreSQL (Neon)", "openai", "React", "langchain"],
  },
  {
    title: "Assignment Management System",
    description:
      "Comprehensive system for managing submissions, deadlines, and grading with role-based access control.",
    icon: "📚",
    tech: ["C#", ".NET", "SQL"],
  },
  {
    title: "Sales Tracking System",
    description:
      "Advanced analytics platform for comprehensive sales data tracking, reporting, and forecasting capabilities.",
    icon: "📊",
    tech: ["C#", "SQL", "Analytics"],
  },
  {
    title: "Banking Application",
    description:
      "Secure Java-based banking system with comprehensive account management and transaction processing features.",
    icon: "🏦",
    tech: ["Java", "Security", "Database"],
  },
];

export default function Projects() {
  return (
    <section id="projects">
      <h2 className="section-title">Cool Stuff I've Built</h2>
      <p className="section-subtitle">
        // From ideas to reality, one commit at a time
      </p>

      <div className={styles.projectsSection}>
        {/* Featured Project */}
        <div className={styles.featuredProject}>
          <div className={styles.featuredBadge}>FEATURED PROJECT</div>
          <div className={styles.featuredContent}>
            <div className={styles.featuredInfo}>
              <h3>AI-Powered Voice E-commerce System</h3>
              <p className={styles.featuredDescription}>
                A revolutionary shopping experience that lets users browse and
                purchase products using natural voice commands. Integrated
                Google Cloud Speech-to-Text API with a custom Python NLP
                microservice to understand user intent and deliver accurate
                results. Built with modern tech stack for scalability and
                performance.
              </p>
              <div className={styles.projectTech}>
                <span className={styles.techTag}>Next.js</span>
                <span className={styles.techTag}>Node.js</span>
                <span className={styles.techTag}>Express.js</span>
                <span className={styles.techTag}>Google Cloud</span>
                <span className={styles.techTag}>Python</span>
                <span className={styles.techTag}>NLP</span>
                <span className={styles.techTag}>MongoDB</span>
              </div>
              <div className={styles.projectLinks}>
                <a href="#" className={styles.projectLink}>
                  GitHub
                </a>
                <a href="#" className={styles.projectLink}>
                  Live Demo
                </a>
              </div>
            </div>
            <div className={styles.featuredVisual}>
              <div className={styles.projectEmoji}>🎤</div>
            </div>
          </div>
        </div>

        {/* Project Grid */}
        <div className={styles.projectsGrid}>
          {projects.map((project, index) => (
            <div key={index} className={styles.projectCard}>
              <div className={styles.projectHeader}>
                <div className={styles.projectEmoji}>{project.icon}</div>
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
