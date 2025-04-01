  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js"
  import { getFirestore,collection, addDoc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js"

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
  // https://firebase.google.com/docs/web/learn-more
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyChAtuTfJECFRAA3nB_dfER6W-d1kSqxcA",
    authDomain: "auth-15a29.firebaseapp.com",
    projectId: "auth-15a29",
    storageBucket: "auth-15a29.firebasestorage.app",
    messagingSenderId: "643311861389",
    appId: "1:643311861389:web:f7651a66329fb4607d2cc4"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

const db = getFirestore(app);


export const registerUser = async (email, password) => {
    try{
        return await createUserWithEmailAndPassword(auth, email, password);  
    } catch(error){
        // console.log(error.code);
        // console.log(error.message);

        if(error.code == "auth/missing-password"){
           error.message = "Has d entrar una contrasenya"; 
        }
        return error;
    }

};

export const saveUser = async (user)=>{
    try{
        const docRef = await addDoc(collection(db, "users"),user);
        return docRef.id;
    } catch (error){
        return error;
    }

}