import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { storage } from "../firebase";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { db } from "../firebase";
import { Ellipsis } from "react-css-spinners";

const AppearanceTab: React.FC = () => {
  const [title, setTitle] = useState<string | null>("");
  const [bio, setBio] = useState<string | null>("");
  const [imageUrl, setImageUrl] = useState<string | null>("");
  const [displayImage, setDisplayImage] = useState<string | null>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePath, setImagePath] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const authContext = useContext(AuthContext);
  const user = authContext?.currentUser;

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setTitle(docSnap.data()?.title || null);
          setBio(docSnap.data()?.bio || null);
          setImageUrl(docSnap.data()?.imageUrl || null);
          setImagePath(docSnap.data()?.imagePath || null);
        }
      }
    };

    if (user) {
      fetchUserDetails();
    }
  }, [user]);

  useEffect(() => {
    setDisplayImage(imageUrl);
  }, [imageUrl]);

  const handleRemoveImage = async () => {
    if (user && imageUrl && imagePath) {
      // We need the imagePath to delete the image
      const imageRef = ref(storage, imagePath);
      await deleteObject(imageRef);
      setImageUrl(null);
      setImagePath(null);
      setDisplayImage(null);
      await setDoc(
        doc(db, "users", user.uid),
        { imageUrl: null, imagePath: null },
        { merge: true }
      );
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
      // Create a blob URL representing the image file right away
      setDisplayImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (user) {
      const userProfile = {
        title: title ? title : user.displayName,
        bio: bio,
        imageUrl: imageUrl,
        imagePath: imagePath || "", // We will store the image path here
      };
      if (selectedFile) {
        const imagePath = `profileImages/${uuidv4()}`;
        const storageRef = ref(storage, imagePath);
        const uploadTask = uploadBytesResumable(storageRef, selectedFile);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
          },
          (error) => {
            console.error("Upload failed:", error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            userProfile.imageUrl = downloadURL;
            userProfile.imagePath = imagePath; // Store the path to the image
            await setDoc(doc(db, "users", user.uid), userProfile, {
              merge: true,
            });
            setImagePath(imagePath);
            setLoading(false);
            setUpdateSuccess(true);
            setSelectedFile(null);
          }
        );
      } else {
        await setDoc(doc(db, "users", user.uid), userProfile, { merge: true });
        setLoading(false);
        setUpdateSuccess(true);
      }
    }
  };

  if (!loading) {
    setTimeout(() => {
      setUpdateSuccess(false);
    }, 3000); // disappears after 3 seconds
  }

  return (
    <div className="max-w-xl mx-auto my-6">
      <div className="mb-8">
        {loading && (
          <div className="flex items-center space-x-2">
            <Ellipsis color="purple" />
            <span className="text-indigo-600">Updating profile...</span>
          </div>
        )}
        {updateSuccess && (
          <div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline">
              {" "}
              Profile updated successfully!
            </span>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between mb-6">
        {displayImage ? (
          <img
            className="w-32 h-32 rounded-full object-cover border-2 border-indigo-600"
            src={displayImage}
            alt="Profile"
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
            <p className="text-2xl text-gray-400">No Image</p>
          </div>
        )}
        <div>
          <label
            htmlFor="file"
            className="inline-block px-4 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-500 cursor-pointer mr-2"
          >
            Pick an image
          </label>
          <button
            className="inline-block px-4 py-2 mt-2 text-white bg-gray-500 rounded hover:bg-gray-400"
            onClick={handleRemoveImage}
          >
            Remove
          </button>
          <input
            id="file"
            type="file"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block mb-1 font-bold">
            Profile Title
          </label>
          <input
            id="title"
            type="text"
            value={title || ""}
            onChange={handleTitleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label htmlFor="bio" className="block mb-1 font-bold">
            Bio
          </label>
          <textarea
            id="bio"
            value={bio || ""}
            onChange={handleBioChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-500"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default AppearanceTab;
