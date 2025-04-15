import { crearUsuari } from "./firebase.js";

$(document).ready(function() {
    $("#create-user-btn").on("click", async (e) => {
      e.preventDefault();
      const email = $("#email").val();
      const password = $("#password").val();
      const rol = $("#role").val();
      if (email && password && rol) {
        try {
          await crearUsuari(email, password, rol);
          $("#email").val("");
          $("#password").val("");
        } catch (error) {
          console.log("Error crear usuari:", error.message);
        }
      } else {
        console.log("Tots els inputs han de estar completats");
      }});
  });