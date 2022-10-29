import {getFirebaseChat} from '../../config/firebase.js';

let data;


window.getChatDetails = async function () {  
    const urlParams = new URLSearchParams(window.location.search); // url se chatroom ki id pakri 
    const chatid = urlParams.get('id'); //yahan chatroom ki id mil gai

    const room = await getFirebaseChat(chatid) //firebase k function me chat ki id phenk di aur chatroom ka data mangwa lia 
    
   let data = room.data()

    console.log(data);
}

