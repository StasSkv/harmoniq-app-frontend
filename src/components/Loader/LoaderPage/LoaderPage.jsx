import { ClipLoader } from 'react-spinners';
import s from './LoaderPage.module.css';
import clsx from 'clsx';

export const LoaderPage = ({ className }) => {
  return (
    <div className={clsx(s.backdrop, className)}>
      <ClipLoader color="white" loading={true} size={80} speedMultiplier={1} />
    </div>
  );
};
