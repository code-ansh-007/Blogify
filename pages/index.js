import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import Banner from "../components/Banner";
import BlogCard from "../components/BlogCard";
import EditModal from "../components/EditModal";
import { db } from "../firebase";
import { modalState } from "../recoil/modalAtom";

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isOpen, blogId } = useRecoilValue(modalState);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onSnapshot(
      query(collection(db, "blogs"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setBlogs(snapshot.docs);
        setLoading(false);
      }
    );
    return unsubscribe;
  }, [db]);

  return (
    <>
      <Head>
        <title>Blogify</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex items-center mt-3 justify-center">
        <Banner />
      </div>
      <section
        className={
          loading
            ? "flex flex-col h-full items-center justify-center"
            : "flex flex-col items-center justify-center place-items-center md:grid grid-cols-2"
        }
      >
        {loading ? (
          <i className="fa-solid fa-spinner animate-spin text-7xl text-gray-600"></i>
        ) : (
          blogs?.map((blog) => {
            return (
              <BlogCard
                key={blog.id}
                id={blog.id}
                blogId={blog.id}
                username={blog.data().username}
                content={blog.data().content}
                title={blog.data().title}
                image={blog.data().image}
                profileImg={blog.data().profileImg}
                userId={blog.data().uid}
                timestamp={blog.data().timestamp}
              />
            );
          })
        )}
      </section>
      {isOpen && <EditModal blogId={blogId} />}
    </>
  );
}
