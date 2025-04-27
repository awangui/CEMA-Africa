import React from 'react';

const ProgramCard = ({ programName, programDescription, numOfPeople, onClick }) => {
  return (
    <div
      className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
      onClick={onClick}
    >
      <h2 className="text-xl font-semibold mb-2">{programName}</h2>
      <p className="text-gray-600 text-sm mb-4">{programDescription}</p>
      <div className="flex items-center justify-between">
        <span className="text-gray-500 text-sm">Enrolled: {numOfPeople} people</span>
        <button
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-all duration-200"
          onClick={onClick}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProgramCard;
