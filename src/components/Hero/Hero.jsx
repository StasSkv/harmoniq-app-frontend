import { useSelector } from 'react-redux';
import { Link as ScrollLink } from 'react-scroll';
import { Link } from 'react-router-dom';
import { Container } from '../../components/Container/Container';
import s from './Hero.module.css';

export const Hero = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const isUserLoggedIn =
    typeof isLoggedIn === 'string' ? isLoggedIn === 'true' : Boolean(isLoggedIn);

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
              duration={200}
              className={`${s.btn} ${s.btnPrimary}`}
            >
              Go to Articles
            </ScrollLink>

            {!isUserLoggedIn && (
              <Link to="/register" className={`${s.btn} ${s.btnSecondary}`}>
                Register
              </Link>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};
