import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionsSlice';
import { Loader } from 'lucide-react';

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const [loading, setLoading] = useState(true); // Loading state

  const getConnections = async () => {
    setLoading(true); // Set loading state to true before fetching
    try {
      const res = await axios.get(BASE_URL + '/user/connections', {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  // Render a loading spinner while data is being fetched
  if (loading) {
    return (
      <div className="text-white -mt-16 sm:-mt-10 min-h-screen items-center flex justify-center text-2xl">
        <Loader className="animate-spin text-gray-500 size-10" />
      </div>
    );
  }

  if (!connections || connections.length === 0) {
    return (
      <div className="text-white -mt-16 sm:-mt-10 min-h-screen items-center flex flex-col justify-center">
        <p className=" text-3xl"> Sorry, No Connections !</p>
        <p className="text-xl mt-2"> Find some matches</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 m-6 min-h-screen -pt-16 sm:-pt-10">
      <h1 className="text-center font-bold text-2xl text-blue-100">
        Your Connections
      </h1>
      {connections.map((conn, index) => {
        const { firstName, lastName, gender, about, age, photoUrl } = conn;
        return (
          <div
            className="bg-base-300 max-w-lg mx-auto gap-4 w-full flex items-center p-4 rounded-lg"
            key={index}
          >
            <div className="h-20 w-20">
              <img
                className="h-20 w-20 object-cover rounded-full"
                alt="photo"
                src={photoUrl}
              />
            </div>
            <div>
              <h1 className="text-lg text-white font-bold">
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
