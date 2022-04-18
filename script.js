// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js";
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6xz2GiuIKp1388qLXe1l_wKvW2Ri0ngc",
  authDomain: "week14-7ba28.firebaseapp.com",
  projectId: "week14-7ba28",
  storageBucket: "week14-7ba28.appspot.com",
  messagingSenderId: "405486860353",
  appId: "1:405486860353:web:c21eb2030392b17e406ec0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


import{getDatabase, ref, get, set, child, update, remove, onValue, onChildAdded, onChildChanged, onChildRemoved}
from "https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js";

;
const db = getDatabase();

var inputUsername = document.getElementById("user");
var inputPassword = document.getElementById("pass");


function loginData(){
    const dbref = ref(db);
    get(child(dbref,"User/"+inputUsername.value)
    )
    .then((snapshot) =>{
        if(snapshot.exists()){
            let passwords = snapshot.val().password;
            if(passwords==inputPassword.value){
                alert("Successfully Login completed");        
                localStorage.setItem("youruser",inputUsername.value);
                localStorage.setItem("yourpass",inputPassword.value);
                window.open("signin.html","_blanks");
            }
            else{
                alert("No data found!");
            }

        }
        else{
            alert("No data found!"); 
        }
    })
    .catch((error) =>{
        alert("unsuccessful, error"+error);
    });
}

btn_login.addEventListener('click',loginData);

