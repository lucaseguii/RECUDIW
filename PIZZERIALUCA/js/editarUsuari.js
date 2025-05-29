import { editarUsuari, getUsuaris } from "./firebase.js";
$(document).ready(async () => {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get("id");

  if (userId) {
    try {
      const usuaris = await getUsuaris();
      const usuari = usuaris.find((u) => u.id === userId);
    if (usuari) {
        $("#email").val(usuari.email);
        $("#password").val(usuari.password);
        $("#role").val(usuari.rol);
      }
    } catch (error) {
      console.error("Error carregant usuari:", error);
    }
  }

  $("#edit-user-btn").on("click", async (e) => {
       e.preventDefault();

        const email = $("#email").val();
        const password = $("#password").val();
        const rol = $("#role").val();
        const missatgeDiv = $("#missatgeDiv");

        missatgeDiv.text("").css("color", "");
        if (email === "") {
            missatgeDiv.text("Has de ficar un email").css("color", "red");
            return;
        }
        if (password === "") {
            missatgeDiv.text("Has de ficar una contrassenya").css("color", "red");
            return;
        }
        if (password.length < 6) {
            missatgeDiv.text("La contrassenya ha de tenir 6 caràcters mínim").css("color", "red");
            return;
        }
    const updatedUser = {
      email: $("#email").val(),
      password: $("#password").val(),
      rol: $("#role").val(),
    };
    try {
      await editarUsuari(userId, updatedUser);
         missatgeDiv.text("Usuari actualitzat be").css("color", "green");
        setTimeout(function () {
        window.location.href = "../views/usuaris.html";
            }, 1200);
    } catch (error) {
       console.error("Error", error);
       missatgeDiv.text("Usuari no actualitzat: " + error.message).css("color", "red");
        }
  });
});