import s from './About.module.css';
import { Container } from '../Container/Container';
import lotusDesktop1x from '../../assets/images/about/lotus1-desc.webp';
import friendsDesktop1x from '../../assets/images/about/friends1-desc.webp';
import nirvanaDesktop1x from '../../assets/images/about/nirvana1.webp';
import lotusDesktop2x from '../../assets/images/about/lotus2-desc.webp';
import friendsDesktop2x from '../../assets/images/about/friends2-desc.webp';
import nirvanaDesktop2x from '../../assets/images/about/nirvana2.webp';
import lotusTablet1x from '../../assets/images/about/lotus1-tab.webp';
import friendsTablet1x from '../../assets/images/about/friends1-tab.webp';
import lotusTablet2x from '../../assets/images/about/lotus2-tab.webp';
import friendsTablet2x from '../../assets/images/about/friends2-tab.webp';
import lotusMobile1x from '../../assets/images/about/lotus1-mob.webp';
import friendsMobile1x from '../../assets/images/about/friends1-mob.webp';
import lotusMobile2x from '../../assets/images/about/lotus2-mob.webp';
import friendsMobile2x from '../../assets/images/about/friends2-mob.webp';

export const About = () => {
  return (
    <section className={s.aboutSection}>
      <Container className={s.wrapper}>
        <div className={s.aboutContent}>
          <h2 className={s.aboutTitle}>About us</h2>
          <p className={s.aboutDescription}>
            Harmoniq is a mindful publishing platform dedicated to mental health and well-being. We
            bring together writers, thinkers, and readers who believe that open, thoughtful stories
            can heal, inspire, and connect. Whether you're here to share your journey or learn from
            others — this is your space to slow down, reflect, and grow.
          </p>
        </div>

        <picture>
          <source
            srcSet={`${lotusDesktop1x} 1x, ${lotusDesktop2x} 2x`}
            media="(min-width: 1440px)"
          />
          <source srcSet={`${lotusTablet1x} 1x, ${lotusTablet2x} 2x`} media="(min-width: 768px)" />
          <source srcSet={`${lotusMobile1x} 1x, ${lotusMobile2x} 2x`} media="(max-width: 767px)" />
          <img src={lotusMobile1x} alt="Lotus, a symbol of peace and harmony" loading="lazy" />
        </picture>

        <picture>
          <source
            srcSet={`${friendsDesktop1x} 1x, ${friendsDesktop2x} 2x`}
            media="(min-width: 1440px)"
          />
          <source
            srcSet={`${friendsTablet1x} 1x, ${friendsTablet2x} 2x`}
            media="(min-width: 768px)"
          />
          <source
            srcSet={`${friendsMobile1x} 1x, ${friendsMobile2x} 2x`}
            media="(max-width: 767px)"
          />
          <img
            src={friendsMobile1x}
            alt="Friends in nature, breathing in harmony and sunlight"
            loading="lazy"
          />
        </picture>

        <picture className={s.nirvanaImg}>
          <source
            srcSet={`${nirvanaDesktop1x} 1x, ${nirvanaDesktop2x} 2x`}
            media="(min-width: 1440px)"
          />
          <img
            src={nirvanaDesktop1x}
            alt="A person meditates in nature, enjoying peace and harmony"
            loading="lazy"
          />
        </picture>
      </Container>
    </section>
  );
};
