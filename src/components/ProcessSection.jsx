import { ChevronRight } from 'lucide-react';
import { businessConfig } from '../config/businessConfig';
import { SectionHeading } from './Decorations';
import Icon from './Icon';
import Reveal from './Reveal';

export default function ProcessSection() {
  const { process } = businessConfig;
  return (
    <section id="process" className="section process">
      <div className="container">
        <Reveal>
          <SectionHeading eyebrow="How It Works" title={process.title} subtitle={process.subtitle} />
        </Reveal>
        <ol className="process__steps">
          {process.steps.map((step, i) => (
            <Reveal as="li" key={step.title} className="process-step" delay={i * 120}>
              <div className="process-step__circle">
                <Icon name={step.icon} size={32} />
                <span className="process-step__number">{i + 1}</span>
              </div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
              {i < process.steps.length - 1 && (
                <span className="process-step__arrow" aria-hidden="true">
                  <ChevronRight size={22} />
                </span>
              )}
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
