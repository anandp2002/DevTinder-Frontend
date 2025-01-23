import axios from 'axios';
import UserCard from './UserCard';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import { useEffect, useState } from 'react';
import { Loader } from 'lucide-react';

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // Loading state

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
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    getFeed();
    // Scroll to top when the component is loaded
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Optional: smooth scrolling
    });
  }, []);

  // Show loading message or spinner
  if (loading) {
    return (
      <h1 className="text-white -mt-16 sm:-mt-10 min-h-screen items-center flex justify-center text-2xl">
        <Loader className="animate-spin text-gray-700 size-10" />
      </h1>
    );
  }

  if (!feed || feed.length <= 0) {
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
