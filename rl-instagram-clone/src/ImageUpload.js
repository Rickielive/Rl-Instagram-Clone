import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { db, storage } from "./firebase";
import firebase from "firebase";
import "./ImageUpload.css";

function ImageUpload({ username }) {
  const [caption, setCaption] = useState("");
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState(null);

  //   handleChange Function
  //fires off an event (e)
  // (e.target.files[0]) get the first file of the selected files...
  // setImage(e.target.files[0]) set the image in state to that
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  //Acces the storage in firebase
  //get a reference .ref to the image folder
  //image.name is the file we selected.
  // put image

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        /// Progress Function...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        // Error function
        console.log(error);
        alert(error.message);
      },
      () => {
        //complete function
        storage
          .ref("images") // go to the image folder
          .child(image.name) // go to the image name
          .getDownloadURL() // get me the download url
          .then((url) => {
            // here is where we post the image inside the database...
            db.collection("posts").add({
              // we use a timestamp that is based on the server where the code is living
              //sort al the post by their correct timing
              timestamp: firebase.firestore.FieldValue.serverTimestamp(), // go and get the exact timestamp in firebase
              caption: caption,
              imageUrl: url,
              username: username,
            });
            setProgress(0);
            setCaption("");
            setImage(null);
          });
      }
    );
  };

  return (
    <div className="imageupload">
      {/* I want to the following */}
      {/* Caption Input */}
      {/* file Picker  */}
      {/* Post button */}
      <progress className="imageupload_progress" value={progress} max="100" />
      <input
        type="text"
        placeholder=" Enter a Caption..."
        onChange={(event) => setCaption(event.target.value)}
        // value={}
      />
      <input type="file" onChange={handleChange} />
      <Button onClick={handleUpload}>Upload</Button>
    </div>
  );
}

export default ImageUpload;
