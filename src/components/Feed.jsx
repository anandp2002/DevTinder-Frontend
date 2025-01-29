import axios from 'axios';
import UserCard from './UserCard';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import { useEffect, useState } from 'react';
import UserCardShimmer from './UserCardShimmer';

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const getFeed = async () => {
    setLoading(true);
    try {
      const res = await axios.get(BASE_URL + '/user/feed', {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFeed();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (loading) {
    return (
      <div className="justify-center items-center -mt-16 sm:-mt-10 min-h-screen flex-wrap flex">
        <UserCardShimmer />
      </div>
    );
  }

  if (!feed || feed.length <= 0) {
    return (
      <div className="text-white -mt-16 sm:-mt-10 min-h-screen items-center flex flex-col justify-center">
        <p className=" text-3xl"> Sorry, No new users !</p>
        <p className="text-xl mt-2"> Please try again later</p>
      </div>
    );
  }

  return (
    <div className="justify-center items-center -mt-16 sm:-mt-10 min-h-screen flex-wrap flex">
      <UserCard user={feed[0]} />
    </div>
  );
};

export default Feed;
