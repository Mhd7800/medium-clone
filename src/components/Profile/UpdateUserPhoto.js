import { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const UpdateUserPhoto = ({ userId }) => {
  const [newPhoto, setNewPhoto] = useState(null);

  const handlePhotoChange = (e) => {
    // Handle the photo selection
    const file = e.target.files[0];
    setNewPhoto(file);
  };

  const handleUpdatePhoto = async () => {
    if (!newPhoto) return;

    try {
      // Upload the new photo to Firebase Storage
      const storageRef = firebase.storage().ref(`user-photos/${userId}`);
      const photoSnapshot = await storageRef.put(newPhoto);

      // Get the download URL of the uploaded photo
      const downloadURL = await photoSnapshot.ref.getDownloadURL();

      // Update the user's photo URL in Firestore
      await firebase.firestore().collection('users').doc(userId).update({
        photoURL: downloadURL,
      });

      // Optionally, you can update the local state with the new photo URL
      // setUserInfo({ ...userInfo, photoURL: downloadURL });
    } catch (error) {
      console.error('Error updating user photo:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handlePhotoChange} />
      <button onClick={handleUpdatePhoto}>Update Photo</button>
    </div>
  );
};

export default UpdateUserPhoto;
