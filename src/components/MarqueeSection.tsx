import { useEffect, useRef, useState } from 'react';

const previews = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif', 'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif', 'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif', 'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif', 'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif', 'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif', 'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif', 'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif', 'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif', 'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif', 'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif', 'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif', 'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif', 'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif', 'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif', 'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif', 'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif', 'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif', 'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif', 'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif', 'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif',
];

function Rail({ images, reverse }: { images: string[]; reverse?: boolean }) {
  const section = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const update = () => {
      const top = section.current?.getBoundingClientRect().top ?? 0;
      setOffset((window.scrollY + top + window.innerHeight) * 0.3 - 200);
    };
    update(); window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  const repeated = [...images, ...images, ...images];
  return <div ref={section} className="marquee-viewport"><div className="marquee-rail" style={{ transform: `translateX(${reverse ? -offset : offset}px)` }}>{repeated.map((image, index) => <img key={`${image}-${index}`} src={image} alt="Featured motion work" loading="lazy" />)}</div></div>;
}

export function MarqueeSection() {
  return <section className="marquee-section" aria-label="Selected motion work"><Rail images={previews.slice(0, 11)} /><Rail images={previews.slice(11)} reverse /></section>;
}
