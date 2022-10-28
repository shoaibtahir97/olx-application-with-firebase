import { getFirebaseAd, getFirebaseUser,checkChatRoom, createChatRoom } from '../../config/firebase.js';

let data;

let userName;
getAdDetails();

async function getAdDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    
    const doc = await getFirebaseAd(id)
    data = doc.data();
    console.log(data)
    const userID = data.userId;
    const doc1 = await getFirebaseUser(userID)
    userName = doc1.data().name;

    const left = document.querySelector("#col-1");
    left.innerHTML = `
    <img width="100%" src="${data.imageUrl}" />

    <div class="details">
        <div class="container">
            <div class="row">
                <p class="bold">Details</p>
            </div>
            <div class="row">
                <div class="col-6 disabled">Price</div>
                <div class="col-6">${data.adPrice}</div>

            </div>
            <div class="row">
                <div class="col-6 disabled">Location</div>
                <div class="col-6">${data.adLocation}</div>
            </div>
            <hr>
            <p class="bold">Description</p>
            <p>${data.adDescription}</p>
        </div>
    </div>`; 

    const right = document.querySelector("#col-2");
    right.innerHTML = `
    <div class="price">
        <p class="Rs">Rs ${data.adPrice}</p>
        <p class="ad-title">${data.adTitle}</p>
        <p>${data.adLocation}</p>
    </div>

    <div class="seller">
        <p>Seller Description</p>
            <div class="row">
                <div class="col-3">
                    <img src="../../images/profilePic.png" width="60px" alt="">
                </div>
                <div class="col-9">
                    <p class="userame">${userName}</p>
                </div>
                <div class="col">
                    <button onclick="initiateChat()" class="post-Btn">Chat with Seller</button>
                
                </div>
            </div>
    </div>`;
}

window.initiateChat = async function (){
    let userId = data.userId;
    console.log(data.userId)
    let chatroom = await checkChatRoom(userId);

    if(!chatroom){
        chatroom = await createChatRoom(userId)
        alert("chatroom created ");
    }
    else{
        alert('chatroom exists')
    }

    const chatId = chatroom._id

    // location.href = `chat.html?id=${chatId}`

}