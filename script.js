
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";

// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore, collection, doc, getDocs, query, orderBy, addDoc, serverTimestamp, onSnapshot} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

const username = prompt("Please enter a username:");

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBtsu9J5QIKVxy5MgBxhCudyi7ZjO4jk1k",
    authDomain: "instant-messenger-da3d9.firebaseapp.com",
    projectId: "instant-messenger-da3d9",
    storageBucket: "instant-messenger-da3d9.appspot.com",
    messagingSenderId: "1026832140594",
    appId: "1:1026832140594:web:48e95a21de36b67728ef2b"
};

// Initialize Firebase12
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const chatReference = collection(db, "chat")
const q = query(chatReference, orderBy("timestamp"));
onSnapshot(q, (querySnapshot) => {
    $("#messages").html("")
    querySnapshot.forEach((doc) => {

        $("#messages").append(`
            <p>
                <b>${doc.data().author}</b>: ${doc.data().message}
            </p>`);
    });
});


$("#send-button").click(
    async function ()  {
        let message = $("#input").val();
        $("#input").val("");

        if (message === "") {
            return;
        }
        console.log(message);

        await addDoc(chatReference, {
            message: message,
            timestamp: serverTimestamp(),
            author: username

        });

    }
);

