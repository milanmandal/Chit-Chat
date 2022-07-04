import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import TextContainer from '../TextConatainer/TextContainer'
import './Join.css'
const Join =() =>{
    const [name,setName] = useState('');
    const [room,setRoom] = useState('');

    return(
        <div className="joinOuterContainer">
            <div>
                <TextContainer></TextContainer>
            </div>
            <div className="joinInnerContainer">
            <h1 className="heading">Chit Chat<span role="img" aria-label="emoji">💬</span></h1>
            <div>
                <input placeholder="Chat Username" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} />
            </div>
            <div>
                <input placeholder="Create or Join Room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} />
            </div>
            <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                <button className={'button mt-20'} type="submit">Join</button>
            </Link>
            </div>
        </div>
    )
}

export default Join;