import React from 'react';

const UserCard = ({ user }) => {
  const { firstName, lastName, about, gender, age, photoUrl } = user;

  return (
    <div className="card bg-gray-800 w-96 shadow-xl m-4 p-2">
      <figure>
        <img src={photoUrl} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + ' ' + lastName}</h2>
        <div className="flex items-center justify-start">
          {gender && <p className="bg-red-900">{gender}</p>}
          {age && <p className="bg-yellow-900">{age}</p>}
        </div>
        {about && <p>{about}</p>}
        <div className="justify-end gap-x-5 flex">
          <button className="btn btn-primary">Reject</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
