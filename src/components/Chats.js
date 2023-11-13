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
                "project-id": "838e03bb-b471-404d-b38c-c3e901486588",
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
                            "private-key": "cff652cf-5e02-4e8d-8ef0-e6a216fe8ff6"
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
                projectID="838e03bb-b471-404d-b38c-c3e901486588"
                userName={user.email}
                userSecret={user.uid}
            />
        </div>
    );
};

export default Chats;