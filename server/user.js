//storing all the users
const users = []

//add user to the room
const addUser = ({id,name,room})=>{
    name = name.trim().toLowerCase();//remove whitespace from the name and room
    room = room.trim().toLowerCase();

    const checkUser = users.find((user)=> user.room == room && user.name == name);

    if(checkUser){
        return{error:'User already exists'};
    }

    const user = {id,name,room};
    users.push(user);
    return {user}
}

//remove user from room
const removeUser = (id)=>{
    const index = users.findIndex((user)=> user.id === id);

    if(index !== -1){
        const check = users.splice(index, 1)[0];
        console.log('removed',check)
        console.log(users)
        return check;
        //splice removes the given value form the array or replaces them returning the replcaed vlaue
    }
}

//get user based on id
const getUser = (id) => users.find((user) => user.id ===id)

//get all users based on room
const getUsersInRoom = (room) => users.filter((user)=>user.room === room)

module.exports = {addUser,getUser,removeUser,getUsersInRoom}