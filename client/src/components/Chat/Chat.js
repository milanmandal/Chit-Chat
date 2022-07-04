import React, { useState,useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
import InfoBar from '../InfoBar/InfoBar'
import Input from '../Input/Input'
import Messages from '../Messages/Messages'
import TextContainer from '../TextConatainer/TextContainer'
import './Chat.css'
let socket;

const Chat =({location})=>{
    const [name,setName] = useState('')
    const [room,setRoom] = useState('')
    const [message,setMessage] = useState('')
    const [messages,setMessages] = useState([])
    const ENDPOINT='localhost:5000' // local server
    // const ENDPOINT='https://chi-chat.herokuapp.com/' // deployed server

    //defining the endpoint to which socket io would send/receive events
    useEffect(()=>{
        // returns the name and room of an object from the query string
        const {name, room} = queryString.parse(location.search) 
        setName(name)
        setRoom(room)
        console.log(name, room)

        socket = io(ENDPOINT, { transports: ['websocket', 'polling', 'flashsocket'] });
        console.log(socket)

        //the emit function is used to send an event along with the data name & room which will be fetched on the server side
        //() the empty function receives the callback from the server end
        socket.emit('join', {name, room}, ({error})=>{
            if(error)
            {
                alert(error);
                window.location='/';
                error="";
            }
            console.log("sending name to server")
        }) 
        return ()=>{
            socket.emit('disconnected');
        }
    },[ENDPOINT, location.search]) 
    //this specifies that when the useEffect take place i.e. here when ENDPOINT and location.search changes

    useEffect(()=>{
        socket.on('message', (message) =>{
            console.log(message)
            setMessages([...messages, message])
        })
    }, [messages])
    //this specifies that when messages chanes then this will be called

    const sendMessage=(event)=>{
        event.preventDefault();
        if(message){
            socket.emit('sendMessage' ,message, ()=>setMessage(''))
        }
    }

    console.log(message,messages)
    
    return(
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} />
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
            <TextContainer/>
        </div>
    )
}



export default Chat;