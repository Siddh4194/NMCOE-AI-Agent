import React, { useState } from 'react';


const CopyButton = ({initialState,onClick,initialClass})=>{
    const [isClicked,setClicked] = useState(false);
    const handleClick = () =>{
        setClicked(!isClicked);
        isClicked && onClick();
    }
    const iconClass = isClicked ? 'fa-solid fa-check' : initialClass
    return (
        <i onClick={handleClick} className={iconClass}></i>
    )
}

export default CopyButton;