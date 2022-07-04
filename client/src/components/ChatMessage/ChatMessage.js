import React from 'react'
import './ChatMessage.css'
import ReactEmoji from 'react-emoji'

const ChatMessage = ({message:{user, text}, name})=>{

  let currentUser = false
  const trimname = name.trim().toLowerCase();
  if(user === trimname)
  {
      currentUser = true
  }

  return(
      currentUser?(
          <div className="messageContainer justifyEnd">
            <p className="sentText pr-10">{trimname}</p>
            <div>
              <p className="messageBox backgroundBlue messageText colorWhite">{text}</p>
            </div>
        </div>
        )
        : (
          user==='admin'?(
            <div className="messageContainer justifyCenter">
              <div>
                <p className='adminMessage'>{(text)}</p>
              </div>
            </div>
          )
          :(
          <div className="messageContainer justifyStart">
            <div className="">
              <p className="messageBox backgroundLight messageText colorDark">{ReactEmoji.emojify(text)}</p>
            </div>
            <p className="sentText pl-10 ">{user}</p>
          </div>
          )
      )
  )
}

export default ChatMessage;