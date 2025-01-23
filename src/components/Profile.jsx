import { useSelector } from 'react-redux';
import EditProfile from './EditProfile';
import { useEffect } from 'react';

const Profile = () => {
  const user = useSelector((store) => store.user);

  useEffect(() => {
    // Scroll to top when the component is loaded
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Optional: smooth scrolling
    });
  }, []);
  return (
    user && (
      <div className="">
        <EditProfile user={user} />
      </div>
    )
  );
};
export default Profile;
