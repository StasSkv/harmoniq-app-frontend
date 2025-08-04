import s from './AuthorProfilePage.module.css';
import clsx from 'clsx';

import { Container } from '../../components/Container/Container.jsx';
import { LoaderPage } from '../../components/Loader/LoaderPage/LoaderPage.jsx';

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectProfileUser,
  selectVisibleSavedArticles,
  selectIsLoading,
  selectFollowing,
} from '../../redux/usersSlice/usersSelectors.js';
import { selectArticlesByOwner } from '../../redux/articlesSlice/articlesSelectors.js';
import { selectUser } from '../../redux/authSlice/authSelectors.js';
import {
  fetchUserById,
  fetchSavedArticles,
  fetchFollowingByUserId,
} from '../../redux/usersSlice/usersOperations.js';
import { fetchArticlesByOwnerId } from '../../redux/articlesSlice/articlesOperation.js';
import ArticlesList from '../../components/ArticlesList/ArticlesList.jsx';
import { AuthorsList } from '../../components/AuthorList/AuthorList.jsx';
import { NothingFoundItemsInProfile } from '../../components/NothingFoundItemsInProfile/NothingFoundItemsInProfile.jsx';

const AuthorProfilePage = () => {
  const [activeTab, setActiveTab] = useState('myArticles');

  const dispatch = useDispatch();
  const { authorId } = useParams();

  const profileUser = useSelector(selectProfileUser);
  const currentUser = useSelector(selectUser);
  const myArticles = useSelector(selectArticlesByOwner);
  const savedArticles = useSelector(selectVisibleSavedArticles);
  const following = useSelector(selectFollowing);
  const isLoading = useSelector(selectIsLoading);
  const ownProfile = profileUser?.id === currentUser?._id;
  const name = profileUser?.name.split(' ');
  console.log(ownProfile);

  let articlesInfoText = '';

  if (activeTab === 'myArticles') {
    articlesInfoText = `${profileUser?.articlesAmount || 0} Articles`;
  } else if (activeTab === 'savedArticles') {
    articlesInfoText = `${savedArticles?.length || 0} saved Articles`;
  } else if (activeTab === 'subscribers') {
    articlesInfoText = `${following?.length || 0} Subscriptions`;
  }

  console.log(following);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === 'myArticles' && ownProfile) {
      dispatch(fetchArticlesByOwnerId(authorId));
    } else if (tab === 'myArticles' && !ownProfile) {
      dispatch(fetchArticlesByOwnerId(authorId));
    } else if (tab === 'savedArticles') {
      dispatch(fetchSavedArticles(authorId));
    } else if (tab === 'subscribers') {
      dispatch(fetchFollowingByUserId(authorId));
    }
  };

  const handleClickSubscribe = () => {
    dispatch(fetchFollowingByUserId(authorId));
  };

  useEffect(() => {
    if (authorId) {
      dispatch(fetchUserById(authorId));
      dispatch(fetchArticlesByOwnerId(authorId));
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
            <div className={s.infoNameWrapper}>
              <div className={s.nameWrapper}>
                <p className={s.name}>{name?.[0]}</p>
                <p className={s.name}>{name?.[1]}</p>
              </div>
              {!ownProfile ? (
                <p className={s.articles}>{profileUser?.articlesAmount || 0} articles</p>
              ) : (
                <p className={s.articles}>{articlesInfoText}</p>
              )}
            </div>
            {ownProfile ? (
              <button className={s.btnEdit}>Edit profile</button>
            ) : (
              <button className={s.btnSubscribe} onClick={handleClickSubscribe}>
                Subscribe
              </button>
            )}
          </div>
        </div>
        {ownProfile === true && (
          <div className={s.tabs}>
            <button
              className={clsx(s.tabBtn, activeTab === 'myArticles' && s.activeTab)}
              onClick={() => handleTabClick('myArticles')}
            >
              My Articles
            </button>
            <button
              className={clsx(s.tabBtn, activeTab === 'savedArticles' && s.activeTab)}
              onClick={() => handleTabClick('savedArticles')}
            >
              Saved Articles
            </button>
            <button
              className={clsx(s.tabBtn, activeTab === 'subscribers' && s.activeTab)}
              onClick={() => handleTabClick('subscribers')}
            >
              Subscribers
            </button>
          </div>
        )}

        {activeTab === 'myArticles' &&
          (myArticles.length === 0 ? (
            <NothingFoundItemsInProfile
              description={'No articles yet.'}
              link={'create'}
              linkText={'Create article'}
            />
          ) : (
            <ArticlesList articles={myArticles} />
          ))}

        {activeTab === 'savedArticles' &&
          (savedArticles.length === 0 ? (
            <NothingFoundItemsInProfile
              description={'No saved articles yet.'}
              link={'articles'}
              linkText={'Go to articles'}
            />
          ) : (
            <ArticlesList articles={savedArticles} />
          ))}

        {activeTab === 'subscribers' &&
          (following.length === 0 ? (
            <NothingFoundItemsInProfile
              description="No subscribers yet."
              link="authors"
              linkText="Go to authors"
            />
          ) : (
            <AuthorsList authors={following} />
          ))}
      </Container>
    </section>
  );
};

export default AuthorProfilePage;
