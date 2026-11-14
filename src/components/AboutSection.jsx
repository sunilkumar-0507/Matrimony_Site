import { businessConfig } from '../config/businessConfig';
import { HeartDivider } from './Decorations';
import Reveal from './Reveal';

export default function AboutSection() {
  const { about } = businessConfig;
  return (
    <Reveal id="about" className="about">
      <p className="eyebrow">
        <span className="eyebrow__line" />
        {about.eyebrow}
      </p>
      <h2 className="about__title">{about.title}</h2>
      <p className="about__text">{about.description}</p>
      <HeartDivider className="about__divider" />
    </Reveal>
  );
}
