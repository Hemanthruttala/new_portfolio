import { MotionConfig } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import StatsCounter from "./components/StatsCounter";
import About from "./components/About";
import Skills from "./components/Skills";
import CodePlayground from "./components/CodePlayground";
import Projects from "./components/Projects";
import InteractiveTerminal from "./components/InteractiveTerminal";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import ParticleBackground from "./components/ParticleBackground";

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen">
        {/* Fixed particle network (behind everything) */}
        <ParticleBackground />

        {/* Navigation */}
        <Navbar />

        {/* Main content */}
        <main id="main-content" className="relative z-10">
          <Hero />
          <StatsCounter />
          <About />
          <Skills />
          <CodePlayground />
          <Projects />
          <InteractiveTerminal />
          <Certifications />
          <Contact />
        </main>

        <Footer />
        <BackToTop />
      </div>
    </MotionConfig>
  );
}

export default App;
