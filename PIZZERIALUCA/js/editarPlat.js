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
        $("#category").val(plat.categoria);
        $("#edit-plat-btn").data("imatge-base64", plat.imatge);
      }
    } catch (error) {
      console.error("Error carregant plat:", error);
    }
  }

  $("#edit-plat-btn").on("click", async (e) => {
    e.preventDefault();
 const fileInput = $("#image")[0];
    const file = fileInput.files[0];

    const updatePlat = async (imatgeBase64) => {
      const updatedPlat = {
        nom: $("#name").val(),
        descripcio: $("#description").val(),
        preu: $("#price").val(),
        imatge: imatgeBase64,
        categoria: $("#category").val(),
      };
      try{
      await editarPlat(platId, updatedPlat);
      alert("Plat actualitzat be");
      window.location.href = "../views/plats.html";
    } catch (error) {
      console.error("Error", error);
      alert("Plat no actualitzat");
    } 
    }
    if (file) {
      const tipusImatge = ["image/jpeg", "image/png", "image/jpg"];
      if (!tipusImatge.includes(file.type)) {
        alert("La imatge ha de ser jpeg-png-jpg");
        return;
      }
      const reader = new FileReader();
      reader.onload = async function (event) {
        const base64Image = event.target.result;
        await updatePlat(base64Image);
      };
      reader.readAsDataURL(file);
    } else {
      const imatgeBase64 = $("#edit-plat-btn").data("imatge-base64");
      await updatePlat(imatgeBase64);
    }  
    });  
});