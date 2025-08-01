import s from './AuthorsPage.module.css';
import { Container } from '../../components/Container/Container';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers } from '../../redux/usersSlice/usersOperations.js';
import { selectAllUsers, selectUsersLoading } from '../../redux/usersSlice/usersSelectors.js';
import { AuthorsList } from '../../components/AuthorList/AuthorList.jsx';
import { LoaderPage } from '../../components/Loader/LoaderPage/LoaderPage.jsx';

const AuthorsPage = () => {
  const dispatch = useDispatch();
  const authors = useSelector(selectAllUsers);
  const isLoading = useSelector(selectUsersLoading);

  useEffect(() => {
    dispatch(fetchAllUsers({ filter: 'popular', limit: 20 }));
  }, [dispatch]);

  return (
    <section>
      {isLoading && <LoaderPage />}
      <Container className={s.authorsPage}>
        <h2 className={s.authorsPageTitle}>Authors</h2>
        <AuthorsList authors={authors.data} />
      </Container>
    </section>
  );
};

export default AuthorsPage;
