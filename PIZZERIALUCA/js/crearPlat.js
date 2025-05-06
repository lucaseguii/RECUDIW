import { crearPlat } from "./firebase.js";

$(document).ready(function () {
  $("#create-plat-btn").on("click", async (e) => {
    e.preventDefault();
    const nom = $("#name").val();
    const descripcio = $("#description").val();
    const preu = parseFloat($("#price").val());
    const imatge = $("#image").val(); 
    const categoria = $("#category").val();

    if (nom && descripcio && preu && imatge && categoria) {
      try {
        await crearPlat(nom, descripcio, preu, imatge, categoria);
        console.log("Plat creat correctament:", nom);
        $("#name").val("");
        $("#description").val("");
        $("#price").val("");
        $("#image").val("");
        $("#category").val("");
      } catch (error) {
        console.error("Error crear plat:", error.message);
      }
    } else {
      console.log("Tots es camps ficats.");
    }
  });
});