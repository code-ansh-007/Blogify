import React, { useEffect } from "react";
import { useState } from "react";
import axios from 'axios'
// import { Axios } from "axios";
// import { getBlogPost } from "./SignUp";

const CreatePost = () => {
  const [state, setState] = useState({
    name: "",
    title: "",
    text: "",
    imgSrc: "",
    posts: []
  });

  //  const getBlogPost = () =>{
  //   axios.get("/data")
  //   .then((response) =>{
  //       const data = response.data;
  //       setState({posts:data})
  //       console.log("The posts have been recieved successfully")
  //       console.log(state.posts)
  //   })
  //   .catch(err =>{
  //       console.log(err);
  //   })
  // }

  // useEffect(()=>{
  //   getBlogPost();
  // });

// const displayBlogPost = (posts) =>{
//     if (!posts.length){
//       return null; 
//     }
//     return state.posts.map((post, index) =>{   
//       <div key = {index}>
//         <h3>{post.title}</h3>
//         <p>{post.text}</p>
//       </div>
//     })
//   }

  const changeHandler = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    console.log(event.target.value);
    setState((prevState)=>{
        return {...prevState,[name]:value}
    });
    console.log(state)
  };

  const submitHandler = async(event) => {
    event.preventDefault();

    const payload = {
      name: state.name,
      title: state.title,
      text: state.text,
    };

    // axios({
    //   url: "http://localhost:5000/save",
    //   method: "POST",
    //   data: payload
    // })
    // .then(() => {
    //   console.log("data has been sent to the server")
    //   // getBlogPost();
    // })

      const data= await axios.post("http://localhost:5000/save",payload);
      console.log(data)
  };

  return (
    <div className="create-post-div">
      <form className="input-form" onSubmit={submitHandler}>
        <input
          type="text"
          name="name"
          value={state.name}
          className="name-input"
          placeholder="Your good name..."
          onChange={changeHandler}
          autoComplete="off"
        />
        <input
          type="text"
          name="title"
          value={state.title}
          className="title-input"
          placeholder="What's the title?"
          onChange={changeHandler}
        />
        {/* <input
          type="text"
          name="imgSrc"
          value={state.imgSrc}
          className="title-input"
          placeholder="Enter image url"
          onChange={changeHandler}
        /> */}
        <textarea
          name="text"
          value={state.text}
          className="text-input"
          placeholder="Write Your Post Here..."
          onChange={changeHandler}
          cols="30"
          rows="3"
          style={{ resize: "none" }}
        ></textarea>
        <button type="submit" >
          Create Post
        </button>
      </form>
      {/* <div className="blog-posts">
        {displayBlogPost(state.posts)}
      </div> */}
    </div>
  );
};

export default CreatePost;
