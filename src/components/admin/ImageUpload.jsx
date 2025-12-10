import React, { useState } from 'react';
import { storage } from '../../firebase/config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { FaCloudUploadAlt, FaTimes } from 'react-icons/fa';

const ImageUpload = ({ onImageUpload, currentImage }) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(currentImage || '');

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Reset status
    setError('');
    setProgress(0);

    // Create preview
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    // Upload to Firebase Storage
    const storageRef = ref(storage, `images/products/${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        setError(error.message);
        console.error("Upload error:", error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        onImageUpload(downloadURL);
        setProgress(100);
      }
    );
  };

  const handleRemove = () => {
    setPreview('');
    onImageUpload('');
    setProgress(0);
  };

  return (
    <div className="image-upload-container">
      <div className="image-preview-area">
        {preview ? (
          <div className="preview-box">
            <img src={preview} alt="Preview" />
            <button type="button" className="remove-btn" onClick={handleRemove}>
              <FaTimes />
            </button>
          </div>
        ) : (
          <label className="upload-label">
            <FaCloudUploadAlt className="upload-icon" />
            <span>Click to upload image</span>
            <input type="file" accept="image/*" onChange={handleChange} hidden />
          </label>
        )}
      </div>
      
      {progress > 0 && progress < 100 && (
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
      )}
      
      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default ImageUpload;
