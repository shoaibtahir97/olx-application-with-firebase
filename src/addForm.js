import {signUpNewUser, signInFirebase} from '../config/firebase.js'

window.signUp = async function (){
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const fullname = document.getElementById("fullname").value;
    const age = document.getElementById("age").value;

    try{
        await signUpNewUser({email, password, fullname, age})
        alert("Successfully Registered")
    }
    catch(e){
        const error = document.getElementById("error")
        error.innerHTML = e.message
    }
}

window.signIn = async function (){
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try{
        await signInFirebase({email, password});
    }
    catch(e){
        
    }
}