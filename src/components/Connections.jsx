import axios from 'axios';
import React, { useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionsSlice';

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const getConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + '/user/connections', {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));

      console.log(res?.data?.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  if (!connections) return;

  if (connections.length == 0) {
    return <h1>No connections found !</h1>;
  }
  return (
    <div className="flex flex-col gap-6 m-6">
      <h1 className="text-center font-bold text-3xl text-yellow-200">
        Connections
      </h1>
      {connections.map((conn, index) => {
        const { firstName, lastName, gender, about, age, photoUrl } = conn;
        return (
          <div
            className="bg-gray-700 max-w-xl mx-auto gap-4 w-full flex items-center p-4 rounded-lg"
            key={index}
          >
            <div>
              <img
                className="h-20 w-20 object-cover"
                alt="photo"
                src={photoUrl}
              />
            </div>
            <div>
              <h1 className="text-lg font-bold">
                {firstName + ' ' + lastName}
              </h1>
              <div className="flex gap-x-3">
                <p>{gender && gender}</p>
                <p>{age && age}</p>
              </div>
              <p>{about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
