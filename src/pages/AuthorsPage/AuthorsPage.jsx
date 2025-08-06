import s from './AuthorsPage.module.css';

import { Container } from '../../components/Container/Container';
import { AuthorsList } from '../../components/AuthorList/AuthorList.jsx';
import { LoaderPage } from '../../components/Loader/LoaderPage/LoaderPage.jsx';
import { Pagination } from '../../components/Pagination/Pagination.jsx';
import { toast } from 'react-toastify';
import SectionTitle from '../../components/SectionTitle/SectionTitle.jsx';

import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersWithParams } from '../../redux/usersSlice/usersOperations.js';
import {
  selectAuthorsPageLoading,
  selectAuthorsPageUsers,
  selectUsersPagination,
} from '../../redux/usersSlice/usersSelectors.js';

const AuthorsPage = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const sectionRef = useRef(null);

  const paginationData = useSelector(selectUsersPagination);
  const authors = useSelector(selectAuthorsPageUsers);
  const isLoading = useSelector(selectAuthorsPageLoading);

  const page = Number(searchParams.get('page')) || 1;
  const filter = searchParams.get('filter') || 'all';
  const limit = 20;

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (!params.has('page')) {
      params.set('page', '1');
    }
    if (!params.has('filter')) {
      params.set('filter', 'all');
    }
    setSearchParams(params, { replace: true });

    dispatch(fetchUsersWithParams({ page, filter, limit }))
      .unwrap()
      .catch((err) => {
        toast.error(`Failed to load authors: ${err.message}`);
      });
  }, [page, filter, dispatch, searchParams, setSearchParams]);

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    setSearchParams(params);

    setTimeout(() => {
      if (sectionRef.current) {
        const header = document.querySelector('header');
        const headerOffset = header ? header.offsetHeight : 0;
        const elementPosition = sectionRef.current.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }, 100);
  };

  const handleFilterChange = (newFilter) => {
    const params = new URLSearchParams(searchParams);
    params.set('filter', newFilter);
    params.set('page', '1');
    setSearchParams(params);
  };

  return (
    <section id="authorsPage" className={s.authorsPage} ref={sectionRef}>
      {isLoading && <LoaderPage />}
      <Container className={s.container}>
        <SectionTitle
          title="Authors"
          filter={filter}
          setFilter={handleFilterChange}
          total={paginationData?.totalItems || 0}
          options={[
            { value: 'all', label: 'All' },
            { value: 'popular', label: 'Top authors' },
          ]}
        />

        <AuthorsList authors={authors} />

        <Pagination pagination={paginationData} onPageChange={handlePageChange} />
      </Container>
    </section>
  );
};

export default AuthorsPage;
