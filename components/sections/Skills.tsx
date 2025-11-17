"use client";

import styles from "../../styles/Skills.module.css";

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
    icon: "💾",
    title: "Database & Tools",
    skills: ["MongoDB", "PostgreSQL", "Timescale", "Redis", "Firebase", "SQL"],
  },
  {
    icon: "🛠️",
    title: "DevOps & Cloud",
    skills: ["Git/GitHub", "Docker", "AWS", "GCP", "CI/CD", "Webpack", "Figma"],
  },
];

export default function Skills() {
  return (
    <section id="skills">
      <h2 className="section-title">My Arsenal</h2>
      <p className="section-subtitle">
        // Technologies I use to build the digital world
      </p>

      <div className={styles.skillsCategories}>
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
