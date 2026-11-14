import { businessConfig } from '../config/businessConfig';
import Icon from './Icon';
import Reveal from './Reveal';

export default function ServicesSection() {
  return (
    <div id="services" className="services">
      <p className="eyebrow">
        <span className="eyebrow__line" />
        What We Offer
      </p>
      <h2 className="services__title">Our Services</h2>
      <div className="services__grid">
        {businessConfig.services.map((service, i) => (
          <Reveal as="article" key={service.title} className="service-card" delay={i * 100}>
            <span className="service-card__icon">
              <Icon name={service.icon} size={30} />
            </span>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
