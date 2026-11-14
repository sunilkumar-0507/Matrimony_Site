import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { businessConfig } from '../config/businessConfig';
import { scrollToSection } from '../utils/scrollTo';
import Logo from './Logo';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('#home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Highlight the nav link of the section currently in view
  useEffect(() => {
    const sections = businessConfig.navigation
      .map((item) => document.querySelector(item.href))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const go = (e, href) => {
    setOpen(false);
    scrollToSection(e, href);
  };

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        <Logo />
        <nav id="primary-nav" className={`navbar__menu${open ? ' is-open' : ''}`} aria-label="Primary">
          <ul>
            {businessConfig.navigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={active === item.href ? 'is-active' : ''}
                  aria-current={active === item.href ? 'true' : undefined}
                  onClick={(e) => go(e, item.href)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#enquiry" className="btn btn--primary navbar__cta" onClick={(e) => go(e, '#enquiry')}>
            Enquire Now
          </a>
        </nav>
        <button
          type="button"
          className="navbar__toggle"
          aria-expanded={open}
          aria-controls="primary-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>
      {open && <div className="navbar__backdrop" onClick={() => setOpen(false)} aria-hidden="true" />}
    </header>
  );
}
