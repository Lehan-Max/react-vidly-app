import React from 'react';

//when you don't have any helper functions just single component use stateless functional component instead of class
const Like = (props) => {
    let classes = "fa fa-heart";
    if (!props.liked) classes += "-o";
    return (
        <i onClick={props.onLikeToggle} 
            style={{ cursor: 'pointer' }} 
            className={classes} 
            aria-hidden="true" 
        />
    );
}

export default Like;