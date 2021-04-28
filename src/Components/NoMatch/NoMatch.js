import React from 'react';
import './NoMatch.css'
const NoMatch = () => {
    return (
        <div className ="no-match">
            <h1>Connection lost</h1>
            <p>Something Wrong</p>
            <p>Please try again later</p>
        </div>
    );
};

export default NoMatch;