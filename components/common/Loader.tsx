
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center">
      <div
        className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
