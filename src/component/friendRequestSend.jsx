import React, { useEffect, useState } from 'react';
import '../style/friendRequestSend.css'; // Ensure this CSS file is updated

function FriendRequestSend({ friendRequest }) {
    const [status, setStatus] = useState(friendRequest.status); // Initialize status from prop

    useEffect(() => {
        setStatus(friendRequest.status);
    }, [friendRequest.status]);

    return (
        <div className={`friend-request-send ${status}`}>
            <div className='friend-request-names-div'>
                <p className='friend-request-username'>{friendRequest.userName}</p>
            </div>
            <div className='friend-request-button-div'>
                <p className='status-text'>{status}</p>
            </div>
        </div>
    );
}

export default FriendRequestSend;

