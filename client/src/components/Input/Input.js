import React from 'react'
import './Input.css'
import sendbutton from '../../icons/sendIcon.png'
const Input =({message,setMessage,sendMessage})=>{

    return(
        <form className="form">
            <div className="forminput">
            <input
                className='input'
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={({ target: { value } }) => setMessage(value)}
                onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
            /><img className="sendButton" src={sendbutton} onClick={e => sendMessage(e)} alt="send"/>
            </div>            
        </form>    
        
    )

}

export default Input