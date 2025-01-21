import React from 'react';

const UserCard = ({ user }) => {
  const { firstName, lastName, about, gender, age, photoUrl } = user;

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
          <button className="btn btn-primary">Reject</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
