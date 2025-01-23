import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests, removeRequest } from '../utils/requestsSlice';
import { useEffect, useState } from 'react';
import { Loader } from 'lucide-react';

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // Loading state

  const reviewRequest = async (status, _id) => {
    try {
      dispatch(removeRequest(_id));
      await axios.post(
        BASE_URL + '/request/review/' + status + '/' + _id,
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const fetchRequests = async () => {
    setLoading(true); // Set loading state to true before fetching
    try {
      const res = await axios.get(BASE_URL + '/user/requests/received', {
        withCredentials: true,
      });
      // Sort requests by creation date (newest first)
      const sortedRequests = res.data.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      dispatch(addRequests(sortedRequests));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false); // Set loading state to false after fetching
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Show loading message or spinner
  if (loading) {
    return (
      <div className="text-white -mt-16 sm:-mt-10 min-h-screen items-center flex justify-center text-2xl">
        <Loader className="animate-spin text-gray-500 w-10 h-10" />
      </div>
    );
  }

  if (!requests || requests.length === 0) {
    return (
      <div className="text-white -mt-16 sm:-mt-10 min-h-screen items-center flex flex-col justify-center">
        <p className="text-3xl">No New Requests !</p>
      </div>
    );
  }

  return (
    <div className="text-center m-6 min-h-screen">
      <h1 className="text-center font-bold text-2xl text-blue-100 mb-6">
        Connection Requests
      </h1>

      {requests.map((request) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          request.fromUserId;

        return (
          <div
            key={_id}
            className="flex flex-col sm:flex-row items-center sm:justify-between m-4 p-6 rounded-lg bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg max-w-2xl mx-auto gap-4"
          >
            {/* Profile Picture */}
            <div className="flex-shrink-0">
              <img
                alt="photo"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover"
                src={photoUrl}
              />
            </div>

            {/* User Information */}
            <div className="text-center sm:text-left sm:mx-6 flex-1">
              <h2 className="font-semibold text-lg text-white">
                {firstName + ' ' + lastName}
              </h2>
              {age && gender && (
                <p className="text-gray-400 mt-1">{age + ', ' + gender}</p>
              )}
              <p className="text-gray-300 mt-2">{about}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-row gap-4 w-full sm:w-auto justify-center">
              <button
                className="btn bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg w-28 sm:w-auto"
                onClick={() => reviewRequest('rejected', request._id)}
              >
                Reject
              </button>
              <button
                className="btn bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg w-28 sm:w-auto"
                onClick={() => reviewRequest('accepted', request._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
