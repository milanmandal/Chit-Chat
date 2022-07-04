import React from 'react'
import './InfoBar.css'
import online from '../../icons/onlineIcon.png'
import close from '../../icons/closeIcon.png'
const InfoBar = ({room}) =>{
    return(
        <div className="infoBar">
            <div className="leftInnerContainer">
                <img className="onlineIcon" src={online} alt="online" />
                <h3>{room}</h3>
            </div>
            <div className="rightInnerContainer">
                <a href="/"><img src={close}  alt="close"/></a>
            </div>
        </div>
    )
}

export default InfoBar;