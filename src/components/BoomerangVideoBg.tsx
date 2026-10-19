import './BoomerangVideoBg.css';

const VIDEO_URL = '/boomerang-background.mp4';

export function BoomerangVideoBg() {
  return <div className="boomerang-video-bg" data-testid="boomerang-video-background" aria-hidden="true">
    <video className="boomerang-video-bg__video" autoPlay loop muted playsInline preload="auto" src={VIDEO_URL} />
    <img className="boomerang-video-bg__logo" src="/bibo-building-logo.jpg" alt="" />
  </div>;
}
