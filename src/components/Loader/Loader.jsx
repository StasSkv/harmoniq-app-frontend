import { ClipLoader } from 'react-spinners';
import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles.backdrop}>
      <ClipLoader
        strokeColor="#4e54c8"
        strokeWidth="4"
        animationDuration="0.75"
        width="80"
        visible={true}
      />
    </div>
  );
};

export default Loader;