import { useDispatch, useSelector } from 'react-redux';
import ArticlesList from '../../components/ArticlesList/ArticlesList';
import { Container } from '../../components/Container/Container';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import s from './ArticlesPage.module.css';
import { useEffect, useState } from 'react';
import { fetchArticlesWithParams } from '../../redux/articlesSlice/articlesOperation';
import {
  selectArticlesWithPagination,
  selectPaginationData,
  selectPaginationLoading,
} from '../../redux/articlesSlice/articlesSelectors';
import { LoaderPage } from '../../components/Loader/LoaderPage/LoaderPage.jsx';
import { toast } from 'react-toastify';
import { Pagination } from '../../components/Pagination/Pagination.jsx';

const ArticlesPage = () => {
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const articles = useSelector(selectArticlesWithPagination);
  const isLoading = useSelector(selectPaginationLoading);
  const paginationData = useSelector(selectPaginationData);

  const itemsPerPage = 12;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchArticlesWithParams({
        filter,
        page: currentPage,
        perPage: itemsPerPage,
      })
    )
      .unwrap()
      .catch((err) => {
        toast.error(`Failed to load articles: ${err}`);
      });
  }, [dispatch, filter, currentPage]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1);
  };
  const handlePageChange = (page) => {
    if (page > paginationData.totalPages && paginationData.totalPages > 0) {
      console.warn(
        `Trying to navigate to page ${page}, but only ${paginationData.totalPages} pages exist`
      );
      return;
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="articlesPage" className={s.articles_page}>
      <Container className={s.container_wrapper}>
        <SectionTitle
          title="Articles"
          filter={filter}
          setFilter={handleFilterChange}
          total={paginationData.totalItems}
        />

        {isLoading && <LoaderPage />}

        <ArticlesList articles={articles} />
        {paginationData.totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalItems={paginationData.totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        )}
      </Container>
    </section>
  );
};

export default ArticlesPage;
