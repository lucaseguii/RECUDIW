import { eliminarUsuari } from "./firebase.js";

$(document).ready(() => {
  $("table").on("click", "#delete-user-btn", async function () {
    const userId = $(this).data("userid");
    console.log("User ID:", userId);
    if (confirm("Segur que vols eliminar aquest usuari?")) {
      try {
        await eliminarUsuari(userId);
        alert("Usuari eliminat be");
        location.reload();
      } catch (error) {
        console.error("Error eliminant lusuari", error);
        alert("No sha pogut eliminar usuari");
      }
    }
  });
});