import React, { useState } from 'react';
import axios from 'axios';
import '../style/friendRequestReceived.css';

function FriendRequestReceived({ friendRequest, user }) {
    const [status, setStatus] = useState(friendRequest.status || 'pending');

    const handleAccept = async () => {
        try {
            await axios.post(`http://localhost:3000/api/acceptfriendrequest?sender=${friendRequest._id}&receiver=${user._id}`);
            setStatus('accepted');
            console.log('Friend request accepted');
        } catch (error) {
            console.error('Error accepting friend request:', error);
        }
    };

    const handleReject = async () => {
        try {
            await axios.post(`http://localhost:3000/api/rejectfriendrequest?sender=${friendRequest._id}&receiver=${user._id}`);
            setStatus('rejected');
            console.log('Friend request rejected');
        } catch (error) {
            console.error('Error while rejecting friend request:', error);
        }
    };

    return (
        <div className={`friend-request-received ${status}`}>
            <div className='friend-request-names-div'>
                <p className='friend-request-username'>{friendRequest.userName}</p>
            </div>
            <div className='friend-request-button-div'>
                {status === 'pending' && (
                    <>
                        <button onClick={handleAccept} className='accept-button'>Accept</button>
                        <button onClick={handleReject} className='reject-button'>Reject</button>
                    </>
                )}
                {status !== 'pending' && <p className='status-text'>{status}</p>}
            </div>
        </div>
    );
}

export default FriendRequestReceived;
