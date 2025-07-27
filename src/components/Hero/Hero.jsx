import React from 'react';
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
            <a href="#popular-articles" className={`${s.btn} ${s.btnPrimary}`}>
              Go to Articles
            </a>
            <Link to="/registerPage" className={`${s.btn} ${s.btnSecondary}`}>
              Register
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
