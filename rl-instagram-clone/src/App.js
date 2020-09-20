import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./Post";
import { db } from "./firebase";
//import firebase from "firebase";
//import db from "./firebase";

function App() {
  const [posts, setPosts] = useState([
    // {
    //   username: "Wachira",
    //   caption: "Wow! Cheki hiyo drink",
    //   imageUrl:
    //     "https://images.pexels.com/photos/338713/pexels-photo-338713.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    // },
    // {
    //   username: "Rickielive",
    //   caption: "Wow! Cheki hiyo Glass",
    //   imageUrl:
    //     "https://images.pexels.com/photos/338713/pexels-photo-338713.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    // },
  ]);

  useEffect(() => {
    // this is where the code runs
    db.collection("posts").onSnapshot((snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })));
    });
  }, []);

  //useEffect runs a piece od code based on a specific condtion

  // useEffect(() => {

  //   // this is where the code runs
  //   db.collection("posts").onSnapshot((snapshot) => {
  //     // Everytime time a new post is added this code fires.

  //     setPosts(
  //       snapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         post: doc.data(),
  //       }))
  //     );
  //   });
  // }, []);

  return (
    <div className="app">
      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />
      </div>

      {posts.map(({ id, post }) => (
        <Post
          key={id}
          username={post.username}
          caption={post.caption}
          imageUrl={post.imageUrl}
        />
      ))}

      {/* {posts.map(({ id, post }) => (
        <Post
          key={id}
          username={post.username}
          caption={post.caption}
          imageUrl={post.imageUrl}
        />
      ))} */}
      <h1>Wachira</h1>

      {/* <Post
        username="Wachira"
        caption="Wow! Orange juice"
        imageUrl="https://images.pexels.com/photos/338713/pexels-photo-338713.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
      /> */}
    </div>
  );
}

export default App;
