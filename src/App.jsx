// import { getDatabase, ref, set } from 'firebase/database';
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
// import { app as firebaseApp } from './firebase/firebase.js';
// import React, { lazy, Suspense, useEffect, useState } from 'react';
// import { Routes, Route } from 'react-router-dom';
// import io from 'socket.io-client';

// import './App.css';

// const auth = getAuth(firebaseApp);
// const db = getDatabase(firebaseApp);
// const Header = lazy(() => import('./component/header.jsx'));
// const socket = io('http://localhost:9000');

// const App = () => {
//   const [email, setEmail] = useState('shubhamdiitcs@gmail.com');
//   const [password, setPassword] = useState('shubham');

//   useEffect(() => {
//     socket.on('connect', () => {
//       alert('Connected to the server');
//     });

//     return () => {
//       socket.off('connect');
//     };
//   }, []);

//   const handleLogin = () => {
//     createUserWithEmailAndPassword(auth, email, password)
//       .then((userCredential) => {
//         const user = userCredential.user;
//         console.log('User created:', user);

//         const userRef = ref(db, 'users/' + user.uid);
//         set(userRef, {
//           name: 'Shubham',
//           email: email
//         })
//         .then(() => {
//           console.log('Data saved successfully!');
//         })
//         .catch((error) => {
//           console.error('Error saving data:', error);
//         });
//       })
//       .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         console.error(`Error creating user: ${errorCode} - ${errorMessage}`);
//       });
//   };

//   const handleSignIn = () => {
//     signInWithEmailAndPassword(auth, email, password)
//       .then((userCredential) => {
//         const user = userCredential.user;
//         console.log('User signed in:', user);
//         const userRef = ref(db, 'users/' + user.uid);
//         userRef.get().then((snapshot) => {
//           if (snapshot.exists()) {
//             console.log('User data:', snapshot.val());
//           } else {
//             console.log('No user data found');
//           }
//         }).catch((error) => {
//           console.error('Error fetching user data:', error);
//         });
//       })
//       .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         console.error(`Error signing in`);
//       });
//   };

//   const putData = () => {
//     const userId = socket.id;
//     const userRef = ref(db, 'users/' + userId);
//     set(userRef, {
//       name: 'Shubham',
//       password: 'shubhamdas'
//     })
//     .then(() => {
//       console.log('Data saved successfully!');
//     })
//     .catch((error) => {
//       console.error('Error saving data:', error);
//     });
//   };

//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <Routes>
//         <Route 
//           path='/' 
//           element={
//             <div>
//               <Header />
//               <button onClick={handleLogin}>Sign Up</button> {/* Button to trigger Sign-Up */}
//               <button onClick={handleSignIn}>Sign In</button> {/* Button to trigger Sign-In */}
//             </div>
//           } 
//         />
//       </Routes>
//     </Suspense>
//   );
// };

// export default App;
import React, { useState, useEffect } from 'react';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { app as firebaseApp } from './firebase/firebase.js';

const auth = getAuth(firebaseApp);

// Set appVerificationDisabledForTesting to true for testing purposes
auth.settings.appVerificationDisabledForTesting = true;

const PhoneAuth = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationId, setVerificationId] = useState('');

  useEffect(() => {
    // Initialize reCAPTCHA verifier if not already done
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {
          console.log("reCAPTCHA verified");
          handleSignIn();
        },
        'expired-callback': () => {
          console.warn('reCAPTCHA expired');
        }
      }, auth);
    }
  }, []);

  const handleSignIn = () => {
    const appVerifier = window.recaptchaVerifier;

    // Ensure phone number is in international format
    const formattedPhoneNumber = `+91${phoneNumber.replace(/[^0-9]/g, '')}`;
    
    signInWithPhoneNumber(auth, formattedPhoneNumber, appVerifier)
      .then((confirmationResult) => {
        setVerificationId(confirmationResult.verificationId);
        console.log("SMS sent");
      })
      .catch((error) => {
        console.error("Error during signInWithPhoneNumber:", error);
      });
  };

  const verifyCode = () => {
    const credential = getAuth.PhoneAuthProvider.credential(verificationId, verificationCode);
    auth.signInWithCredential(credential)
      .then((result) => {
        console.log("User signed in successfully:", result.user);
      })
      .catch((error) => {
        console.error("Error during signInWithCredential:", error);
      });
  };

  return (
    <div>
      <h3>Phone Authentication</h3>
      <div id="recaptcha-container"></div>
      {!verificationId ? (
        <div>
          <input
            type="tel"
            placeholder="Enter phone number (10 digits)"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <button onClick={handleSignIn}>Send Code</button>
        </div>
      ) : (
        <div>
          <input
            type="text"
            placeholder="Enter verification code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          <button onClick={verifyCode}>Verify Code</button>
        </div>
      )}
    </div>
  );
};

export default PhoneAuth;
