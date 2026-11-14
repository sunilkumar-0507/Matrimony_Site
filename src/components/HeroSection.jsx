import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { businessConfig } from '../config/businessConfig';
import { scrollToSection } from '../utils/scrollTo';
import { FloralCorner, HeartDivider, Mandala } from './Decorations';

export default function HeroSection() {
  const { hero, heroImage, heroImageFallback, heroImageAlt } = businessConfig;
  const [src, setSrc] = useState(heroImage);

  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="hero__content">
        <FloralCorner className="hero__floral hero__floral--top" />
        <FloralCorner className="hero__floral hero__floral--bottom" />
        <Mandala className="hero__mandala" />
        <div className="hero__text">
          <p className="hero__eyebrow">{hero.eyebrow}</p>
          <h1 id="hero-title" className="hero__title">{hero.title}</h1>
          <HeartDivider className="hero__divider" />
          <p className="hero__description">{hero.description}</p>
          <div className="hero__actions">
            <a href="#enquiry" className="btn btn--primary btn--lg" onClick={(e) => scrollToSection(e, '#enquiry')}>
              {hero.primaryCta}
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a href="#services" className="btn btn--outline btn--lg" onClick={(e) => scrollToSection(e, '#services')}>
              {hero.secondaryCta}
            </a>
          </div>
        </div>
      </div>

      <div className="hero__media">
        <img
          src={src}
          alt={heroImageAlt}
          className="hero__image"
          fetchpriority="high"
          decoding="async"
          onError={() => src !== heroImageFallback && setSrc(heroImageFallback)}
        />
        {/* Curved cream transition with gold edge between text and photograph */}
        <svg className="hero__curve" viewBox="0 0 120 800" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 0H70C20 200 20 600 70 800H0Z" fill="var(--cream)" />
          <path d="M70 0C20 200 20 600 70 800" fill="none" stroke="var(--gold)" strokeWidth="3" vectorEffect="non-scaling-stroke" />
          <path d="M84 0C34 200 34 600 84 800" fill="none" stroke="var(--light-gold)" strokeWidth="1" vectorEffect="non-scaling-stroke" opacity=".8" />
        </svg>
        <svg className="hero__curve-h" viewBox="0 0 800 60" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 60V40C200 0 600 0 800 40V60Z" fill="var(--cream)" />
          <path d="M0 40C200 0 600 0 800 40" fill="none" stroke="var(--gold)" strokeWidth="3" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
    </section>
  );
}
