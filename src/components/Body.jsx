import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import { addUser } from '../utils/userSlice';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Loader } from 'lucide-react';

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector((store) => store.user);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + '/profile/view', {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="h-10 w-10 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <>
      {userData && <Navbar />}
      <Outlet />
      {userData && <Footer />}
    </>
  );
};

export default Body;
