import { businessConfig } from '../config/businessConfig';
import Icon from './Icon';
import Reveal from './Reveal';

export default function TrustHighlights() {
  return (
    <section className="trust" aria-label="Why families trust us">
      <div className="container">
        <Reveal as="ul" className="trust__strip">
          {businessConfig.trustHighlights.map((item) => (
            <li key={item.title} className="trust__item">
              <span className="trust__icon">
                <Icon name={item.icon} size={30} />
              </span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
