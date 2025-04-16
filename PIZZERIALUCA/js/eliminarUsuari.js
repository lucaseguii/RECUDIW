import { eliminarUsuari } from "./firebase.js";

$(document).ready(() => {
  $("#delete-user-btn").on("click", async function () {
    const userId = $(this).data("userid");
    if (confirm("Estàs segur que vols eliminar aquest usuari?")) {
      try {
        await eliminarUsuari(userId);
        alert("Usuari eliminat correctament.");
        location.reload();
      } catch (error) {
        console.error("Error eliminant l'usuari:", error);
        alert("No s'ha pogut eliminar l'usuari. Si us plau, torna-ho a intentar.");
      }
    }
  });
});