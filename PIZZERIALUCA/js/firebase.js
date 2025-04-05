  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js"
  import { getFirestore, collection, addDoc} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js"

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyC_oel5PAsezMyQqTlvKE4RBU8oUhbccBE",
    authDomain: "pizzerialuca-932ed.firebaseapp.com",
    projectId: "pizzerialuca-932ed",
    storageBucket: "pizzerialuca-932ed.firebasestorage.app",
    messagingSenderId: "47294516850",
    appId: "1:47294516850:web:d2819417a255040dcc3ceb"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const auth = getAuth(app);
  
  const db = getFirestore(app);


  export const createSuperUsuari = async () =>{
      const superUsuariEmail = "superusuari@gmail.com";
      const superUsuariPassword = "super1234";

      try{
        const superUsuari = await signInWithEmailAndPassword(auth, superUsuariEmail, superUsuariPassword);
        console.log("Existeix es superusuari")
      }catch (error){
        if (error.code === "auth/user-not-found") {

          const superUsuari = await createUserWithEmailAndPassword(auth, superUsuariEmail, superUsuariPassword);
          console.log("UID del superusuari:", superUsuari.user.uid);

          const docSuperUsuari = await addDoc(collection(db, "users"), {
            email: superUsuariEmail,
            rol: "superusuari",
          });
          console.log("Superusuari creat", superUsuariEmail);
          
      } else {
          console.log("error");
      }
  }
}
  
