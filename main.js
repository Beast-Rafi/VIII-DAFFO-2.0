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
        for (let i = 0; i < userArr.length; i++) {
            stdArea.innerHTML += 
                    `
                        <div class="student-card">
                            <img src="./assets/landing-page-img.jpeg" alt="">
                            <div id="std-crd">
                            <h2>${userArr[i].Type}</h2>
                            <p>Name:${userArr[i].Name}</p>
                            <p>ID:${userArr[i].ID}</p>
                            <p>House:${userArr[i].House}</p>
                            <p>System ID:${userArr[i].id}</p>
                            </div>
                        <div>
                    `
            }
        
    })
    // addStdCrdHtml(userArr)
}
takeCredentialsFromDatabas()
// --------------------------DOM CODE------------------------------

