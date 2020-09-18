import React from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";

function Post() {
  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          className="post__avatar"
          alt="Rickielive" //{username}
          src="/static/images/avatar/1.jpg"
        />
        <h3>Rickielive</h3>
      </div>

      {/* header => avatar and username */}

      <img
        className="post__image"
        src="https://i.morioh.com/644d5dcb49.png"
        alt=""
      />

      <h4 className="post__text">
        <strong>Rickielive :</strong>Wow! 3rd React js project
      </h4>
    </div>
  );
}

export default Post;
