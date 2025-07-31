import { ClipLoader } from 'react-spinners';
import s from './LoaderPage.module.css';

export const LoaderPage = () => {
  return (
    <div className={s.backdrop}>
      <ClipLoader color="white" loading={true} size={80} speedMultiplier={1} />
    </div>
  );
};
