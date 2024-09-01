import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth} from '../firebase/firebase.js';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import axios from 'axios';
function SignUp_page({setUser,socket}) {
    const navigate = useNavigate();
    
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log("User signed up and data saved",userCredential);
            const userData=await axios.post('https://chat-box-server-nine.vercel.app/api/register',{
                email,
                firstName,
                lastName,
                uid:userCredential.user.uid,
                socketId:socket.id
            })
            console.log(userData);
            setUser(userData.data.user)
            localStorage.setItem('user', JSON.stringify(userData.data.user));
            navigate('/');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <>
            <div id="signup-parentcontainer"></div>
            <div id="signup-container">
                <div id="signupcontainer">
                    <div className="login-class" id="login-class">
                        <button id="toggle-login-button">
                            <Link className="signuplink_properties" to="/login">LOG IN</Link>
                        </button>
                    </div>
                    <div id="signupform">
                        <form id="signupformform" onSubmit={handleSignUp}>
                            <h1>Create Account</h1>
                            <div id="social_media_logo">
                                <Link to="https://www.google.com/">
                                    <i className="fa-brands fa-square-google-plus" />
                                </Link>
                                <Link to="https://www.facebook.com/">
                                    <i className="fa-brands fa-square-facebook" />
                                </Link>
                                <Link to="https://www.github.com/">
                                    <i className="fa-brands fa-square-github" />
                                </Link>
                                <Link to="https://www.linkedin.com/">
                                    <i className="fa-brands fa-linkedin" />
                                </Link>
                            </div>
                            <span>or use your email for registration</span>
                            <input
                                type="text"
                                id="fname"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <input
                                type="text"
                                id="lname"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            <button id="signup-button" type="submit">SIGN UP</button>
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignUp_page;

