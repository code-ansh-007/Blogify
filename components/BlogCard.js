import { BsThreeDots } from "react-icons/bs";
import Image from "next/image";
import { useState } from "react";
import { userAuth } from "../context/AuthContext";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { modalState } from "../recoil/modalAtom";

const BlogCard = ({
  blogId,
  userId,
  username,
  content,
  image,
  profileImg,
  title,
  timestamp,
}) => {
  const { user } = userAuth();
  const [showOptions, setShowOptions] = useState(false);
  const router = useRouter();
  const [openModal, setOpenModal] = useRecoilState(modalState);

  async function deleteBlog() {
    try {
      await deleteDoc(doc(db, "blogs", blogId));
    } catch (error) {
      console.log(error);
    }
  }

  function handleClick() {
    router.push({
      pathname: `/blog/${blogId}`,
      query: {
        title,
        content,
        username,
        profileImg,
        image,
        timestamp,
      },
    });
  }

  return (
    <>
      <section className="bg-white flex flex-col my-5 border-b-[1px] border-gray-400 mx-1 md:mx-0 max-w-3xl">
        {/* TOP SECTION */}
        <div className="flex items-center justify-between px-3 pl-0 py-2 ">
          <span className="flex space-x-3 items-center">
            <Image
              src={profileImg}
              width={30}
              height={30}
              alt="User Profile pic"
              className="rounded-full"
            />
            {/* TO BE REPLACED WITH USERNAME FROM USER OBJECT */}
            <span className="">{username}</span>
          </span>
          <div className="relative">
            {userId === user?.uid && (
              <BsThreeDots
                className="text-2xl"
                onClick={() => setShowOptions(!showOptions)}
              />
            )}
            {showOptions && (
              <div className="absolute right-0 top-10 bg-gray-100 flex flex-col space-y-2 p-2 rounded-md font-semibold text-gray-500">
                <span
                  onClick={() => {
                    // console.log(blogId);
                    setOpenModal({ isOpen: true, blogId: blogId });
                  }}
                  className="flex items-center space-x-1 active:scale-105 transition transform duration-150 ease-in-out"
                >
                  <i className="fa-solid fa-pencil duration-200"></i>
                  <span>Edit</span>
                </span>
                <span
                  onClick={deleteBlog}
                  className="flex items-center space-x-1 text-red-500 active:scale-105 transition transform duration-150 ease-in-out"
                >
                  <i className="fa-solid fa-trash hover:scale-105 hover:animate-pulse"></i>
                  <span>Delete</span>
                </span>
              </div>
            )}
          </div>
        </div>
        {/* IMAGES SECTION */}
        <div onClick={handleClick} className="">
          <div className="sm:h-[450px] sm:w-[650px] w-[400px] h-[300px]">
            <img
              src={image}
              className="object-cover w-full h-full rounded-lg"
              alt="pic"
            />
          </div>
          <div className="pl-1 py-2">
            <div className="flex">
              <span className="text-xl sm:text-md font-bold  w-[300px] sm:w-[600px] cursor-pointer truncate">
                {title}
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogCard;
