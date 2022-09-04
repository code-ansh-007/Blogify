import React, { useState, useEffect } from "react";
import Header from "./Header";
import MiniBlog from "./MiniBlog";
import Img from "./images/contemplative-reptile.jpg";
import CreatePost from "./CreatePost";
import Profile from "./Profile";
import News from "./News";
import axios from "axios";
import {NavLink} from "react-router-dom";

// const data = content.filter((e) => {
//   return e.name === "Ayush Mishra";
// });

const SignUp = () => {
  const [state, setState] = useState({
    posts: [],
  });
  const [q, setQ] = useState("");

  

  const fun = (e) => {
    setQ(e.target.value);
    console.log(e);
  }

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
    return state.posts.filter((post)=>{
      if(q===""){
        return post;
      }else if(post.title.toLowerCase().includes(q.toLowerCase())){
        return post;
      }
    }).map((post, index) => {
      return (
        <div key={index} className="blog-post">
          {/* <h3>{post.title}</h3>
        <p>{post.text}</p> */}
          <MiniBlog
            // img={post.imgSrc}
            img="https://mobile-cuisine.com/wp-content/uploads/2019/01/Souther-Food-Fun-Facts.jpg"
            name={post.name}
            title={post.title}
            text={post.text}
            key={post._id}
          />
        </div>
      );
    });
  };

  return (
    <>
      <Header />
      <div className="main-container">
        <div className="left">
          <Profile />
        </div>
        <div className="center" style={{ fontSize: "12px" }}>
            <input type="text" class="search-bar" placeholder="Search Anything ..." onChange={(e)=>fun(e)} />
          <CreatePost />
          {/* {state.posts.map((e) => {
              return (
                <MiniBlog
                  className="feed-element"
                  img={Img}
                  name={e.name}
                  text={e.text}
                //   date={e.date}
                  key={e._id}
                />
              );
            })} */}
          {displayBlogPost(state.posts)}
        </div>
        <div className="right">
          <h2>News</h2>
          <News />
        </div>
      </div>
    </>
  );
};

export default SignUp;
