import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./Post";
import { db, auth } from "./firebase";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Input } from "@material-ui/core";
import ImageUpload from "./ImageUpload";
import InstagramEmbed from "react-instagram-embed";
//import firebase from "firebase";
//import db from "./firebase";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignin] = useState(false);
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    //listens to any Auth change then fires the code
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // User has Logged in...
        console.log(authUser);
        setUser(authUser); // survives refresh

        // if (authUser.displayName) {
        //   //DONT update username
        // } else {
        //   //if we just created someone
        //   return authUser.updateProfile({
        //     displayName: username,
        //   });
        // }
      } else {
        //the user has logged out
        setUser(null);
      }
    });
    return () => {
      // perform some clean up action before refiring again
      unsubscribe();
    };
  }, [user, username]);

  useEffect(() => {
    // this is where the code runs
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() }))
        );
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

  // const handleClose = () => {
  //   setOpen(false);

  // SinUp function
  const signUp = (event) => {
    event.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));
    setOpen(false);
  };

  // singIn Function
  const signIn = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));
    setOpenSignin(false);
  };

  return (
    <div className="app">
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signUp">
            <center>
              <img
                className="app__headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt=""
              />
            </center>

            <Input
              placeholder="username"
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <Input
              placeholder="Email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="submit" onClick={signUp}>
              SignUp
            </Button>
          </form>
        </div>
      </Modal>
      {/* 
      Sign In Modal */}
      <Modal open={openSignIn} onClose={() => setOpenSignin(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signUp">
            <center>
              <img
                className="app__headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt=""
              />
            </center>
            {/* Not Needed only the Email and Password */}
            {/* <Input                    
              placeholder="username"
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            /> */}
            <Input
              placeholder="Email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signIn}>
              Sign In
            </Button>
          </form>
        </div>
      </Modal>

      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />

        {user ? (
          <Button onClick={() => auth.signOut()}>log Out</Button>
        ) : (
          <div className="app__loginContainer">
            <Button onClick={() => setOpenSignin(true)}>Sign In</Button>
            <Button onClick={() => setOpen(true)}>Sign Up</Button>
          </div>
        )}
      </div>

      {/* {posts.map(({ id, post }) => (
        <Post
          key={id}
          username={post.username}
          caption={post.caption}
          imageUrl={post.imageUrl}
        />
      ))} */}

      <div className="app__posts">
        <div className="app__postsLeft">
          {posts.map(({ id, post }) => (
            <Post
              key={id}
              postId={id}
              username={post.username}
              caption={post.caption}
              imageUrl={post.imageUrl}
            />
          ))}
        </div>

        <div className="app__postsRight">
          {/* instagram Embed */}
          <InstagramEmbed
            url="https://instagr.am/p/Zw9o4/"
            maxWidth={320}
            hideCaption={false}
            containerTagName="div"
            protocol=""
            injectScript
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {}}
          />
        </div>
      </div>

      {user?.displayName ? (
        // if the user is present then...
        <ImageUpload username={user.displayName} />
      ) : (
        // or do this
        <h3> login to upload</h3>
      )}

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
