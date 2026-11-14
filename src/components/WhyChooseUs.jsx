import { businessConfig } from '../config/businessConfig';
import { SectionHeading } from './Decorations';
import Icon from './Icon';
import Reveal from './Reveal';

export default function WhyChooseUs() {
  const { whyChooseUs } = businessConfig;
  return (
    <section id="why-choose-us" className="section why">
      <div className="container">
        <Reveal>
          <SectionHeading eyebrow="Our Strengths" title={whyChooseUs.title} subtitle={whyChooseUs.subtitle} />
        </Reveal>
        <div className="why__grid">
          {whyChooseUs.features.map((feature, i) => (
            <Reveal as="article" key={feature.title} className="why-card" delay={(i % 3) * 100}>
              <span className="why-card__icon">
                <Icon name={feature.icon} size={28} />
              </span>
              <div>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
