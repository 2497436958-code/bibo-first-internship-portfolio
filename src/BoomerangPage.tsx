import { BoomerangVideoBg } from './components/BoomerangVideoBg';
import { SingleSystemCard } from './components/SingleSystemCard';
import './boomerang.css';

export function BoomerangSection() {
  return <section className="boomerang-page" aria-label="BIBO building showcase">
    <BoomerangVideoBg />
    <SingleSystemCard />
  </section>;
}

export function BoomerangPage() {
  return <main className="boomerang-page-shell">
    <BoomerangSection />
  </main>;
}
