import s from './ArticlesPage.module.css';

import SectionTitle from '../../components/SectionTitle/SectionTitle';
import ArticlesList from '../../components/ArticlesList/ArticlesList';
import { Container } from '../../components/Container/Container';
import { LoaderPage } from '../../components/Loader/LoaderPage/LoaderPage.jsx';
import { toast } from 'react-toastify';
import { Pagination } from '../../components/Pagination/Pagination';

import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticlesWithParams } from '../../redux/articlesSlice/articlesOperation';
import {
  selectArticles,
  selectIsLoading,
  selectArticlesPagination,
} from '../../redux/articlesSlice/articlesSelectors';

const ArticlesPage = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const articlesRef = useRef(null);

  const paginationData = useSelector(selectArticlesPagination);
  const articles = useSelector(selectArticles);
  const isLoading = useSelector(selectIsLoading);

  const page = Number(searchParams.get('page')) || 1;
  const filter = searchParams.get('filter') || 'all';
  const limit = 12;

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (!params.has('page')) {
      params.set('page', '1');
    }
    if (!params.has('filter')) {
      params.set('filter', 'all');
    }
    setSearchParams(params, { replace: true });

    dispatch(fetchArticlesWithParams({ page, filter, limit }))
      .unwrap()
      .then(() => {
        if (page > 1 && articlesRef.current) {
          const startIndex = (page - 1) * limit;
          const articleElements = articlesRef.current.getElementsByClassName('article-item');
          if (articleElements[startIndex]) {
            articleElements[startIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      })
      .catch((err) => {
        toast.error(`Failed to load articles: ${err.message}`);
      });
  }, [page, filter, dispatch]);

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    setSearchParams(params);
  };

  const handleFilterChange = (newFilter) => {
    const params = new URLSearchParams(searchParams);
    params.set('filter', newFilter);
    params.set('page', '1');
    setSearchParams(params);
  };

  return (
    <section id="articlesPage" className={s.articles_page}>
      <Container className={s.container_wrapper}>
        <SectionTitle
          title="Articles"
          filter={filter}
          setFilter={handleFilterChange}
          total={paginationData?.totalItems || 0}
        />
        {isLoading && <LoaderPage />}
        <div ref={articlesRef}>
          <ArticlesList articles={articles} />
        </div>
        <Pagination pagination={paginationData} onPageChange={handlePageChange} />
      </Container>
    </section>
  );
};

export default ArticlesPage;
