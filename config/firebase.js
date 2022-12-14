// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAuth, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js"
import { getFirestore, getDocs, getDoc, collection, addDoc, setDoc, doc, query, where } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js'
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


async function addUserToDB(userInfo, uid) {
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

function isUserLogIn(callback) {
    let anchorTag = document.getElementById("login-sell");
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user;
            // console.log(uid);
            callback();
        } else {
            anchorTag.setAttribute("href", "    #exampleModalToggle")
            console.log("no user log in")
        }
    });
}

function getFirebaseAd(id) {
    const docRef = doc(db, "ads", id);
    return getDoc(docRef)
}

function getFirebaseUser(userID) {
    const docRef = doc(db, "users", userID)
    return getDoc(docRef)
}

async function checkChatRoom(adUserId) { //seller id
    const userId = auth.currentUser.uid; //logged in user
    const q = query(collection(db, "chatrooms"), //check if db has chatroom and 
        where(`users.${userId}`, "==", true),
        where(`users.${adUserId}`, "==", true))

    const querySnapshot = await getDocs(q)
    let room;

    await querySnapshot.forEach((doc) => {
        console.log(doc.id, doc.data())

        room = { _id: doc.id, ...doc.data() }
    })
    return room;
}

function createChatRoom(adUserId) {
    const userId = auth.currentUser.uid
    const obj = {
        users: {
            [userId]: true,
            [adUserId]: true
        },
        createdAt: Date.now()
    }
    return addDoc(collection(db, "chatrooms"), obj)
}

async function getFirebaseChat(chatId) {
    const docRef = doc(db, "chatrooms", chatId);
    return getDoc(docRef)
    // const snaps = await getDoc(docRef)

    // let obj;
    // snaps.forEach((doc) => {
    //     console.log(doc.id, doc.data())
    //     obj = { id: doc.id, ...doc.data() };
    //     return obj;
    // })

    // const querySnapshot = await getDocs(collection(db, "chatrooms", chatId));
    // querySnapshot.forEach((doc) => {
    //     // doc.data() is never undefined for query doc snapshots
    //     console.log(doc.id, " => ", doc.data());
    // });

}

export {
    signUpNewUser,
    signInFirebase,
    postAdToDB,
    uploadImage,
    getAdsFromDb,
    isUserLogIn,
    getFirebaseAd,
    getFirebaseUser,
    checkChatRoom,
    createChatRoom,
    getFirebaseChat


}
