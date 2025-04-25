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

    const updatedUser = {
      email: $("#email").val(),
      password: $("#password").val(),
      rol: $("#role").val(),
    };
    try {
      await editarUsuari(userId, updatedUser);
      alert("Usuari actualitzat be");
      window.location.href = "../views/usuaris.html";
    } catch (error) {
      console.error("Error", error);
      alert("Usuari no actualitzat");
    }
  });
});