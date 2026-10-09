import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Terminal from "./components/Terminal";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Games from "./components/Games";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CodeBackground from "./components/CodeBackground";
import CustomCursor from "./components/CustomCursor";

export default function App() {
  return (
    <div className="min-h-screen bg-surface relative">
      <CustomCursor />
      <CodeBackground />
      <div className="relative" style={{ zIndex: 1 }}>
        <Header />
        <main>
          <Hero />
          <About />
          <Terminal />
          <Experience />
          <Skills />
          <Games />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
