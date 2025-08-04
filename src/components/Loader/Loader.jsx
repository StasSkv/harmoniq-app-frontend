import { ClipLoader } from 'react-spinners';
import clsx from 'clsx';

export const Loader = ({ className, size = 80 }) => {
  return (
    <div className={clsx(className)}>
      <ClipLoader color="#000000" loading={true} size={size} speedMultiplier={1} />
    </div>
  );
};
