// src/SocketProvider.jsx
import React, { createContext, useContext, useEffect } from 'react';
import { io } from 'socket.io-client';
import { BASE_URL } from '../public/constant.js'; // Adjust the path if necessary

const SocketContext = createContext(null);

// Custom hook to use the socket instance
export const useSocket = () => useContext(SocketContext);

const socket = io(`${BASE_URL}`); // Initialize the socket here

const SocketProvider = ({ children }) => {
    useEffect(() => {
        // Optionally handle connection events
        socket.on('connect', () => {
            console.log('Socket connected:', socket.id);
        });

        socket.on('disconnect', () => {
            console.log('Socket disconnected');
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;
