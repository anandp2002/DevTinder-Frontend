import { useSelector } from 'react-redux';
import LOGO from '/tinder.webp';
const Navbar = () => {
  const user = useSelector((store) => store.user);
  return (
    <div className="navbar bg-black text-white">
      <div className="flex-1 flex items-center">
        <img src={LOGO} className="h-8 w-8" />
        <a className="btn btn-ghost text-xl -ml-2">DevTinder</a>
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
                <a>Profile</a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
