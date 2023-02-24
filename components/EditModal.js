import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import React, { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { db, storage } from "../firebase";
import { modalState } from "../recoil/modalAtom";
import { AiFillCamera } from "react-icons/ai";

const EditModal = ({ blogId }) => {
  const [openModal, setOpenModal] = useRecoilState(modalState);
  const imagePickerRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [newTitle, setNewTitle] = useState("");

  const [content, setContent] = useState("");
  const [newContent, setNewContent] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);
  const [newSelectedFile, setNewSelectedFile] = useState(null);

  const [message, setMessage] = useState("");
  const [showCancel, setShowCancel] = useState(false);

  const handleClose = (e) => {
    if (
      e.target.className ===
      "h-full fixed top-0 left-0 w-full flex flex-col items-center justify-center bg-black bg-opacity-50"
    ) {
      setOpenModal(false);
    }
  };

  // ! MAIN FUNCTION
  async function updatePost(e) {
    e.preventDefault();
    if (
      title === newTitle &&
      content === newContent &&
      selectedFile === newSelectedFile
    ) {
      setOpenModal(false);
      return;
    }
    try {
      setMessage("Updating Post");
      if (loading) return;
      setLoading(true);
      // * UPDATE BLOG IN FIREBASE
      await updateDoc(doc(db, "blogs", blogId), {
        title: newTitle
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" "),
        content: newContent,
        timestamp: serverTimestamp(),
      });
      if (newSelectedFile !== selectedFile) {
        // * getting the image ref for the new image
        const imageRef = ref(storage, `blogs/${blogId}/image`);
        // * uploading new image to the imageRef
        await uploadString(imageRef, newSelectedFile, "data_url").then(
          async (snapshot) => {
            const downloadUrl = await getDownloadURL(imageRef);
            await updateDoc(doc(db, "blogs", blogId), {
              image: downloadUrl,
            });
          }
        );
      } else {
        await updateDoc(doc(db, "blogs", blogId), {
          image: selectedFile,
        });
      }
      setLoading(false);
      setNewSelectedFile(null);
      setNewTitle("");
      setNewContent("");
      setOpenModal(false);
    } catch (error) {
      console.log(error);
    }
  }

  const addImageToBlog = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setNewSelectedFile(readerEvent.target.result);
    };
  };

  useEffect(() => {
    async function getBlog() {
      const blogSnap = await getDoc(doc(db, "blogs", blogId));
      const data = blogSnap.data();
      setTitle(data.title); // ? original data
      setNewTitle(data.title);
      setSelectedFile(data.image); // ? original data
      setNewSelectedFile(data.image);
      setContent(data.content); // ? original data
      setNewContent(data.content);
    }
    getBlog();
  }, []);

  return (
    <>
      <section
        onClick={handleClose}
        className="h-full fixed top-0 left-0 w-full flex flex-col items-center justify-center bg-black bg-opacity-50"
      >
        <main className="flex flex-col max-h-[700px] overflow-y-hidden items-center justify-center p-5 rounded-md bg-white">
          <span className="text-3xl text-gray-500 mb-5">Edit Blog</span>
          <form onSubmit={updatePost} className="flex flex-col space-y-10">
            <input
              type="text"
              name="title"
              id="title"
              className="border-b border-gray-400 h-10 outline-none"
              placeholder="Title..."
              value={newTitle}
              onChange={(e) => {
                setNewTitle(e.target.value);
              }}
            />
            {newSelectedFile ? (
              <div className="relative">
                <img
                  src={newSelectedFile}
                  className="w-[300px] object-contain cursor-pointer rounded-lg"
                  alt="post image"
                />
                <span
                  onClick={() => setNewSelectedFile(null)}
                  className="bg-black bg-opacity-30 text-white text-center py-4 font-semibold absolute bottom-0 w-full"
                >
                  Select another one
                </span>
              </div>
            ) : (
              <div
                className="flex items-center space-x-2"
                onClick={() => imagePickerRef.current.click()}
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
              value={newContent}
              onChange={(e) => {
                setNewContent(e.target.value);
              }}
            ></textarea>
            <div className="flex items-center space-x-3">
              <button
                type="submit"
                disabled={!newTitle || !newSelectedFile || !newContent}
                onClick={() => setShowCancel(!showCancel)}
                className={
                  !newTitle || !newSelectedFile || !newContent
                    ? "bg-opacity-40 w-fit bg-gray-400 px-2 py-1 rounded-md text-xl text-white transform transition active:scale-105 duration-150"
                    : "w-fit bg-gray-400 px-2 py-1 rounded-md text-md text-white transform transition active:scale-105 duration-150"
                }
              >
                Save Changes
              </button>
              {!showCancel && (
                <button
                  onClick={() => setOpenModal(false)}
                  className="w-fit px-2 py-1 rounded-md transform transition active:scale-105 duration-150 text-red-600 text-md bg-red-300 font-semibold"
                >
                  Cancel
                </button>
              )}
              {loading && (
                <div className="flex items-center space-x-3">
                  <i className="fa-solid fa-spinner animate-spin text-2xl"></i>
                  {message && <div>{message}</div>}
                </div>
              )}
            </div>
          </form>
        </main>
      </section>
    </>
  );
};

export default EditModal;
