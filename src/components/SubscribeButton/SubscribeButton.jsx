import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/authSlice/authSelectors';
import { addFollower, deleteFollower } from '../../redux/usersSlice/usersOperations';
import s from './SubscribeButton.module.css';

const SubscribeButton = ({ authorId }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);
  const [isFollowingLocal, setIsFollowingLocal] = useState(false);

  useEffect(() => {
    setIsFollowingLocal(currentUser?.following.includes(authorId));
  }, [currentUser?.following, authorId]);

  const handleClickSubscribe = () => {
    setIsFollowingLocal(true);
    dispatch(addFollower(authorId));
  };

  const handleClickUnsubscribe = () => {
    setIsFollowingLocal(false);
    dispatch(deleteFollower(authorId));
  };

  return isFollowingLocal ? (
    <button className={s.btnSubscribe} onClick={handleClickUnsubscribe}>
      Unsubscribe
    </button>
  ) : (
    <button className={s.btnSubscribe} onClick={handleClickSubscribe}>
      Subscribe
    </button>
  );
};

export default SubscribeButton;
