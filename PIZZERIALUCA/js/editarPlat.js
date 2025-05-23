import { editarPlat, getPlats,getCategories } from "./firebase.js";
$(document).ready(async () => {
       const categories = await getCategories();
    const $categorySelect = $("#category");
    $categorySelect.empty();
    $categorySelect.append('<option value="" disabled>Selecciona una categoria</option>');
    categories.forEach(cat => {
        $categorySelect.append(`<option value="${cat.nom}">${cat.nom}</option>`);
    });

    const params = new URLSearchParams(window.location.search);
    const platId = params.get("id");

  if (platId) {
    try {
      const plats = await getPlats();
      const plat = plats.find((p) => p.id === platId);
    if (plat) {
        $("#name").val(plat.nom);
        $("#description").val(plat.descripcio);
        $("#price").val(plat.preu);
        $("#imatge").val(plat.imatge);
        $("#category").val(plat.categoria);

      }
    } catch (error) {
      console.error("Error carregant plat:", error);
    }
  }

  $("#edit-plat-btn").on("click", async (e) => {
    e.preventDefault();

    const updatedPlat = {
        nom: $("#name").val(),
        descripcio: $("#description").val(),
        preu: $("#price").val(),
        imatge: $("#imatge").val(),
        categoria: $("#category").val(),
    };
    try {
      await editarPlat(platId, updatedPlat);
      alert("Plat actualitzat be");
      window.location.href = "../views/plats.html";
    } catch (error) {
      console.error("Error", error);
      alert("Plat no actualitzat");
    }  });
});