import React, { useState } from "react";
import "./App.css";
import Post from "./Post";

function App() {
  const [post, setPosts] = useState([
    {
      username: "Wachira",
      caption: "Wow! Cheki hiyo drink",
      imageUrl:
        "https://images.pexels.com/photos/338713/pexels-photo-338713.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {},
  ]);

  return (
    <div className="app">
      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />
      </div>

      <Post
        username="Wachira"
        caption="Wow! Cheki hiyo drink"
        imageUrl="https://images.pexels.com/photos/338713/pexels-photo-338713.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
      />
      <Post
        username="Ann"
        caption="Cheki hiyo pic"
        imageUrl="https://images.pexels.com/photos/2600338/pexels-photo-2600338.jpeg?h=750&w=550&dpr=1&auto=compress"
      />
      <Post
        username="Muthee"
        caption=" Classic Kenyans"
        imageUrl="https://images.pexels.com/photos/1300574/pexels-photo-1300574.jpeg?h=750&w=550&dpr=1&auto=compress"
      />
    </div>
  );
}

export default App;
