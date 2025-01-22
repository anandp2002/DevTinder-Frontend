import axios from 'axios';
import React from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, about, gender, age, photoUrl } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + '/request/send/' + status + '/' + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {}
  };

  return (
    <div className="card bg-gray-800 shadow-xl m-4 p-2">
      <figure>
        <img className="h-80 w-auto object-cover" src={photoUrl} alt="user" />
      </figure>
      <div className="p-4">
        <h2 className="card-title text-white">{firstName + ' ' + lastName}</h2>
        <div className="items-center justify-start">
          {gender && <p className="">{gender}</p>}
          {age && <p className="">{age}</p>}
        </div>
        {about && <p>{about}</p>}
      </div>
      <div className="card-body flex justify-end -mt-4">
        <div className="justify-end gap-4 flex -my-7">
          <button
            onClick={() => handleSendRequest('ignored', _id)}
            className="btn btn-primary"
          >
            Reject
          </button>
          <button
            onClick={() => handleSendRequest('interested', _id)}
            className="btn btn-secondary"
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
