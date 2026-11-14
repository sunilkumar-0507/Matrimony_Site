import { whatsappLink } from '../config/businessConfig';
import { SocialIcon } from './SocialIcons';

export default function WhatsAppButton() {
  return (
    <a className="whatsapp-float" href={whatsappLink()} target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp">
      <SocialIcon name="whatsapp" size={28} />
    </a>
  );
}
