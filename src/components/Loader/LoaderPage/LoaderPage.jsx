import s from './LoaderPage.module.css';
import clsx from 'clsx';
import { ClipLoader } from 'react-spinners';
import { useEffect } from 'react';

export const LoaderPage = ({ className }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className={clsx(s.backdrop, className)}>
      <ClipLoader color="white" loading={true} size={80} speedMultiplier={1} />
    </div>
  );
};
