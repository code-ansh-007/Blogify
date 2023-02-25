import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { AiFillCamera } from "react-icons/ai";
import { userAuth } from "../context/AuthContext";
import { db, storage } from "../firebase";

const create = () => {
  const router = useRouter();
  const imagePickerRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const { user } = userAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");

  const uploadPost = async (e) => {
    e.preventDefault();
    try {
      setMessage("Uploading Post");
      if (loading) return;
      setLoading(true); // ? setting loading state to true the first time user clicks the post button
      // * create blog in firestore
      const docRef = await addDoc(collection(db, "blogs"), {
        uid: user.uid,
        username: user.displayName.toLowerCase().replace(/\s/g, ""),
        title: title
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" "),
        content: content,
        profileImg: user.photoURL,
        timestamp: serverTimestamp(),
      });
      // * get the image ref from the storage by using firebase url
      const imageRef = ref(storage, `blogs/${docRef.id}/image`);
      // * 3) upload the image to the firebase storage with the blog id
      // * 4) get a download URL from the fb storage and update original blog with the image
      await uploadString(imageRef, selectedFile, "data_url").then(
        async (snapshot) => {
          const downloadUrl = await getDownloadURL(imageRef);
          await updateDoc(doc(db, "blogs", docRef.id), {
            image: downloadUrl,
          });
        }
      );
      setLoading(false);
      setSelectedFile(null);
      setTitle("");
      setContent("");
      setMessage("Post Uploaded Successfully");
    } catch (error) {
      console.log(error.message);
      setMessage("Post could not be uploaded!");
    }
  };

  const addImageToBlog = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  useEffect(() => {
    let timeoutId;
    timeoutId = setTimeout(() => {
      setMessage("Slow Internet Detected!");
    }, 7000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [message]);

  useEffect(() => {
    if (user) {
      return;
    }
    router.push("/login");
  }, []);

  return (
    <>
      <Head>
        <title>Blogify - Create Blog</title>
      </Head>
      <main className="flex flex-col items-center justify-center h-full">
        <span className="text-3xl text-gray-600 mb-5">Create Blog</span>
        <form onSubmit={uploadPost} className="flex flex-col space-y-10">
          <textarea
            name="title"
            id="title"
            placeholder="Title..."
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            className="resize-none scrollbar-thin scrollbar-thumb-gray-400 w-full overflow-auto break-words border-b border-gray-400 h-10 outline-none"
          ></textarea>

          {selectedFile ? (
            <div className="relative flex">
              <img
                src={selectedFile}
                className="w-[300px] object-contain cursor-pointer rounded-lg"
                alt="post image"
              />
              <span
                onClick={() => setSelectedFile(null)}
                className="bg-black bg-opacity-30 text-white text-center py-4 font-semibold absolute bottom-0 w-[298px] rounded-b-lg"
              >
                Select another one
              </span>
            </div>
          ) : (
            <div
              onClick={() => imagePickerRef.current.click()}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <AiFillCamera className="text-3xl text-gray-500 active:scale-105 transition transform duration-200" />
              <span className="text-gray-600">Upload Pic</span>
            </div>
          )}
          <input
            ref={imagePickerRef}
            type="file"
            name="imageUpload"
            id="imageUpload"
            hidden
            className="w-fit"
            onChange={addImageToBlog}
          />
          <textarea
            className="outline-none resize-none h-32 border-b border-gray-400 px-1"
            name="content"
            id="content"
            cols="30"
            rows="2"
            placeholder="Write here..."
            maxLength="1000"
            spellCheck="false"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          ></textarea>
          <div className="flex items-center space-x-3">
            <button
              type="submit"
              disabled={!title || !selectedFile || !content}
              className={
                !title || !selectedFile || !content
                  ? "bg-opacity-40 w-fit bg-gray-400 px-2 py-1 rounded-md text-xl text-white transform transition active:scale-105 duration-150"
                  : "w-fit bg-gray-400 px-2 py-1 rounded-md text-xl text-white transform transition active:scale-105 duration-150"
              }
            >
              Post
            </button>
            {loading && (
              <div className="flex items-center space-x-3">
                <i className="fa-solid fa-spinner animate-spin text-2xl"></i>
                {message && <div>{message}</div>}
              </div>
            )}
          </div>
        </form>
      </main>
    </>
  );
};

export default create;
