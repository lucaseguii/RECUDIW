// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut  } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js"
  import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, updateDoc, query, where } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js"

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

export const eliminarUsuari = async (userId) => {
  try {
    console.log("Intentant eliminar usuari amb ID:", userId);
    const userDocRef = doc(db, "users", userId);
    await deleteDoc(userDocRef);
    console.log("Usuari eliminat correctament");
  } catch (error) {
    console.error("Error eliminant usuari:", error);
  }
};

export const editarUsuari = async (userId, updatedUser) => {
  try {
    const userDocRef = doc(db, "users", userId);
    await updateDoc(userDocRef, updatedUser);
    console.log("Usuari actualitzat be");
  } catch (error) {
    console.error("Error", error);
  }
};


//plats
export const getPlats = async () => {
  try {
    const firebasePlats = await getDocs(collection(db, "plats"));
    const plats = [];
    firebasePlats.forEach((doc) => {
      plats.push({ id: doc.id, ...doc.data() });
    });
    return plats;
  } catch (error) {
    console.error("Error obtenint plats:", error);
    return [];
  }
};
export const crearPlat = async (nom, descripcio, preu, imatge, categoria) => {
  try {
    await addDoc(collection(db, "plats"), {
      nom: nom,
      descripcio: descripcio,
      preu: preu,
      imatge: imatge,
      categoria: categoria,
    });
    console.log("Plat creat be:", nom);
  } catch (error) {
    console.error("Error en crear plat:", error);
  }
};

export const eliminarPlat = async (platId) => {
  try {
    console.log("Intentant eliminar plat amb ID:", platId);
    const platDocRef = doc(db, "plats", platId);
    await deleteDoc(platDocRef);
    console.log("plat eliminat be");
  } catch (error) {
    console.error("Error eliminant plat:", error);
  }
};
export const getPlatsPerCategoria = async (nomCategoria) => {
  try {
    const referenciaPlats = collection(db, "plats");
    const consulta = query(referenciaPlats, where("categoria", "==", nomCategoria));
    const resultat = await getDocs(consulta);
    const llistaPlats = [];
    resultat.forEach((doc) => {
      llistaPlats.push({ id: doc.id, ...doc.data() });
    });
    return llistaPlats;
  } catch (error) {
    console.error("Error agafant plats:", error);
    return [];
  }
};
//categories
export const getCategories = async () => {
  try {
    const firebaseCategories = await getDocs(collection(db, "categories"));
    const categories = [];
    firebaseCategories.forEach((doc) => {
      categories.push({ id: doc.id, ...doc.data() });
    });
    return categories;
  } catch (error) {
    console.error("Error obtenint categories:", error);
    return [];
  }
};

export const crearCategoria = async (nom, imatge) => {
  try {
    await addDoc(collection(db, "categories"), {
      nom: nom,
      imatge: imatge
    });
  } catch (error) {
    console.error("Error en crear categoria:", error);
  }
};