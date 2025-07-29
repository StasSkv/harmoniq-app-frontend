import React from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link } from 'react-router-dom';
import { Container } from '../../components/Container/Container';
import s from './Hero.module.css';

export default function Hero() {
  return (
    <section id="hero" className={s.heroSection}>
      <Container className={s.heroContainer}>
        <div className={s.heroImage} />
        <div className={s.heroContent}>
          <h1 className={s.heroTitle}>
            Find your <span className={s.italicBold}>harmony</span> in community
          </h1>
          <div className={s.heroButtons}>
            <ScrollLink
              to="popular-articles"
              smooth={true}
              duration={1000}
              offset={-60}
              className={`${s.btn} ${s.btnPrimary}`}
            >
              Go to Articles
            </ScrollLink>
            <Link to="/register" className={`${s.btn} ${s.btnSecondary}`}>
              Register
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
