import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../container/container.module.css';
import s from './Hero.module.css';

export default function Hero() {
  return (
    <section id="hero" className={s['hero-section']}>
      <div className={`${styles.container} ${s['hero-content']}`}>
        <h1 className={s['hero-title']}>
          Find your <span className={s.italicBold}>harmony</span> in community
        </h1>
        <div className={s['hero-buttons']}>
          <a href="#popular-articles" className={`${s.btn} ${s['btn-primary']}`}>
            Go to Articles
          </a>
          <Link to="/registerPage" className={`${s.btn} ${s['btn-secondary']}`}>
            Register
          </Link>
        </div>
      </div>
      <div className={s['hero-image']} />
    </section>
  );
}
