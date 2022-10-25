import { getFirebaseAd } from '../../config/firebase.js';

let data;
getAdDetails();

async function getAdDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const doc = await getFirebaseAd(id)
    data = doc.data();
    console.log("Data -->", data)

    const left = document.querySelector("#col-1");
    left.innerHTML = `
    <img width="100%" src="${data.imageUrl}" />

    <div class="details">
        <div class="container">
            <div class="row">
                <p>Details</p>
            </div>
            <div class="row">
                <div class="col-6">Price</div>
                <div class="col-6">${data.adPrice}</div>

            </div>
            <div class="row">
                <div class="col-6">Location</div>
                <div class="col-6">${data.adLocation}</div>
            </div>
            <hr>
            <p>Description</p>
            <p>${data.adDescription}</p>
        </div>
    </div>
        

    `; 
}

