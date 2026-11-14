import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { businessConfig, whatsappLink } from '../config/businessConfig';
import { scrollToSection } from '../utils/scrollTo';
import Logo from './Logo';
import { SocialIcon, SocialLinks } from './SocialIcons';

export default function Footer() {
  const { contact, social, navigation, about, name, copyright } = businessConfig;
  return (
    <footer id="contact" className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Logo variant="light" />
          <p>{about.description.split('. ')[0]}.</p>
          <SocialLinks social={social} size={17} className="social-links social-links--footer" />
        </div>

        <nav aria-label="Footer">
          <h3>Quick Links</h3>
          <ul className="footer__links">
            {navigation.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={(e) => scrollToSection(e, item.href)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <address>
          <h3>Contact Us</h3>
          <ul className="footer__contact">
            <li>
              <Phone size={17} aria-hidden="true" />
              <a href={`tel:${contact.phone}`}>{contact.phoneDisplay}</a>
            </li>
            <li>
              <SocialIcon name="whatsapp" size={17} />
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                WhatsApp Us
              </a>
            </li>
            <li>
              <Mail size={17} aria-hidden="true" />
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </li>
            <li>
              <MapPin size={17} aria-hidden="true" />
              <span>{contact.address}</span>
            </li>
            <li>
              <Clock size={17} aria-hidden="true" />
              <span>{contact.workingHours}</span>
            </li>
          </ul>
        </address>

        <div>
          <h3>Get in Touch</h3>
          <p className="footer__cta-text">
            Have a question about our services? Send us an enquiry and our team will reach out personally.
          </p>
          <a href="#enquiry" className="btn btn--gold" onClick={(e) => scrollToSection(e, '#enquiry')}>
            Enquire Now
          </a>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="container">
          <p>{copyright}</p>
          <p className="footer__note">{name} is a matrimonial service provider.</p>
        </div>
      </div>
    </footer>
  );
}
