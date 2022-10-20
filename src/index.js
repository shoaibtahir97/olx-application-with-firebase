import {signUpNewUser, signInFirebase, postAdToDB, uploadImage} from '../config/firebase.js'

getAds()


window.signUp = async function (){
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const name = document.getElementById("name").value;
    try{
        const signupBtn = document.getElementById("signup-btn");
        signupBtn.setAttribute("disabled", "");
        await signUpNewUser({email, password, name})
        
        const successElem = document.getElementById("success");
        successElem.innerContent = "Successfully Registered";    
        
        console.log("Successfully Registered")
    }
    catch(e){
        const errorElem = document.getElementById("error");
        errorElem.innerHTML = e.message;
    }
}

window.login = async function (){
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    // const closeModal = document.getElementById("closeModal")

    try{
        await signInFirebase(email, password);
        alert("Logged in Successfully")
        // closeModal.setAttribute("data-bs-dismiss","modal")

    }
    catch(e){
        console.log("Error -->", e.message);
    }
}

window.postAd = async function(){
    const adTitle = document.getElementById("title").value;
    const adDescription = document.getElementById("description").value;
    const adPrice = document.getElementById("price").value;
    const adImage = document.getElementById("image").files[0];
    try{
        const imageUrl = await uploadImage(adImage)   
        await postAdToDB(adTitle, adDescription, adPrice, imageUrl)
        alert("Ad posted successfully");
    }
    catch(e){
        console.log("Error -->", e.message);
    }
} 

async function getAds(){
    const ads = await getAdsFromDb();
    const adsElem = document.getElementById("ads");


    for(let item of ads){
        adsElem.innerHTMl += `
        <div>
        
        </div>` 
    }
}


/*

If user is new then run signup function 

If email address exist in database then login user 


*/ 