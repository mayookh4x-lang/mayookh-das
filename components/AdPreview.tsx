
import React from 'react';

interface AdPreviewProps {
  headline: string;
  primaryText: string;
  imageUrl: string;
}

const AdPreview: React.FC<AdPreviewProps> = ({ headline, primaryText, imageUrl }) => {
  return (
    <div className="w-full max-w-md mx-auto bg-white border border-gray-300 rounded-lg overflow-hidden shadow-md font-helvetica, arial, sans-serif">
      <div className="p-3">
        <div className="flex items-center">
          <img className="h-10 w-10 rounded-full" src="https://picsum.photos/50" alt="Page logo" />
          <div className="ml-3">
            <p className="text-sm font-semibold text-gray-800">Your Page Name</p>
            <p className="text-xs text-gray-500">Sponsored</p>
          </div>
        </div>
        <p className="mt-3 text-sm text-gray-800">
          {primaryText}
        </p>
      </div>
      
      {imageUrl ? (
        <img className="w-full h-auto object-cover" src={imageUrl} alt="Ad creative" />
      ) : (
        <div className="w-full bg-gray-200 aspect-square flex items-center justify-center">
          <p className="text-gray-500">Loading image...</p>
        </div>
      )}

      <div className="bg-gray-100 p-3">
        <div className="flex items-center justify-between">
          <div className="flex-1 pr-4">
            <p className="text-xs uppercase text-gray-500">yourwebsite.com</p>
            <p className="text-sm font-semibold text-gray-800 truncate">{headline}</p>
          </div>
          <button className="flex-shrink-0 bg-gray-200 text-gray-700 text-sm font-bold py-2 px-4 rounded-md hover:bg-gray-300">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdPreview;
