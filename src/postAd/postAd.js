import {postAdToDB} from '../../config/firebase.js';

window.postAd = async function() {
    const title = document.querySelector("#title").value;
    const description = document.querySelector("#description").value;
    const price = document.querySelector("#price").value;
    const images = document.querySelector("#images").files[0];
    const location = document.querySelector("#location").value;

    try{
        const imageURL = await uploadImage(images);

        await postAdToDB(title, description, price, location, imageURL)
        alert("Your ad has been posted successfully");

    }
    catch(e){
        console.log("Error --->", e.message);
    }
    
}