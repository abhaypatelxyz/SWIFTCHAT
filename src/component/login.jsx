import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../style/login.css';
import axios from 'axios';
import loginimg from '../assets/login.jpg';
import googleIcon from '../assets/google.png';
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from 'firebase/auth';
import { app as firebaseApp } from '../firebase/firebase.js';

const auth = getAuth(firebaseApp);

const Login = ({ setUser, socket }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleGoogleSignIn = async (e) => {
        e.preventDefault();
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const userData = await axios.get(`http://localhost:3000/api/userdata?uid=${result.user.uid}&socket.id=${socket.id}`);
            setUser(userData.data);
            localStorage.setItem('user', JSON.stringify(userData.data)); // Updated here
            console.log('User signed in:', userData.data);
            navigate('/');
        } catch (error) {
            console.error('Error during Google sign-in:', error);
            setError(error.message);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const userData = await axios.get(`http://localhost:3000/api/userdata?uid=${userCredential.user.uid}&socket.id=${socket.id}`);
            setUser(userData.data);
            localStorage.setItem('user', JSON.stringify(userData.data)); // Updated here
            console.log('User signed in:', userData.data);
            navigate('/');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div id="loginParentDiv">
            <div id="login-div">
                <div id="login-left">
                    <div id="login-left-top">
                        <i className="fa-solid fa-paper-plane"></i>
                        <p>Discover People</p>
                    </div>
                    <div id="login-left-bottom">
                        <div id="login-left-bottom-text">
                            <h1>Log in.</h1>
                            <p>Lorem ipsum dolor sit amet consectetur, laudantium quam!</p>
                        </div>
                        <form id="login-left-bottom-form" onSubmit={handleLogin}>
                            <div id="login-left-bottom-input">
                                <p>Enter your email address</p>
                                <input
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    required
                                />
                            </div>
                            <div id="login-left-bottom-input">
                                <p>Enter your password</p>
                                <div className="password-container">
                                    <input
                                        onChange={(e) => setPassword(e.target.value)}
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        required
                                    />
                                </div>
                            </div>
                            <button className="login-left-bottom-button" id="login-left-bottom-login-button" type="submit">
                                Login
                            </button>
                        </form>
                        <button className="login-left-bottom-button" id="login-left-bottom-google-button" onClick={handleGoogleSignIn}>
                            <img src={googleIcon} alt="Google Icon" />
                            Sign in with Google
                        </button>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                    </div>
                </div>
                <img src={loginimg} alt="Login Illustration" />
            </div>
        </div>
    );
};

export default Login;
