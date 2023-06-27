import React from 'react';

// components
import Navbar from './Navbar';

// styles
import styles from "./Chats.module.css";


const Chats = () => {
    return (
        <div className={styles.container}>
            <Navbar />
        </div>
    );
};

export default Chats;