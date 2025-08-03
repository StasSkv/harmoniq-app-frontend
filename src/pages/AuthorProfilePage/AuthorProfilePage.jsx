import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import s from './AuthorProfilePage.module.css';
import { Container } from '../../components/Container/Container.jsx';
import { selectProfileUser, selectIsLoading } from '../../redux/usersSlice/usersSelectors.js';
import { fetchUserById } from '../../redux/usersSlice/usersOperations.js';
import { LoaderPage } from '../../components/Loader/LoaderPage/LoaderPage.jsx';

const AuthorProfilePage = () => {
  const dispatch = useDispatch();
  const { authorId } = useParams();
  const profileUser = useSelector(selectProfileUser);
  const isLoading = useSelector(selectIsLoading);

  const ownProfile = profileUser?.id === authorId;
  console.log(ownProfile);

  useEffect(() => {
    if (authorId) {
      dispatch(fetchUserById(authorId));
    }
  }, [authorId, dispatch]);

  return isLoading ? (
    <LoaderPage />
  ) : (
    <section className={s.profilePage}>
      <Container className={s.container}>
        {ownProfile ? (
          <h2 className={s.title}>My Profile</h2>
        ) : (
          <h2 className={s.title}>Author Profile</h2>
        )}
        <div className={s.header}>
          <img src={profileUser?.avatar} alt="Author Avatar" className={s.avatar} />
          <div className={s.info}>
            <div className={s.nameWrapper}>
              <h4 className={s.name}>{profileUser?.name}</h4>
              <p className={s.articles}>{profileUser?.articlesAmount || 0} articles</p>
            </div>
            <button className={s.btnSubscribe}>Subscribe</button>
          </div>
        </div>
        {ownProfile && (
          <div className={s.tabs}>
            <button className={s.tabBtn}>My Articles</button>
            <button className={s.tabBtn}>Saved Articles</button>
            <button className={s.tabBtn}>Subscribers</button>
          </div>
        )}
      </Container>
    </section>
  );
};

export default AuthorProfilePage;
