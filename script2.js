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

// // References
var username = document.getElementById("new_username");
var password = document.getElementById("new_password");
var btn_insert = document.getElementById("btn_insert");
var btn_select = document.getElementById("btn_select");
var btn_update = document.getElementById("btn_update");
var btn_delete = document.getElementById("btn_delete");
var btn_all = document.getElementById("btn_all");

// INSERT DATA
function insertData(){

    set(ref(db,"User/"+username.value),{
        password: password.value
      
    })
    .then(()=>{
        location.reload(); 
        alert("data stored successfully");
       
    })
    .catch((error)=>{
        alert("unsccessful, error" + error);
    })
   
}


// SELECT DATA 
function selectData(){
    
    const dbref = ref(db);
    get(child(dbref,"User/"+username.value)).then((snapshot) =>{
        if(snapshot.exists()){
    
            let usernames = username.value
            let passwords = snapshot.val().password;
            
            alert(passwords);
            showIteminList(usernames, passwords)
        }
        else{
            alert("No data found!");
            
        }
    })
    .catch((error) =>{
        alert("unsuccessful, error"+error);
    });
}

function removeAll(){
    document.getElementById("lists").innerHTML = "";
}
function showIteminList(username, password){
    removeAll()
    addItemToList(username, password)
}
let userNo = 0;
function addItemToList(username, password){
   
    var ul = document.getElementById('lists');
    var header = document.createElement('h2');

    var _username = document.createElement('li');
    var _password = document.createElement('li');
    
    header.innerHTML = 'User-'+(++userNo);



    _username.innerHTML = 'Username: '+username;
    _password.innerHTML = 'Password: '+password;
   
    ul.appendChild(header);
    ul.appendChild(_username);
    ul.appendChild(_password);    
    ul.appendChild(_password);

}

// UPDATE DATA 
function updateData(){
    update(ref(db,"User/"+username.value),{
        password: password.value,

    })
    .then(()=>{
        alert("data update successfully");
        location.reload();
        
    })
    .catch((error)=>{
        alert("unsccessful, error" + error);
    })
}

//DELETE DATA
function deleteData(){
    remove(ref(db,"User/"+username.value))
    .then(()=>{
        alert("data delete successfully");
        location.reload();
    })
    .catch((error)=>{
        alert("unsccessful, error" + error);
    })
}

function selectAll(){
    
    const dbRef = ref(db, 'User/');
    onValue(dbRef, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const childKey = childSnapshot.key;       
            let user_password = childSnapshot.val().password;
           

            addItemToList(childKey, user_password);
            // window.addEventListener('load',FetchAllData)
        });
    }, {
    onlyOnce: true
    });
    
}
btn_insert.addEventListener('click',insertData);
btn_select.addEventListener('click',selectData);
btn_update.addEventListener('click',updateData);
btn_delete.addEventListener('click',deleteData);
btn_all.addEventListener('click',selectAll);