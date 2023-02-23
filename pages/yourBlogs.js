import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import { userAuth } from "../context/AuthContext";
import { db } from "../firebase";
import robot from "../images/robot.png";
import EditModal from "../components/EditModal";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalState } from "../recoil/modalAtom";

const YourBlogs = () => {
  const { user } = userAuth();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isOpen, blogId } = useRecoilValue(modalState);
  // ! authentication code
  const router = useRouter();
  useEffect(() => {
    if (user) {
      return;
    }
    router.push("/login");
  }, []);

  useEffect(() => {
    if (!user) {
      return;
    }
    setLoading(true);
    const unsubscribe = onSnapshot(
      query(
        collection(db, "blogs"),
        where("uid", "==", user.uid || ""),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => {
        setBlogs(snapshot.docs);
        setLoading(false);
      }
    );
    return unsubscribe;
  }, [db, user]);

  return (
    <>
      <Head>
        <title>Blogify - Your Blogs</title>
      </Head>
      <section
        className={
          blogs.length > 0
            ? "flex flex-col items-center justify-center"
            : "flex flex-col items-center justify-center h-full"
        }
      >
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              id={blog.id}
              username={blog.data().username}
              content={blog.data().content}
              title={blog.data().title}
              image={blog.data().image}
              profileImg={blog.data().profileImg}
              userId={user.uid}
              blogId={blog.id}
            />
          ))
        ) : loading ? (
          <i className="fa-solid fa-spinner animate-spin text-7xl text-gray-600"></i>
        ) : (
          <div className="flex flex-col items-center">
            <Image src={robot} width={200} alt="confused robot image" />
            <span className="text-2xl font-bold text-gray-500">
              No Blogs Yet!
            </span>
          </div>
        )}
      </section>
      {isOpen && <EditModal blogId={blogId} />}
    </>
  );
};

export default YourBlogs;
