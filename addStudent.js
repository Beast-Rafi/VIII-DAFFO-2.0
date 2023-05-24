import { getStorage, ref, uploadBytes } from "firebase/storage";
import { initializeApp } from "firebase/app";
import {
    getFirestore, collection ,deleteDoc ,doc, setDoc  
} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBK9GHt40lUKo0QVydd-E1JVI_85W7Qzto",
  authDomain: "school-website-d0c2f.firebaseapp.com",
  projectId: "school-website-d0c2f",
  storageBucket: "school-website-d0c2f.appspot.com",
  messagingSenderId: "60240572311",
  appId: "1:60240572311:web:3a7fcf7549d0794221ded2"
};

initializeApp(firebaseConfig);

const formEl = document.getElementById("form-el")
const btnEl = document.getElementById("submit-btn")
const deletBtn = document.getElementById("delete-user-btn")
const deleteValue = document.getElementById("delete-user")
const imageInput = document.getElementById('imageInput')
// const fileUploadEl = formEl.elements["picture"]


const db = getFirestore()
const storage = getStorage()
const colRef = collection(db, 'users')

btnEl.addEventListener('click',() => {
  let name = formEl.elements["name"].value;
  let house = formEl.elements["house"].value
  let type = formEl.elements["type"].value
  let id = formEl.elements["id"].value;
  let file = imageInput.files[0]
  const imageRef = ref(storage, 'Student Images/' + id +'.png')
  addStdDataInDb(name, id, house, type)
  uploadBytes(imageRef, file).then((snapshot) => {
    console.log("IMG DONE")
  })

});


function addStdDataInDb(name, id, house, type) {
  setDoc(doc(db, 'users', id), {
    Name: name,
    ID: id,
    House: house,
    Type: type
  }).then(() => {
    formEl.reset()
  })
}

deletBtn.addEventListener('click', () => {
    const docRef = doc(db, 'users', deleteValue.value)
    deleteDoc(docRef)
        .then(()=>{
            console.log("Done")
        })
})
