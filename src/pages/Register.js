import React, { useState } from "react";
import Add from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {

  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  //main submit function
  const handleSubmit = async (e) => {
    // prevent refreshing the page after click the button
    e.preventDefault();
    // use e.target[i].value to get the value from form
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    // and here will be the first file, use files[i]
    const file = e.target[3].files[0];

    try {
      // create user
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage, displayName);
      // can not upload a file by createUserWithEmailAndPassword
      // use another function to upload the file
      const uploadTask = uploadBytesResumable(storageRef, file);
      // TODO: add default avatar if user didn't upload a img

      uploadTask.on(
        //TODO:Handle Percentage
        (error) => {
          setErr(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            // update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            // add user on firebase db
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
            //create default user chats collection on firebase db for new user
            // and the key is user id
            await setDoc(doc(db, "userChats", res.user.uid), {});
            // go to home page after register
            navigate("/");
          });
        }
      );
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">ChatApp-Shaw5046</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="display name" />
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <input style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src={Add} alt="" />
            <span>Add an avatar</span>
          </label>
          <button>Sign up</button>
          {err && <span>Something went wrong</span>}
        </form>
        <p>Have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
};

export default Register;
