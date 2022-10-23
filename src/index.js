import { signUpNewUser, signInFirebase, getAdsFromDb, isUserLogIn} from '../config/firebase.js'

getAds()

window.signUp = async function () {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const name = document.getElementById("name").value;
    try {
        const signupBtn = document.getElementById("signup-btn");
        signupBtn.setAttribute("disabled", "");
        await signUpNewUser({ email, password, name })

        console.log("Successfully Registered");

    }
    catch (e) {
        const errorElem = document.getElementById("error");
        errorElem.innerHTML = e.message;
    }
}

window.login = async function () {
    const loginEmail = document.getElementById("login-email").value;
    const loginPassword = document.getElementById("login-password").value;
    // const closeModal = document.getElementById("closeModal")

    try {
        const loginBtn = document.getElementById("loginBtn");
        loginBtn.setAttribute("disabled", "");
        await signInFirebase(loginEmail, loginPassword);
        alert("Logged in Successfully");
    }
    catch (e) {
        const loginError = document.getElementById("login-error");
        loginError.innerHTML = e.message;
    }
}

loginAndSell()

function loginAndSell() {
    try {
        isUserLogIn(changeNav)
    }
    catch (e) {
        e.message
    }
}

function changeNav() {
    let anchorTag = document.getElementById("login-sell");
    let loggedIn = document.getElementById("logged-in");
    let navItem3 = document.getElementById("nav-item-3");
    let navItem2 = document.getElementById("nav-item-2");
    let navItem1 = document.getElementById("nav-item-1");

    anchorTag.setAttribute("href", "./postAd/postAd.html")
    loggedIn.remove();

    navItem3.innerHTML = `
        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
            aria-expanded="false">
            <img src="../images/profilePic.png" width="40" alt="">
        </a>
        <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li>
                <hr class="dropdown-divider">
            </li>
            <li><a class="dropdown-item" href="#" id="logout">Log out</a></li>
        </ul>`;
    
    navItem2.innerHTML = `
        <a class="nav-link " aria-current="page" href="#"><img width="30px" src="../images/iconNotifications.svg"></a>
        `;    
    navItem1.innerHTML = `
        <a class="nav-link " aria-current="page" href="#"><img width="30px" src="../images/iconChat.svg"></a>  
        `;

}



// window.postAd = async function(){
//     const adTitle = document.getElementById("title").value;
//     const adDescription = document.getElementById("description").value;
//     const adPrice = document.getElementById("price").value;
//     const adImage = document.getElementById("image").files[0];
//     try{
//         const imageUrl = await uploadImage(adImage)   
//         await postAdToDB(adTitle, adDescription, adPrice, imageUrl)
//         alert("Ad posted successfully");
//     }
//     catch(e){
//         console.log("Error -->", e.message);
//     }
// } 

async function getAds() {
    const ads = await getAdsFromDb();

    for (let item of ads) {
        const adsElem = document.getElementById("ads");
        const ddiv = document.createElement("div");

        ddiv.innerHTML += `
        <a href="">
            <div class="card" style="width: 18rem;">
                <img src="${item.imageUrl}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${item.adTitle}</h5>
                    <p class="card-text">Rs ${item.adPrice}</p>
                </div>
            </div>
        </a>
      `
        adsElem.appendChild(ddiv);
    }
}


/*

If user is new then run signup function 

If email address exist in database then login user 


*/ 