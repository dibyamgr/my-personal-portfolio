import Hero from "../components/sections/Hero";
import Experience from "../components/sections/Experience";
import Navigation from "../components/layout/Navigation";
import Particles from "../components/animations/Particles";
import CustomCursor from "../components/effects/CustomCursor";

export default function Home() {
  return (
    <>
      <Particles />
      <CustomCursor />
      <Navigation />
      <div className="grid-bg" />
      <main>
        <Hero />
        <Experience />
      </main>
    </>
  );
}
