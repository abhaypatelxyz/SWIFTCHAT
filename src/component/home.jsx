import React, { useEffect, useState } from 'react';
import '../style/home.css';

import axios from 'axios';
import SideBar from './sideBar';
import Message from './message';
import Chat from './chat.jsx';
import Notification from './notification.jsx';

const Home = ({ user, setUser, socket, contact, setContact }) => {
    const [whom, setWhom] = useState(null);
    const [activeItem, setActiveItem] = useState("Messages");

    useEffect(() => {
        if (!user || !socket) return;

        const updateSocketId = async () => {
            try {
                await axios.put(`https://chat-box-server-4k6v.vercel.app/api/updatedata?uid=${user.uid}&socketId=${socket.id}`);
                console.log('Socket ID updated successfully', socket.id);
            } catch (error) {
                console.error('Error updating socket ID:', error);
            }
        };

        updateSocketId();
    }, [user, socket]);

    useEffect(() => {
        if (!user || !socket) return;

        const fetchUserData = async () => {
            try {
                const response = await axios.get(`https://chat-box-server-4k6v.vercel.app/api/userdata?uid=${user.uid}&socketId=${socket.id}`);
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
        const intervalId = setInterval(fetchUserData, 1000);

        return () => clearInterval(intervalId);
    }, [user?.uid, socket?.id, setUser]);

    return (
        <div id="home">
            <SideBar 
                user={user} 
                setUser={setUser} 
                socket={socket} 
                contact={contact} 
                setWhom={setWhom}  
                activeItem={activeItem} 
                setActiveItem={setActiveItem} 
            />
            <div id="main-content">
                {activeItem === "Messages" && (
                    <div id="message">
                        <Message 
                            user={user} 
                            socket={socket} 
                            whom={whom} 
                            setWhom={setWhom} 
                            contact={contact} 
                            setContact={setContact} 
                        />
                        <Chat 
                            user={user} 
                            socket={socket} 
                            whom={whom} 
                            contact={contact} 
                            setContact={setContact} 
                        />
                    </div>
                )}

                {activeItem === "Notification" && (
                    <div id="notification">
                    <Notification user={user}/>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;

