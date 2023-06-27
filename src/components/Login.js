import React from 'react';

// icons
import google from "../assets/google.svg";

// styles
import styles from "./Login.module.css";

const Login = () => {
    return (
        <div className={styles.loginPage}>
            <div className={styles.loginCard}>
                <h2>Welcome to <span>FalakiChat!</span></h2>

                <div className={styles.button}>
                    <img src={google} alt='google logo'/> Sign in with google!
                </div>
            </div>
        </div>
    );
};

export default Login;