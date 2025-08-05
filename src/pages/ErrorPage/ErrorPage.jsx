import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import s from './ErrorPage.module.css';
import sprite from '../../assets/icons/sprite.svg';

function ErrorPage({
  code = 500,
  message = 'Something went wrong',
  //   animation = '/animations/error-default.gif',
  showBackButton = true,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const { code: stateCode, message: stateMessage } = location.state || {};

  return (
    <div className={s.errorPage}>
      <svg className={s.logo}>
        <use xlinkHref={`${sprite}#icon-logo`} />
      </svg>

      {/* <div className={s.animation}>
        <img src={animation} alt={`Error ${stateCode || code}`} />
      </div> */}

      <h1 className={s.errorCode}>Error {stateCode || code}</h1>

      <p className={s.message}>{stateMessage || message}</p>

      {showBackButton && (
        <button className={s.button} onClick={() => navigate('/')}>
          Back
        </button>
      )}
    </div>
  );
}

export default ErrorPage;
