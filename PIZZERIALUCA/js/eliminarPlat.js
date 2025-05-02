import { eliminarPlat } from "./firebase.js";
import { eliminarPlat } from "./firebase.js";

$(document).ready(() => {
  $("table").on("click", "#delete-plat-btn", async function () {
    const platId = $(this).data("platid");
    console.log("Plat ID:", platId);
    if (confirm("Segur que vols eliminar aquest plat?")) {
      try {
        await eliminarUsuari(platId);
        alert("Plat eliminat be");
        location.reload();
      } catch (error) {
        console.error("Error eliminant plat", error);
        alert("No sha pogut eliminar plat");
      }
    }
  });
});