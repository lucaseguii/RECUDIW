  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut  } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js"
  import { getFirestore, collection, addDoc, getDocs} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js"

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

      try {
        const usersfb = await getDocs(collection(db, "users"));
    
        if (usersfb.empty) {
          console.log("No hi ha cap usuari");
    
          const superusuari = await createUserWithEmailAndPassword(auth, superUsuariEmail, superUsuariPassword);
    
          await addDoc(collection(db, "users"), {
            email: superUsuariEmail,
            password: superUsuariPassword,
            rol: "superusuari"
          });
    
          console.log("Superusuari creat");
        } else {
          console.log("Jahi ha es superusuari");
        }
      } catch (error) {
        console.error("Error en crear superusuari:", error);
      }
};

export const iniciarSessio = async (email, password) => {
  try {
    const usercheck = await signInWithEmailAndPassword(auth, email, password);
    console.log("Inici de sessio be", usercheck.user);
    window.location.href = "../views/gestio.html";
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getUsuaris = async () => {
  try {
    const firebaseUsers = await getDocs(collection(db, "users"));
    const usuaris = [];
    firebaseUsers.forEach((doc) => {
      usuaris.push({ id: doc.id, ...doc.data() });
    });
    return usuaris;
  } catch (error) {
    console.error("Error obtenint usuaris:", error);
    return [];
  }
};

export const crearUsuari = async (email, password, rol) => {
  try {
    const userCreate = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCreate.user;
    await addDoc(collection(db, "users"), {
      email: email,
      password: password,
      rol: rol,
    });

    console.log("Usuari creat be:", user.email);
  } catch (error) {
    console.error("Error en crear usuari:", error);
  }
};

export const checkIfUserIsLogin = (callback) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      callback(true, user);
    } else {
      callback(false, null);
    }
  });
};

export const tancarSessio = async () => {
  try {
    await signOut(auth);
    console.log("Sessió tancada");
    window.location.href = "../src/index.html";
  } catch (error) {
    console.error("Error", error);
  }
};
