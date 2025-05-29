import { crearUsuari } from "./firebase.js";

$(document).ready(function() {
    $("#create-user-btn").on("click", async (e) => {
      e.preventDefault();
      const email = $("#email").val();
      const password = $("#password").val();
      const rol = $("#role").val();
      const missatgeDiv = $(".missatge");

      missatgeDiv.text("").css("color", "");
      if(email === ""){
        missatgeDiv.text("Has de ficar un email").css("color", "red")
      return;
      }
      if(password === ""){
        missatgeDiv.text("Has de ficar una contrassenya").css("color", "red")
      return;
      }   
      if(password.length < 6){
        missatgeDiv.text("La contrassenya ha tenir 6 caracters minim").css("color", "red");
        return;
    } 
      try {
        await crearUsuari(email, password, rol);
      missatgeDiv.text("Usuari creat be.").css("color", "green")
        $("#email").val("");
        $("#password").val("");
        setTimeout(function () {
          window.location.href = "../views/usuaris.html";
        }, 1500);
      } catch (error) {
        console.log("Error crear usuari:", error.message);
            if (error.code === "auth/email-already-in-use") {
            missatgeDiv.text("Aquest email ja està registrat.").css("color", "red");
            } else {
            missatgeDiv.text("Error al crear usuari: " + error.message).css("color", "red");
            }
      }
    });
  });