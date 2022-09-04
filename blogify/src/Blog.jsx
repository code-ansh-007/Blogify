import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";

const Blog = () => {
  const { id } = useParams();
  console.log(id);
  const [state, setState] = useState({
    posts: [],
  });
  useEffect(() => {
    const getBlogPost = () => {
      axios
        .get("http://localhost:5000/data")
        .then((response) => {
          const data = response.data;
          setState({ posts: data });
          console.log("The posts have been recieved successfully");
          console.log(state.posts);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getBlogPost();
  }, []);

  const displayBlogPost = (posts) => {
    if (!posts.length) {
      return null;
    }
    return state.posts.map((post, index) => {
      if (post._id === id) {
        return (
          <div key={index} className="blog-post">
            <h2 style={{ marginTop: "50px" }}>{post.title}</h2>
          </div>
        );
      }
    });
  };

  return (
    <>
      <Header />
      {displayBlogPost(state.posts)}
      <Footer />
    </>
  );
};

export default Blog;
