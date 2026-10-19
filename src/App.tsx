import { BrandRevealSection } from './components/BrandRevealSection';
import { BoomerangSection } from './BoomerangPage';
import { ContactButton, StartButton } from './components/Buttons';
import { FadeIn } from './components/FadeIn';
import { ProjectGallery } from './components/ProjectGallery';
import { ScrollChapter } from './components/ScrollChapter';
import { agentSystems } from './components/agentSystems';
import { TerminalPage } from './components/TerminalPage';


function HeroSection() {
  return <section className="hero"><div className="hero-background"><video aria-label="Hero background video" src="/hero-background.mp4" autoPlay loop muted playsInline /></div><FadeIn y={-20}><nav aria-label="Primary"><a href="#brand">BIBO</a><a href="#projects">Projects</a><a href="#contact">Contact</a></nav></FadeIn><FadeIn delay={0.15} y={40} className="hero-title-wrap"><h1 className="hero-heading">Hi, i&apos;m XX</h1></FadeIn><FadeIn delay={0.6} y={30} className="portrait-wrap"><video aria-label="Hero showcase video" src="/jack-hero.mp4" autoPlay loop muted playsInline /></FadeIn><div className="hero-bottom"><FadeIn delay={0.35} y={20}><p>BIBO Internship Progress Report</p></FadeIn><FadeIn delay={0.5} y={20}><StartButton /></FadeIn></div></section>;
}

function ProjectsSection() {
  return <section id="projects" className="projects"><h2 className="hero-heading">Project</h2><ProjectGallery /></section>;
}

function App() {
  const openSystemFromTerminal = (system: (typeof agentSystems)[number]) => {
    const opened = window.open(system.url, '_blank');
    if (opened) {
      opened.opener = null;
      return;
    }

    const link = document.createElement('a');
    link.href = system.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.hidden = true;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return <main className="site-shell"><ScrollChapter id="hero" intensity="dramatic"><HeroSection /></ScrollChapter><ScrollChapter id="brand" intensity="standard"><BrandRevealSection /></ScrollChapter><ScrollChapter id="boomerang" intensity="dramatic"><BoomerangSection /></ScrollChapter><ScrollChapter id="terminal" intensity="standard"><TerminalPage systems={agentSystems} onOpenSystem={openSystemFromTerminal} /></ScrollChapter><ScrollChapter id="projects" intensity="dramatic"><ProjectsSection /></ScrollChapter><footer id="contact"><p>LET&apos;S CREATE THE UNFORGETTABLE</p><ContactButton label="Return" href="#hero" /></footer></main>;
}

export default App;
