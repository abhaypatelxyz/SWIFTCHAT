import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../style/login.css';
import axios from 'axios';
import loginimg from '../assets/login.jpg';
import googleIcon from '../assets/google.png';
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from 'firebase/auth';
import { app as firebaseApp } from '../firebase/firebase.js';

const auth = getAuth(firebaseApp);

const API_URL = "https://chat-box-server-4k6v.vercel.app/api"; // Access environment variable

const Login = ({ setUser, socket }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [username, setUsername] = useState(""); // New state for username
    const [isUsernameModalOpen, setIsUsernameModalOpen] = useState(false); // State to handle modal visibility

    const handleUsernameSubmit = async () => {
        if (!username) {
            setError("Username is required.");
            return;
        }

        // Open Google sign-in popup after username is provided
        setIsUsernameModalOpen(false);
        await signInWithGoogle();
    };

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
    
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Split display name into firstName and lastName
            const splitDisplayName = (displayName) => {
                if (!displayName) return { firstName: '', lastName: '' };
                const names = displayName.split(' ');
                return {
                    firstName: names[0] || '',
                    lastName: names.slice(1).join(' ') || '' 
                };
            };

            const { firstName, lastName } = splitDisplayName(user.displayName);

            // Create a new user in the backend
            const newUser = {
                uid: user.uid,
                email: user.email,
                firstName: firstName,
                lastName: lastName,
                userName: username
            };

            await axios.post(`${API_URL}/register`, newUser);

            // Fetch the newly created user data
            const userData = await axios.get(`${API_URL}/userdata?uid=${user.uid}`);
            
            // Set user in state and local storage
            setUser(userData.data);
            localStorage.setItem('user', JSON.stringify(userData.data));
            console.log('User signed up with Google:', userData.data);
            navigate('/');
        } catch (error) {
            console.error('Error during Google sign-up:', error);
            setError(error.message);
        }
    };

    const loginWithGoogle = async (e) => {
        e.preventDefault();
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            const userData = await axios.get(`${API_URL}/userdata?uid=${user.uid}`);
           console.log("ji",userData);
            setUser(userData.data);
            localStorage.setItem('user', JSON.stringify(userData.data));
            console.log('User logged in with Google:', userData.data);
            
            navigate('/');
        } catch (error) {
            console.error('Error during Google login:', error);
            setError(error.message);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const userData = await axios.get(`${API_URL}/userdata?uid=${userCredential.user.uid}&socket.id=${socket.id}`);
            setUser(userData.data);
            localStorage.setItem('user', JSON.stringify(userData.data));
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
                        {/* <form id="login-left-bottom-form" onSubmit={handleLogin}>
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
                        </form> */}
                        <button className="login-left-bottom-button" id="login-left-bottom-google-button" onClick={() => setIsUsernameModalOpen(true)}>
                            <img src={googleIcon} alt="Google Icon" />
                            Sign up with Google
                        </button>
                        <button className="login-left-bottom-button" id="login-left-bottom-google-button" onClick={loginWithGoogle}>
                            <img src={googleIcon} alt="Google Icon" />
                            Login with Google
                        </button>
                       
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                    </div>
                </div>
                <img src={loginimg} alt="Login Illustration" />
            </div>

            {isUsernameModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setIsUsernameModalOpen(false)}>&times;</span>
                        <h2>Enter your username</h2>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <button onClick={handleUsernameSubmit}>Submit</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
