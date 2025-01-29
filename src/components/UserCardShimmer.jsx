import React from 'react';

const UserCardShimmer = () => {
  return (
    <div className="card bg-base-300 shadow-xl m-4 animate-pulse">
      <div className="h-80 w-80 sm:h-[340px] sm:w-[340px] bg-gray-700 rounded" />
      <div className="p-4">
        <div className="h-6 w-40 bg-gray-700 rounded mb-2"></div>
        <div className="h-4 w-20 bg-gray-700 rounded"></div>
      </div>
      <div className="flex justify-end pb-5">
        <div className="justify-end gap-4 flex pr-5">
          <div className="h-10 w-20 bg-gray-700 rounded"></div>
          <div className="h-10 w-20 bg-gray-700 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default UserCardShimmer;
