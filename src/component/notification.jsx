import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FriendRequestReceived from './friendRequestReceived.jsx';
import FriendRequestSend from './friendRequestSend.jsx';
import '../style/notification.css';

import { BASE_URL } from '../../public/constant.js';
function Notification({ user }) {
    const [friendRequest, setFriendRequest] = useState([]);
    const [sendFriendRequest, setSendFriendRequest] = useState([]);

    useEffect(() => {
        const fetchAllFriendRequests = async () => {
            try {
                const requests = [];
                await Promise.all(
                    user.friendRequestSend.map(async (request) => {
                        const response = await axios.get(`  ${BASE_URL}/api/contactdata?_id=${request.receiver}`);
                        // Include status from request object
                        requests.push({
                            ...response.data,
                            status: request.status // Store the status with the contact data
                        });
                    })
                );
                setSendFriendRequest(requests); // Set the accumulated requests to the state
            } catch (error) {
                console.error('Error fetching contact data:', error);
            }
        };

        if (user.friendRequestSend.length > 0) {
            fetchAllFriendRequests();
        }
    }, [user.friendRequestSend]);


    useEffect(() => {
        const fetchAllFriendRequests = async () => {
            try {
                const requests = [];
                await Promise.all(
                    user.friendRequestReceived.map(async (request) => {
                        const response = await axios.get(`${BASE_URL}/api/contactdata?_id=${request.sender}`);
                        requests.push({...response.data,
                            status: request.status }); // Store the result in the array
                    })
                );
                setFriendRequest(requests); // Set the accumulated requests to the state
            } catch (error) {
                console.error('Error fetching contact data:', error);
            }
        };

        if (user.friendRequestReceived.length > 0) {
            fetchAllFriendRequests();

        }
    }, [user.friendRequestReceived]);

    return (
        <div className='notification'>
            {friendRequest.length > 0 ? (
                friendRequest.map((req, key) => (
                    <FriendRequestReceived key={key} user={user} friendRequest={req} />
                ))
            ) : (
                <></>
            )}


            {sendFriendRequest.length > 0 ? (
                sendFriendRequest.map((req, key) => (
                    <FriendRequestSend key={key} user={user} friendRequest={req} />
                ))
            ) : (
                <></>
            )}

        </div>
    );
}

export default Notification;
