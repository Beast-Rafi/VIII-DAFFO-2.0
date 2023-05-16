import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,getDocs, onSnapshot,
    addDoc, deleteDoc, doc
} from "firebase/firestore"
// import './styles.css'
//-------------------------Import Element From Dom------------------
const studentCardCredentials = document.querySelector('#std-card')
const stdArea = document.getElementById("students-area")
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


export default function takeCredentialsFromDatabas(stdCardArea) {
    let userArr = []
    onSnapshot(colRef, (snapshot) =>{
        snapshot.docs.forEach((doc) => {
            userArr.push({...doc.data(), id: doc.id })
            // function addItemInDom()
        })
        // console.log(userArr)
    })
    return userArr
}


function addItemInDom() {
    let userArr = takeCredentialsFromDatabas()  
    addStdCrdHtml(userArr)
    console.log(userArr)
}
addItemInDom()
function addStdCrdHtml(userCred) {
    // let stdDiv = 
    // `
    // <img src="./assets/landing-page-img.jpeg" alt="">
    // <div id="std-crd">
    //   <h2>${user.type}</h2>
    //   <p>Name:${user.name}</p>
    //   <p>ID:${user.ID}</p>
    //   <p>House:${user.house}</p>
    //   <p>System ID:</p>
    // </div>
    // `
    for (let i = 0; i < userCred.lenght; i++) {
        stdArea.innerHTML += 
            `
                <div class="student-card">
                    <img src="./assets/landing-page-img.jpeg" alt="">
                    <div id="std-crd">
                    <h2>${userCred[i].type}</h2>
                    <p>Name:${userCred[i].name}</p>
                    <p>ID:${userCred[i].ID}</p>
                    <p>House:${userCred[i].house}</p>
                    <p>System ID:</p>
                    </div>
                <div>
            `
    }
}
// --------------------------DOM CODE------------------------------

