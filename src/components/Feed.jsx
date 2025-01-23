import axios from 'axios';
import UserCard from './UserCard';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import { useEffect } from 'react';

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + '/user/feed', {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) {
    return;
  }

  if (feed.length <= 0) {
    return (
      <h1 className="text-white -mt-16 sm:-mt-10 min-h-screen items-center flex justify-center text-2xl">
        Sorry, No new users !
      </h1>
    );
  }
  return (
    feed && (
      <div className="justify-center items-center -mt-16 sm:-mt-10 min-h-screen flex-wrap flex">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
