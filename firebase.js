// Import Firebase (CDN version)
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js"></script>

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPe4ASrLe8rs_qQpkUcQTEWpOhuNx-O7I",
  authDomain: "book-management-app-1ace7.firebaseapp.com",
  projectId: "book-management-app-1ace7",
  storageBucket: "book-management-app-1ace7.appspot.com",
  messagingSenderId: "767771209960",
  appId: "1:767771209960:web:b969435eb1f4aab862195d",
  databaseURL: "https://book-management-app-1ace7-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
