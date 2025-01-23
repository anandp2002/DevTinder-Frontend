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
      dispatch(removeUserFromFeed(userId));
      const res = await axios.post(
        BASE_URL + '/request/send/' + status + '/' + userId,
        {},
        { withCredentials: true }
      );
    } catch (err) {}
  };

  return (
    <div className="card bg-gray-900 shadow-xl m-4">
      <figure>
        <img
          className="h-80 w-80 sm:h-[340px] sm:w-[340px] object-cover"
          src={photoUrl}
          alt="user"
        />
      </figure>

      <div className="p-4">
        <h2 className="card-title text-white">{firstName + ' ' + lastName}</h2>
        <div className="items-center flex justify-start">
          {gender && <p className="">{gender}</p>}
          {age && (
            <>
              <span>{' , '}</span>
              <p className="ml-2">{age}</p>
            </>
          )}
        </div>
        {about && <p>{about}</p>}
      </div>
      <div className=" flex justify-end pb-5">
        <div className="justify-end gap-4 flex pr-5">
          <button
            onClick={() => handleSendRequest('ignored', _id)}
            className="btn bg-red-500 hover:bg-red-600 font-bold  text-white"
          >
            Reject
          </button>
          <button
            onClick={() => handleSendRequest('interested', _id)}
            className="btn bg-green-500 hover:bg-green-600 font-bold text-white"
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
