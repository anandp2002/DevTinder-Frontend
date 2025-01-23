import { useState } from 'react';
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || '');
  const [gender, setGender] = useState(user.gender || '');
  const [about, setAbout] = useState(user.about || '');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const saveProfile = async () => {
    // Clear Errors
    setError('');
    try {
      const res = await axios.put(
        BASE_URL + '/profile/edit',
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      toast.success('Profile saved successfully !');
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row items-start justify-center my-8 gap-8 w-full">
        <div className="flex justify-center max-w-xl px-4 w-full">
          <div className="card bg-base-300 w-full shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-white font-bold justify-center">
                Edit your Profile
              </h2>
              <div>
                <label className="form-control w-full my-2">
                  <div className="label">
                    <span className="label-text">First Name</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    className="input input-bordered w-full"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>
                <label className="form-control w-full my-2">
                  <div className="label">
                    <span className="label-text">Last Name</span>
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    className="input input-bordered w-full"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
                <label className="form-control w-full my-2">
                  <div className="label">
                    <span className="label-text">Photo URL</span>
                  </div>
                  <input
                    type="text"
                    value={photoUrl}
                    className="input input-bordered w-full"
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </label>
                <label className="form-control w-full my-2">
                  <div className="label">
                    <span className="label-text">Age</span>
                  </div>
                  <input
                    type="number"
                    value={age}
                    className="input input-bordered w-full"
                    onChange={(e) => setAge(e.target.value)}
                  />
                </label>
                <label className="form-control w-full my-2">
                  <div className="label">
                    <span className="label-text">Gender</span>
                  </div>
                  <select
                    value={gender}
                    className="select select-bordered w-full"
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="">select</option>
                    <option value="male">male</option>
                    <option value="female">female</option>
                    <option value="other">other</option>
                  </select>
                </label>
                <label className="form-control w-full my-2">
                  <div className="label">
                    <span className="label-text">About</span>
                  </div>
                  <textarea
                    value={about}
                    className="textarea textarea-bordered w-full"
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </label>
              </div>
              <p className="text-red-500 text-sm">{error}</p>
              <div className="card-actions justify-center mt-4">
                <button
                  className="btn font-bold bg-[#316FF6] hover:bg-blue-600 text-white w-full"
                  onClick={() => {
                    saveProfile();
                    navigate('/');
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden justify-between lg:block px-4 w-auto -mt-4">
          <UserCard
            isProfilePage={true}
            user={{ firstName, lastName, photoUrl, age, gender, about }}
          />
        </div>
      </div>
    </>
  );
};

export default EditProfile;
