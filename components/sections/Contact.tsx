"use client";

import styles from "../../styles/Contact.module.css";

const contactInfo = [
  {
    icon: "📧",
    label: "Email",
    value: "dibyamagar5@gmail.com",
    link: "mailto:dibyamagar5@gmail.com",
  },
  {
    icon: "💼",
    label: "LinkedIn",
    value: "dibyamagar56",
    link: "https://www.linkedin.com/in/dibyamagar56/",
  },
  {
    icon: "💻",
    label: "GitHub",
    value: "github.com/dibyamgr",
    link: "https://github.com/dibyamgr",
  },
  {
    icon: "🌐",
    label: "Website",
    value: "dibyarsmagar.com",
    link: "https://dibyarani.dev",
  },
];

export default function Contact() {
  return (
    <section id="contact">
      <h2 className="section-title">Let's Connect</h2>
      <p className="section-subtitle">
        // I promise I'll respond faster than my last git push
      </p>

      <div className={styles.contactContainer}>
        <div className={styles.contactGrid}>
          {contactInfo.map((contact, index) => (
            <div
              key={index}
              className={styles.contactCard}
              onClick={() => window.open(contact.link, "_blank")}
            >
              <div className={styles.contactIcon}>{contact.icon}</div>
              <div className={styles.contactLabel}>{contact.label}</div>
              <div className={styles.contactValue}>{contact.value}</div>
            </div>
          ))}
        </div>

        <div className={styles.terminalBox}>
          <div className={styles.terminalHeader}>
            <div className={`${styles.terminalBtn} ${styles.btnRed}`}></div>
            <div className={`${styles.terminalBtn} ${styles.btnYellow}`}></div>
            <div className={`${styles.terminalBtn} ${styles.btnGreen}`}></div>
          </div>
          <div className={styles.terminalContent}>
            <div className={styles.terminalLine}>
              git clone https://github.com/dibyamgr/awesome-collaboration.git
            </div>
            <div>Cloning into 'awesome-collaboration'...</div>
            <div>remote: Counting objects: 100% complete.</div>
            <div className={styles.terminalLine} style={{ marginTop: "10px" }}>
              cd awesome-collaboration && npm install
            </div>
            <div>Installing dependencies...</div>
            <div className={styles.terminalLine} style={{ marginTop: "10px" }}>
              npm start
            </div>
            <div style={{ color: "var(--primary)" }}>
              ✓ Ready! Let's build something epic together!
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
