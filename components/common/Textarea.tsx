
import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  helperText?: string;
}

const Textarea: React.FC<TextareaProps> = ({ label, id, helperText, ...props }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <textarea
        id={id}
        {...props}
        rows={4}
        className="block w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
      ></textarea>
      {helperText && <p className="mt-2 text-xs text-gray-500">{helperText}</p>}
    </div>
  );
};

export default Textarea;
