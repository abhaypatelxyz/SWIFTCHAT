import React from 'react';
import '../style/searchResultComponent.css';

function SearchResultComponent({ result, handleSendFriendRequest }) {
    return (
        <div className="search-result-item">
            <p>{result.userName}</p>
            <p>{result.firstName +" "+result.lastName}</p>
            <button onClick={() => handleSendFriendRequest(result)}>Add</button>
        </div>
    );
}

export default SearchResultComponent;


