import { ArrowRight } from 'lucide-react';
import { businessConfig } from '../config/businessConfig';
import { scrollToSection } from '../utils/scrollTo';
import { FloralCorner, HeartDivider } from './Decorations';
import Reveal from './Reveal';

function WeddingRings() {
  return (
    <svg className="cta__rings" viewBox="0 0 220 170" aria-hidden="true">
      <defs>
        <linearGradient id="cta-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFF1C9" />
          <stop offset=".45" stopColor="#D6A84F" />
          <stop offset="1" stopColor="#9C6E22" />
        </linearGradient>
      </defs>
      <ellipse cx="82" cy="104" rx="52" ry="50" fill="none" stroke="url(#cta-gold)" strokeWidth="11" />
      <ellipse cx="138" cy="96" rx="52" ry="50" fill="none" stroke="url(#cta-gold)" strokeWidth="11" />
      <path d="M138 46l-14-16 6-12h16l6 12Z" fill="#FFF9F0" stroke="url(#cta-gold)" strokeWidth="3" />
      <path d="M124 30h28M130 18l8 28 8-28" fill="none" stroke="#D6A84F" strokeWidth="1.4" />
      <g fill="#F6DFA8">
        <circle cx="30" cy="30" r="2.4" />
        <circle cx="196" cy="40" r="2" />
        <circle cx="200" cy="150" r="2.6" />
      </g>
    </svg>
  );
}

export default function CallToAction() {
  const { cta } = businessConfig;
  return (
    <section className="cta" aria-labelledby="cta-title">
      <FloralCorner className="cta__floral cta__floral--left" />
      <FloralCorner className="cta__floral cta__floral--right" />
      <div className="container cta__inner">
        <Reveal className="cta__text">
          <h2 id="cta-title">{cta.title}</h2>
          <HeartDivider className="cta__divider" />
          <p>{cta.description}</p>
          <a href="#enquiry" className="btn btn--gold btn--lg" onClick={(e) => scrollToSection(e, '#enquiry')}>
            {cta.button}
            <ArrowRight size={18} aria-hidden="true" />
          </a>
        </Reveal>
        <WeddingRings />
      </div>
    </section>
  );
}
