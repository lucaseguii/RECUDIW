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
        const missatgeDiv = $("#missatgeDiv");
        const nom = $("#name").val();
        const descripcio = $("#description").val();
        const preu = parseFloat($("#price").val());
        const categoria = $("#category").val();
        const fileInput = $("#image")[0];
        const file = fileInput.files[0];

        missatgeDiv.text("").css("color", "");

        if (!nom) {
            missatgeDiv.text("Has de ficar el nom del plat").css("color", "red");
            return;
        }
        if (!descripcio) {
            missatgeDiv.text("Has de ficar una descripció").css("color", "red");
            return;
        }
        if (isNaN(preu) || preu <= 0) {
            missatgeDiv.text("Has de ficar un preu vàlid i positiu").css("color", "red");
            return;
        }
        if (!categoria) {
            missatgeDiv.text("Has de seleccionar una categoria").css("color", "red");
            return;
        }
        if (file) {
            const tipusImatge = ["image/jpeg", "image/png", "image/jpg"];
            if (!tipusImatge.includes(file.type)) {
                missatgeDiv.text("La imatge ha de ser jpeg, png o jpg").css("color", "red");
                return;
            }
        }
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
      missatgeDiv.text("Plat actualitzat be").css("color", "green");
      setTimeout(function () {
        window.location.href = "../views/plats.html";
                }, 1200);
    } catch (error) {
      console.error("Error", error);
      missatgeDiv.text("Plat no actualitzat: " + error.message).css("color", "red");
    } 
    }
    if (file) {
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