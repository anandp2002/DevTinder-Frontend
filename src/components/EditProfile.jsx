import { useState } from 'react';
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {
  CLOUDINARY_URL,
  CLOUDINARY_PRESET,
  CLOUDINARY_FOLDER,
} from '../utils/constants';
import { Loader } from 'lucide-react';

const DEFAULT_PROFILE_URL =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/340px-Default_pfp.svg.png';

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || '');
  const [gender, setGender] = useState(user.gender || '');
  const [about, setAbout] = useState(user.about || '');
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false); // Track save operation
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_PRESET);
    formData.append('folder', CLOUDINARY_FOLDER);

    try {
      setUploading(true);
      const res = await axios.post(CLOUDINARY_URL, formData);
      setPhotoUrl(res.data.secure_url); // Set the uploaded image URL
      toast.success('Image updated successfully!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to update image, try again!');
    } finally {
      setUploading(false);
    }
  };

  const saveProfile = async () => {
    if (photoUrl === DEFAULT_PROFILE_URL) {
      toast.error('Please upload a new profile image to complete the profile!');
      return;
    }

    setError('');
    setSaving(true); // Start the saving state
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
      toast.success('Profile saved successfully!');
      navigate('/');
    } catch (err) {
      setError(err.response?.data || 'Something went wrong!');
    } finally {
      setSaving(false); // Stop the saving state
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-start justify-center my-8 gap-8 w-full">
      <div className="flex justify-center max-w-xl px-4 w-full">
        <div className="card bg-base-300 w-full shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-blue-100 font-bold justify-center">
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
                  <span className="label-text">Photo</span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="file-input file-input-bordered w-full"
                  onChange={handleImageUpload}
                />
                {uploading && (
                  <div className="flex items-center justify-center gap-2 mt-4">
                    <Loader className="animate-spin text-white size-5" />
                    Uploading...
                  </div>
                )}
              </label>
              {photoUrl === DEFAULT_PROFILE_URL && (
                <p className="text-yellow-500 text-sm mt-2">
                  Please upload a new profile picture to save your profile.
                </p>
              )}
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
                className={`btn font-bold ${
                  saving || photoUrl === DEFAULT_PROFILE_URL
                    ? 'bg-gray-400'
                    : 'bg-[#316FF6] hover:bg-blue-600'
                } text-white w-full`}
                onClick={saveProfile}
                disabled={saving || photoUrl === DEFAULT_PROFILE_URL} // Disable if saving or default photo
              >
                {saving ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader className="animate-spin text-white size-5" />
                    Saving...
                  </div>
                ) : (
                  'Save'
                )}
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
  );
};

export default EditProfile;
