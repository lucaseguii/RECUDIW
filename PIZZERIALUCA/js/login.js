import { iniciarSessio  } from './firebase.js';

$('#login-btn').on('click', async function (e) {
    e.preventDefault();
    const email = $('#email').val();
    const password = $('#password').val();
    const missatgeDiv = $(".missatge");

    missatgeDiv.text("").css("color", "");
    if (email === "" ) {
        missatgeDiv.text("Has de ficar el email per iniciar sessio").css("color", "red");
        return;
    }
    if (password === "" ) {
        missatgeDiv.text("Has de ficar la contrassenya per iniciar sessio").css("color", "red");
        return;
    }
    if(password.length < 6){
        missatgeDiv.text("La contrassenya ha de ser minim de 6 caracters").css("color", "red");
        return;
    }

    try{
        await iniciarSessio(email, password);
        missatgeDiv.text("Inici de sessio be").css("color", "green");
    }catch (error) {
        console.error("Error al iniciar sessio:", error);
        missatgeDiv.text("Error al iniciar sessio: " + error.message).css("color", "red");
    }
});
 