import { useDispatch, useSelector } from 'react-redux';
import LOGO from '/tinder.webp';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../utils/userSlice';

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axios.post(
        BASE_URL + '/auth/logout',
        {},
        { withCredentials: true }
      );

      dispatch(removeUser());
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="navbar bg-base-300 text-white">
      <div className="flex-1 flex items-center">
        <Link to="/">
          <img src={LOGO} className="h-8 w-8" />
        </Link>
        <Link to="/">
          <p className="btn btn-ghost text-xl -ml-2">DevTinder</p>
        </Link>
      </div>

      {user && (
        <div className="flex-none gap-2">
          <p className="font-bold text-lg">{user.firstName}</p>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-9 rounded-full">
                <img alt="user" src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-300 rounded-box z-[1] mt-3 w-52 p-2 shadow-lg"
            >
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/settings">Settings</Link>
              </li>
              <li onClick={handleLogout}>
                <Link to="/">Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
