// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js"
import { getFirestore, getDocs, collection, addDoc, setDoc, doc } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js'
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCj4CpCAIsBDrZAZX_fQ9xaZ2eoFP1wEws",
    authDomain: "fir-basics-bb240.firebaseapp.com",
    projectId: "fir-basics-bb240",
    storageBucket: "fir-basics-bb240.appspot.com",
    messagingSenderId: "932761062032",
    appId: "1:932761062032:web:c6e217d53d37d22f9b2615"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

const storage = getStorage(app);


function signInFirebase(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
}


async function signUpNewUser(userInfo) {
    const { email, password, name } = userInfo
    const userCredential = await createUserWithEmailAndPassword(auth, email, password, name)
    await addUserToDB(userInfo, userCredential.user.uid)
}


function addUserToDB(userInfo, uid) {
    const { email, name } = userInfo
    return setDoc(doc(db, "users", uid), { email, name })
}

function postAdToDB(adTitle, adDescription, adPrice, adLocation, imageUrl) {
    const userId = auth.currentUser.uid;
    return addDoc(collection(db, "ads"), { adTitle, adDescription, adPrice, userId, adLocation, imageUrl })
}

async function uploadImage(image) {
    const storageRef = ref(storage, `images/${image.name}`)
    const snapshot = await uploadBytes(storageRef, image)
    const url = await getDownloadURL(snapshot.ref)
    return url;
}

async function getAdsFromDb() {
    const querySnapshot = await getDocs(collection(db, "ads")) //DB se data le rhe hain aur variable me save horha hai
    const ads = []; //empty array create ki hai kis me data from DB push hoga
    querySnapshot.forEach((doc) => { // variable pe for loop laga hai jis me doc 
        ads.push({ id: doc.id, ...doc.data() }) //
    });
    return ads;
}

function isUserLogIn() {
    let anchorTag = document.getElementById("login-sell");
    let loggedIn = document.getElementById("logged-in");
    let navItem3 = document.getElementById("nav-item-3");
    let navItem2 = document.getElementById("nav-item-2");
    let navItem1 = document.getElementById("nav-item-1");
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                console.log(uid)
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
                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                    </ul>`;
                navItem2.innerHTML = `
                    <a class="nav-link " aria-current="page" href="#"><img width="30px" src="../images/iconNotifications.svg"></a>
                    `;    
                navItem1.innerHTML = `
                <a class="nav-link " aria-current="page" href="#"><img width="30px" src="../images/iconChat.svg"></a>
                    
                `
            } else {
                anchorTag.setAttribute("href", "#exampleModalToggle")
                console.log("no user log in")
            }
        });
}

export {
    signUpNewUser,
    signInFirebase,
    postAdToDB,
    uploadImage,
    getAdsFromDb,
    isUserLogIn
}
