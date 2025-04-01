import { registerUser, saveUser } from "./firebase.js";

const signupForm = document.getElementById("signup-form");
const errorMessage = document.getElementById("error-signup-message");

function addEvenentListenerToSignUp(){
    signupForm.addEventListener("submit", async (e) =>{
        e.preventDefault();
        errorMessage.innerText = "";
        const email = signupForm['signup-email'].value;
        const password = signupForm['signup-password'].value;
        console.log(email, password);

        const res = await registerUser(email, password)

        if(res.code == undefined){
            //register OK
            console.log(res.user.uid);

            saveUser({uid: res.user.uid, email})
            .then((res) => { //retorna id usuari si ok o no
                console.log(res);
            });

        } else {
            //register FAILED
            console.log(res.message);
            errorMessage.innerText = res.message;
        }
        console.log(res);
    });


}


window.addEventListener("DOMContentLoaded", () =>{
    addEvenentListenerToSignUp();
});