import { Container } from '../../components/Container/Container';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers } from '../../redux/users/usersOperations';
import {
  selectVisibleUsers,
  selectUsersLoading,
  selectUsersError,
  selectUsersHasMore,
} from '../../redux/users/usersSelectors';
import { showMoreUsers } from '../../redux/users/usersSlice';

import AuthorsList from '../../components/AuthorList/AuthorList';
// import { users } from './users';
import s from './AuthorsPage.module.css';

export const AuthorsPage = () => {
  const dispatch = useDispatch();
  const authors = useSelector(selectVisibleUsers);
  const isLoading = useSelector(selectUsersLoading);
  const error = useSelector(selectUsersError);
  const hasMore = useSelector(selectUsersHasMore);

  console.log('AUTHORS from Redux:', authors);

  useEffect(() => {
    //
    dispatch(fetchAllUsers()); //
  }, [dispatch]);

  const handleLoadMore = () => {
    dispatch(showMoreUsers());
  };

  return (
    <section>
      <Container className={s.wrapper}>
        <div className={s.authorsPageContent}>
          <h2 className={s.authorsPageTitle}>Authors</h2>
          {isLoading && <p>Loading authors...</p>}
          {error && <p>Error: {error}</p>}
          <AuthorsList authors={authors} />
          {hasMore && !isLoading && (
            <button className={s.authorsPageLoadMoreBtn} onClick={handleLoadMore}>
              Load More
            </button>
          )}
        </div>
      </Container>
    </section>
  );
};
