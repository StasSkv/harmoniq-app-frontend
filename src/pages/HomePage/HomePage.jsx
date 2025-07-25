import { useDispatch } from 'react-redux';
import { setIsLoading } from '../../redux/global/globalSlice';

const HomePage = () => {
  const dispatch = useDispatch();

  const handleTestLoader = () => {
    dispatch(setIsLoading(true));

    // Симуляція затримки (наприклад, фетч з сервера)
    setTimeout(() => {
      dispatch(setIsLoading(false));
    }, 2000);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Home Page</h1>
      <button onClick={handleTestLoader}>Перевірити Loader</button>
    </div>
  );
};

export default HomePage;
