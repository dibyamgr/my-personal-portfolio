"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "../components/layout/Navigation";
import Hero from "../components/sections/Hero";
import Skills from "../components/sections/Skills";
import Projects from "../components/sections/Projects";
import Contact from "../components/sections/Contact";
import ScrollProgress from "../components/effects/ScrollProgress";
import CustomCursor from "../components/effects/CustomCursor";
import MusicPlayer from "../components/effects/MusicPlayer";
import Particles from "../components/animations/Particles";
import Link from "next/link";
import Experience from "../components/sections/Experience";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  useEffect(() => {
    // Smooth scroll for sections with GSAP
    gsap.utils.toArray("section").forEach((section: any, index) => {
      gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 30%",
          toggleActions: "play none none reverse",
        },
      });
    });
  }, []);

  return (
    <main>
      <CustomCursor />

      <ScrollProgress />

      <MusicPlayer />

      <Particles />

      <div className="grid-bg"></div>

      <Navigation />

      <Hero />

      {/* <FloatingCode /> */}

      <section id="about">
        <h2 className="section-title">About Me</h2>
        <p className="section-subtitle">// The human behind the code</p>
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
            Hey there! 👋 I'm wrapping up my final semester in the{" "}
            <span style={{ color: "var(--primary)", fontWeight: 600 }}>
              MASc. in Software Engineering
            </span>{" "}
            at{" "}
            <span style={{ color: "var(--primary)", fontWeight: 600 }}>
              <Link
                href="https://www.mun.ca/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Memorial University of Newfoundland and Labrador
              </Link>
            </span>
            , where I've been diving deep into scalable systems and modern
            software architectures (and occasionally questioning my life choices
            during final exams 😅).
            <br />
            <br />
            My journey has taken me through some amazing experiences! I've worked
            with{" "}
            <span style={{ color: "var(--primary)", fontWeight: 600 }}>
              <Link
                href="https://www.anglersolutions.ca/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Angler Solutions
              </Link>
            </span>{" "}
            on energy systems modeling, and I'm currently building awesome
            frontend experiences at{" "}
            <span style={{ color: "var(--primary)", fontWeight: 600 }}>
              <Link href="https://www.globalmaritime.com/">
                Global Maritime
              </Link>
            </span>{" "}
            through the GSE program by PSDP MUN. Each project teaches me
            something new, and I'm always excited to tackle the next challenge!
            <br />
            <br />
            When I'm not coding, you'll find me geeking out over the latest tech
            trends, getting lost in a good sci-fi book 📚, exploring new places
            (because life's too short to stay in one spot!), or creating fun
            content on TikTok. I believe in lifelong learning and that the best
            code is written by curious minds. ✨
          </p>

          <div
            style={{
              background: "linear-gradient(135deg, rgba(0, 225, 255, 0.1), rgba(185, 104, 255, 0.1))",
              border: "2px solid var(--primary)",
              borderRadius: "16px",
              padding: "35px 45px",
              margin: "50px auto",
              maxWidth: "700px",
              boxShadow: "0 8px 32px rgba(0, 225, 255, 0.2)",
            }}
          >
            <div
              style={{
                fontSize: "20px",
                fontStyle: "italic",
                color: "var(--primary)",
                lineHeight: "1.6",
                textAlign: "center",
                fontWeight: 500,
              }}
            >
              "In a world where you can be anything, be kind. And maybe write
              clean code too." 💚
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
