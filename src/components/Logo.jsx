import { businessConfig } from '../config/businessConfig';

export default function Logo({ variant = 'dark' }) {
  return (
    <a href="#home" className={`logo logo--${variant}`} aria-label={`${businessConfig.name} – home`}>
      <img src={businessConfig.logo} alt="" width="52" height="48" className="logo__mark" />
      <span className="logo__text">
        <span className="logo__name">{businessConfig.name}</span>
        <span className="logo__tagline">{businessConfig.tagline}</span>
      </span>
    </a>
  );
}
