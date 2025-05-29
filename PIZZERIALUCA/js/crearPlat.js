import { crearPlat, getCategories } from "./firebase.js";


$(document).ready( async function () {
  const categorySelect = $("#category");
  try {
    const categoriesList = await getCategories();
    categoriesList.forEach((category) => {
      categorySelect.append(new Option(category.nom, category.nom));
    });
  } catch (error) {
    console.error("Error al cargar las categorías:", error.message);
  }

  $("#create-plat-btn").on("click", async (e) => {
    e.preventDefault();
    const nom = $("#name").val();
    const descripcio = $("#description").val();
    const preu = parseFloat($("#price").val());
    const imatge = $("#image").val(); 
    const categoria = $("#category").val();
    const missatgeDiv = $(".missatge");

  missatgeDiv.text("").css("color", "");

if (!nom) {
  missatgeDiv.text("Has de ficar el nom del plat").css("color", "red");
  return;
}
if (!descripcio) {
  missatgeDiv.text("Has de ficar una descripcio").css("color", "red");
  return;
}
if (isNaN(preu) || preu <= 0) {
  missatgeDiv.text("Has de ficar un preu vàlid i positiu").css("color", "red");
  return;
}
if (!imatge) {
  missatgeDiv.text("Has de pujar una imatge").css("color", "red");
  return;
}
if (!categoria) {
  missatgeDiv.text("Has de seleccionar una categoria").css("color", "red");
  return;
}

      try {
        await crearPlat(nom, descripcio, preu, imatge, categoria);
        console.log("Plat creat correctament:", nom);
        $("#name").val("");
        $("#description").val("");
        $("#price").val("");
        $("#image").val("");
        $("#category").val("");
        missatgeDiv.text("Plat creat be").css("color", "green"); 
        setTimeout(function () {
          window.location.href = "../views/plats.html";
        }, 1500);      
    } catch (error) {
      console.error("Error crear plat:", error.message);
      missatgeDiv.text("Error al crear plat: " + (error.message || "")).css("color", "red");
    }
  });
});