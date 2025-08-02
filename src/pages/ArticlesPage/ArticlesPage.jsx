import { useDispatch, useSelector } from 'react-redux';
import ArticlesList from '../../components/ArticlesList/ArticlesList';
import { Container } from '../../components/Container/Container';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import s from './ArticlesPage.module.css';
import { useEffect, useRef, useState } from 'react';
import { fetchArticlesWithParams } from '../../redux/articlesSlice/articlesOperation';
import { selectIsLoading, selectTotal } from '../../redux/articlesSlice/articlesSelectors';
import { LoaderPage } from '../../components/Loader/LoaderPage/LoaderPage.jsx';
import { toast } from 'react-toastify';

const ArticlesPage = () => {
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const listRef = useRef(null);
  const scrollRef = useRef(null);
  const firstNewItemRef = useRef(null);

  const total = useSelector(selectTotal);
  const isLoading = useSelector(selectIsLoading);

  const limit = 12;

  const dispatch = useDispatch();

  useEffect(() => {
    setPage(1);
    dispatch(fetchArticlesWithParams({ filter, page: 1, limit }))
      .unwrap()
      .then((res) => {
        if (res.data.length < limit) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
      })
      .catch((err) => {
        toast.error(`Failed to load articles: ${err}`);
      });
  }, [dispatch, filter]);

  const handleLoadMore = () => {
    const lastItem = listRef.current?.lastElementChild;
    if (lastItem) {
      scrollRef.current = lastItem;
    }

    const nextPage = page + 1;
    dispatch(fetchArticlesWithParams({ filter, page: nextPage, limit }))
      .unwrap()
      .then((res) => {
        if (res.data.length < limit || nextPage * limit >= total) {
          setHasMore(false);
        }
        setPage(nextPage);

        setTimeout(() => {
          firstNewItemRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      })
      .catch((err) => {
        toast.error(`Failed to load more articles: ${err}`);
      });
  };

  return (
    <section id="articlesPage" className={s.articles_page}>
      <Container className={s.container_wrapper}>
        <SectionTitle title="Articles" filter={filter} setFilter={setFilter} total={total} />

        {isLoading && <LoaderPage />}

        <ArticlesList ref={listRef} firstNewItemRef={firstNewItemRef} page={page} limit={limit} />
        {hasMore && (
          <div className={s.load_more_wrapper}>
            <button type="button" className={s.load_more_btn} onClick={handleLoadMore}>
              Load More
            </button>
          </div>
        )}
      </Container>
    </section>
  );
};

export default ArticlesPage;
