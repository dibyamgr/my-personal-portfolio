"use client";

import dynamic from "next/dynamic";
import Navigation from "../components/layout/Navigation";
import Hero from "../components/sections/Hero";
import Skills from "../components/sections/Skills";
import Projects from "../components/sections/Projects";
import Contact from "../components/sections/Contact";
import ScrollProgress from "../components/effects/ScrollProgress";
import CustomCursor from "../components/effects/CustomCursor";
import RobotCompanion from "../components/animations/RobotCompanion";
import Particles from "../components/animations/Particles";
import FloatingCode from "../components/effects/FloatingCode";
import Link from "next/link";
import Experience from "../components/sections/Experience";



export default function Home() {
  return (
    <main>
      <CustomCursor />

      <ScrollProgress />

      <RobotCompanion />

      <Particles />

      <div className="grid-bg"></div>

      <Navigation />

      <Hero />

      {/* <FloatingCode /> */}

      <section id="about">
        <h2 className="section-title">About Me</h2>
        <p className="section-subtitle">// More about me</p>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <p
            style={{
              fontSize: "18px",
              lineHeight: "2",
              color: "rgba(224, 224, 224, 0.8)",
              textAlign: "center",
              marginBottom: "40px",
            }}
          >
            I’m currently in my last semester of the MASc. in Software
            Engineering at{" "}
            <span style={{ color: "var(--primary)", fontWeight: 600 }}>
              <Link
                href="https://www.mun.ca/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Memorial University of Newfoundland and Labrador
              </Link>{" "}
            </span>{" "}
            , where I’m deepening my skills in designing scalable systems and
            modern software architectures. Recently, I completed an internship
            with{" "}
            <span style={{ color: "var(--primary)", fontWeight: 600 }}>
              <Link
                href=" https://www.anglersolutions.ca/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                Angler Solutions
              </Link>{" "}
            </span>
            in St. John’s, contributing to their energy systems modeling
            project. Today, I’m part of{" "}
            <span style={{ color: "var(--primary)", fontWeight: 600 }}>
              <Link href="https://www.globalmaritime.com/">
                {" "}
                Global Maritime{" "}
              </Link>
            </span>
            through the GSE program by PSDP MUN, contributing to the frontend
            development of a logistic management software while continuing to
            learn and grow as an engineer.
            <br />
            <br />
            Beyond work, I’m endlessly curious about the world. I follow the
            latest developments in science, get lost in a good book, explore new
            places through travel, and also create TikToks.
          </p>

          <div
            style={{
              background: "rgba(0, 255, 65, 0.05)",
              borderLeft: "4px solid var(--primary)",
              padding: "30px 40px",
              borderRadius: "8px",
              margin: "40px auto",
              maxWidth: "700px",
            }}
          >
            <div
              style={{
                fontSize: "20px",
                fontStyle: "italic",
                color: "var(--text)",
                lineHeight: "1.6",
                textAlign: "center",
              }}
            >
              "In a world where you can be anything, be kind."
            </div>
          </div>
        </div>
      </section>

      <Skills />

      <Experience />

      <Projects />

      <Contact />

      <footer
        style={{
          textAlign: "center",
          padding: "40px",
          background: "rgba(0, 0, 0, 0.5)",
          color: "rgba(224, 224, 224, 0.6)",
          fontFamily: '"Fira Code", monospace',
        }}
      >
        <p style={{ marginBottom: "10px" }}>
          Crafted with 💚, ☕, and a friendly robot by{" "}
          <span style={{ color: "var(--primary)" }}>Dibya RS Magar</span>
        </p>
        <p>© 2024 • Made with Next.js & Three.js magic 🤖</p>
      </footer>
    </main>
  );
}

function TimelineItem({
  year,
  title,
  company,
  description,
}: {
  year: string;
  title: string;
  company: string;
  description: string;
}) {
  return (
    <div
      style={{
        background: "rgba(0, 255, 65, 0.05)",
        border: "2px solid rgba(0, 255, 65, 0.2)",
        borderRadius: "20px",
        padding: "30px",
        marginBottom: "30px",
        transition: "all 0.4s",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--primary)";
        e.currentTarget.style.boxShadow = "0 20px 60px rgba(0, 255, 65, 0.3)";
        e.currentTarget.style.transform = "translateY(-10px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(0, 255, 65, 0.2)";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div
        style={{
          fontSize: "48px",
          fontWeight: 700,
          color: "var(--primary)",
          fontFamily: '"Space Mono", monospace',
          marginBottom: "10px",
          textShadow: "0 0 20px var(--primary)",
        }}
      >
        {year}
      </div>
      <h3 style={{ fontSize: "24px", fontWeight: 600, marginBottom: "10px" }}>
        {title}
      </h3>
      <div
        style={{
          color: "var(--primary)",
          fontFamily: '"Fira Code", monospace',
          marginBottom: "15px",
        }}
      >
        {company}
      </div>
      <p style={{ color: "rgba(224, 224, 224, 0.7)", lineHeight: "1.6" }}>
        {description}
      </p>
    </div>
  );
}
