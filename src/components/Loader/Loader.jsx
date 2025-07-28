import { ClipLoader } from 'react-spinners';
import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles.backdrop}>
      <ClipLoader
        color="#000000"      
        loading={true}      
        size={80}            
        speedMultiplier={1}  
      />
    </div>
  );
};

export default Loader;