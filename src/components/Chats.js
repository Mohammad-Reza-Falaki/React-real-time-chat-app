import React, { useState, useEffect, useContext } from 'react';
import { auth } from "../firebase";
import { useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import axios from "axios";

// components
import Navbar from './Navbar';

// styles
import styles from "./Chats.module.css";

// contexts
import { AuthContext } from "../contexts/AuthContextProvider";


const Chats = () => {

    const [loading, setLoading] = useState(true);
    const user = useContext(AuthContext);  
    const history = useHistory();

    useEffect(() => {
        if (!user) {
            history.push("/");
            return;
        }

        axios.get("https://api.chatengine.io/users/me", {
            headers: {
                "project-id": "c2ddba8d-e789-4ba1-a8e4-b75f7255182c",
                "user-name": user.email,
                "user-secret": user.uid 
            }
        })
        .then(() => {
            setLoading(false)
        })
        .catch(() => {
            let formdata = new FormData();
            formdata.append("email", user.email);
            formdata.append("username", user.email);
            formdata.append("secret", user.uid);
            getFile(user.photoURL)
                .then(avatar => {
                    formdata.append("avatar", avatar, avatar.name)
                    axios.post("https://api.chatengine.io/users", formdata, {
                        headers: {
                            "private-key": "37d16d57-fe7f-4e01-a796-24428e01ae8c"
                        }
                    })
                    .then(() => setLoading(false))
                    .catch(error => console.log(error))
                })
        })

    }, [user, history])

    const getFile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob();
        return new File ([data], "userPhoto.jpg", {type: "image/jpeg"})
    }

    const logoutHandler = async () => {
        await auth.signOut();
        history.push("/")
    }

    if (!user || loading) return "Loading..."

    return (
        <div className={styles.container}>
            <Navbar logoutHandler={logoutHandler}/>

            <ChatEngine
                height="calc(100vh - 50px)"
                projectID="c2ddba8d-e789-4ba1-a8e4-b75f7255182c"
                userName={user.email}
                userSecret={user.uid}
            />
        </div>
    );
};

export default Chats;