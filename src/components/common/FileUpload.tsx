import React, { useState, useRef } from 'react';
import { Check, Upload, X } from 'lucide-react';

interface FileUploadProps {
  id: string;
  label: string;
  onChange: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  error?: string;
  required?: boolean;
  className?: string;
  maxFileSize?: number; // in MB
}

const FileUpload: React.FC<FileUploadProps> = ({
  id,
  label,
  onChange,
  accept = '.pdf,.jpg,.jpeg,.png',
  multiple = false,
  error,
  required = false,
  className = '',
  maxFileSize = 5, // 5MB default
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [fileErrors, setFileErrors] = useState<{ [key: string]: string }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileList = Array.from(e.target.files);
      validateAndSetFiles(fileList);
    }
  };

  const validateAndSetFiles = (fileList: File[]) => {
    const newErrors: { [key: string]: string } = {};
    const validFiles = fileList.filter(file => {
      // Check file size
      if (file.size > maxFileSize * 1024 * 1024) {
        newErrors[file.name] = `File size exceeds ${maxFileSize}MB limit`;
        return false;
      }
      return true;
    });

    const newFiles = multiple ? [...files, ...validFiles] : validFiles;
    setFiles(newFiles);
    setFileErrors(newErrors);
    onChange(newFiles);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      const fileList = Array.from(e.dataTransfer.files);
      validateAndSetFiles(fileList);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    onChange(newFiles);
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className={`mb-4 ${className}`}>
      <label 
        htmlFor={id} 
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div
        className={`border-2 border-dashed rounded-md p-4 flex flex-col items-center justify-center cursor-pointer transition-colors duration-200 ${
          isDragging 
            ? 'border-teal-500 bg-teal-50' 
            : error 
              ? 'border-red-500 bg-red-50' 
              : 'border-gray-300 hover:border-teal-500 hover:bg-gray-50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={triggerFileInput}
      >
        <input
          ref={fileInputRef}
          id={id}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileChange}
          className="hidden"
        />
        
        <Upload className="w-8 h-8 text-gray-400 mb-2" />
        <p className="text-sm text-gray-500 mb-1">
          Drag & drop files here, or click to select
        </p>
        <p className="text-xs text-gray-400">
          Accepted formats: {accept.split(',').join(', ')} (Max: {maxFileSize}MB)
        </p>
      </div>
      
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      
      {files.length > 0 && (
        <div className="mt-3">
          <p className="text-sm font-medium text-gray-700 mb-2">Uploaded files:</p>
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li 
                key={`${file.name}-${index}`}
                className="flex items-center justify-between bg-gray-50 p-2 rounded-md"
              >
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-sm text-gray-600 truncate max-w-xs">
                    {file.name}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                  className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
          
          {Object.keys(fileErrors).length > 0 && (
            <div className="mt-2">
              {Object.entries(fileErrors).map(([fileName, error]) => (
                <p key={fileName} className="text-sm text-red-500">
                  {fileName}: {error}
                </p>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUpload;