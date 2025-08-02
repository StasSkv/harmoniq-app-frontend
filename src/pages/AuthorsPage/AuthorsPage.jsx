import s from './AuthorsPage.module.css';
import { Container } from '../../components/Container/Container';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsersForAuthorsPage } from '../../redux/usersSlice/usersOperations.js';
import {
  selectAuthorsPageLoading,
  selectAuthorsPageUsers,
  selectUsersTotal,
  selectUsersTotalPages,
} from '../../redux/usersSlice/usersSelectors.js';
import { AuthorsList } from '../../components/AuthorList/AuthorList.jsx';
import { LoaderPage } from '../../components/Loader/LoaderPage/LoaderPage.jsx';
import { Pagination } from '../../components/Pagination/Pagination.jsx';

const AuthorsPage = () => {
  const dispatch = useDispatch();
  const authors = useSelector(selectAuthorsPageUsers);
  const isLoading = useSelector(selectAuthorsPageLoading);
  const totalUsers = useSelector(selectUsersTotal);
  const totalPages = useSelector(selectUsersTotalPages);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    dispatch(
      fetchAllUsersForAuthorsPage({
        filter: 'popular',
        limit: itemsPerPage,
        page: currentPage,
      })
    );
  }, [dispatch, currentPage]);

  const handlePageChange = (page) => {
    // pag 2 Перевіряємо, чи не намагаємося перейти на неіснуючу сторінку
    if (page > totalPages && totalPages > 0) {
      console.warn(`Trying to navigate to page ${page}, but only ${totalPages} pages exist`);
      return;
    }

    setCurrentPage(page);
    // Прокручуємо до початку списку при зміні сторінки
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section>
      {isLoading && <LoaderPage />}
      <Container className={s.authorsPage}>
        <h2 className={s.authorsPageTitle}>Authors</h2>
        <AuthorsList authors={authors} />

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalItems={totalUsers}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        )}
      </Container>
    </section>
  );
};

export default AuthorsPage;
