import { Mail, MapPin, Phone } from 'lucide-react';
import { businessConfig } from '../config/businessConfig';
import { SocialLinks } from './SocialIcons';

export default function TopBar() {
  const { contact, social } = businessConfig;
  return (
    <div className="topbar">
      <div className="container topbar__inner">
        <p className="topbar__item">
          <MapPin size={15} aria-hidden="true" />
          {contact.location}
        </p>
        <div className="topbar__group">
          <a className="topbar__item" href={`tel:${contact.phone}`}>
            <Phone size={15} aria-hidden="true" />
            {contact.phoneDisplay}
          </a>
          <a className="topbar__item topbar__email" href={`mailto:${contact.email}`}>
            <Mail size={15} aria-hidden="true" />
            {contact.email}
          </a>
        </div>
        <div className="topbar__social">
          <span>Follow Us</span>
          <SocialLinks social={social} size={14} />
        </div>
      </div>
    </div>
  );
}
