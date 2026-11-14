// Decorative gold floral / divider artwork shared by several sections

export function FloralCorner({ className = '' }) {
  return (
    <svg className={`floral ${className}`} viewBox="0 0 200 200" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
        <path d="M10 190C40 130 80 90 150 60" />
        <path d="M40 140c-14-6-22-18-22-32 14 2 24 12 22 32Z" />
        <path d="M62 116c-4-15 0-29 11-38 6 13 3 28-11 38Z" />
        <path d="M90 92c3-15 13-25 27-28 0 14-10 25-27 28Z" />
        <path d="M120 74c8-12 21-17 34-14-5 13-18 19-34 14Z" />
        <path d="M58 150c10 10 24 13 37 8-9-11-23-13-37-8Z" />
        <path d="M86 124c13 7 27 7 38-2-12-8-26-7-38 2Z" />
        <circle cx="160" cy="54" r="7" />
        <circle cx="160" cy="54" r="2.5" fill="currentColor" />
        <path d="M160 40v-8M160 68v8M146 54h-8M174 54h8" />
      </g>
    </svg>
  );
}

const petals = Array.from({ length: 16 }, (_, i) => i * 22.5);

export function Mandala({ className = '' }) {
  return (
    <svg className={`mandala ${className}`} viewBox="-100 -100 200 200" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth=".8">
        <circle r="96" strokeDasharray="2 5" />
        <circle r="80" />
        <circle r="34" />
        <circle r="18" />
        {petals.map((a) => (
          <g key={a} transform={`rotate(${a})`}>
            <path d="M0-34C10-50 10-66 0-80-10-66-10-50 0-34Z" />
            <circle cy="-88" r="3" />
          </g>
        ))}
      </g>
    </svg>
  );
}

export function HeartDivider({ className = '' }) {
  return (
    <div className={`heart-divider ${className}`} aria-hidden="true">
      <span />
      <svg viewBox="0 0 24 22" width="20" height="18">
        <path
          d="M12 21C6 16.5 1 12.6 1 7.2 1 3.8 3.6 1 7 1c2.1 0 3.9 1.1 5 2.8C13.1 2.1 14.9 1 17 1c3.4 0 6 2.8 6 6.2 0 5.4-5 9.3-11 13.8Z"
          fill="currentColor"
        />
      </svg>
      <span />
    </div>
  );
}

export function SectionHeading({ eyebrow, title, subtitle, align = 'center', light = false }) {
  return (
    <div className={`section-heading section-heading--${align}${light ? ' section-heading--light' : ''}`}>
      {eyebrow && (
        <p className="eyebrow">
          <span className="eyebrow__line" />
          {eyebrow}
          {align === 'center' && <span className="eyebrow__line" />}
        </p>
      )}
      <h2>{title}</h2>
      <HeartDivider />
      {subtitle && <p className="section-heading__subtitle">{subtitle}</p>}
    </div>
  );
}
