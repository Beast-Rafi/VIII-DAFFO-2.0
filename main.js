import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection, onSnapshot,
} from "firebase/firestore"

//-------------------------Import Element From Dom------------------
const studentCardCredentials = document.querySelector('#std-card')
const stdArea = document.getElementById("students-area")
const capArea = document.getElementById("captain-area")
//-------------------------END-------------------------------------

const firebaseConfig = {
  apiKey: "AIzaSyBK9GHt40lUKo0QVydd-E1JVI_85W7Qzto",
  authDomain: "school-website-d0c2f.firebaseapp.com",
  projectId: "school-website-d0c2f",
  storageBucket: "school-website-d0c2f.appspot.com",
  messagingSenderId: "60240572311",
  appId: "1:60240572311:web:3a7fcf7549d0794221ded2"
};

initializeApp(firebaseConfig);

const db = getFirestore()

const colRef = collection(db, 'users')
const storage = getStorage()

const storageRef = ref(storage, "Student Images/01194816.png")
const fallbackImageSrc = "./assets/landing-page-img.jpeg";
export default function takeCredentialsFromDatabas(stdCardArea) {
    let userArr = []
    onSnapshot(colRef, (snapshot) =>{
        snapshot.docs.forEach((doc) => {
            // userArr.push({...doc.data(), id: doc.id })
            // function addItemInDom()
            userArr.push({...doc.data(), id: doc.id });
        getDownloadURL(ref(storage, `Student Images/${doc.id}.png`))
        .then((downloadURL) => {
            const imgElement = document.querySelector(`#img-${doc.id}`);
            imgElement.src = downloadURL;
        })
        .catch((error) => {
            console.error("Error getting download URL:", error);
            // If image is not found, set the fallback image
            const imgElement = document.querySelector(`#img-${doc.id}`);
            imgElement.src = fallbackImageSrc;
        });

        })
        // getDownloadURL(storage, ref(storage, "Student Images/01194816.png"))
        for (let i = 0; i < userArr.length; i++) {
            let html = 
            `
            <div class="student-card">
              <img id="img-${userArr[i].id}" alt="${userArr[i].id}">
              <div id="std-crd">
                <h2>${userArr[i].Type}</h2>
                <p>Name:${userArr[i].Name}</p>
                <p>ID:${userArr[i].id}</p>
                <p>House:${userArr[i].House}</p>
              </div>
            </div>
            `;
                        if(userArr[i].Type === 'Student'){
                stdArea.innerHTML += html
            }else{
                capArea.innerHTML += html
            }
        }
    
    })
    // addStdCrdHtml(userArr)
}
takeCredentialsFromDatabas()

// --------------------------DOM CODE------------------------------

