import { crearCategoria } from "./firebase.js";

$(document).ready(function () {
    $("#create-categoria-btn").on("click", async (e) => {
      e.preventDefault();
      const categoryName = $("#categoria-name").val();
      const categoryImage = $("#categoria-imatge").val();
      if (categoryName, categoryImage) {
        try {
          await crearCategoria(categoryName);
          console.log("Categoria creada be", categoryName);
          $("#name").val("");
          $("#imatge").val("");
    const missatgeDiv = $(".missatge");

    missatgeDiv.text("").css("color", "");
    
        missatgeDiv.text("Categoria creada be").css("color", "green"); 
        setTimeout(function () {
          window.location.href = "../views/categories.html";
        }, 1500);        
      } catch (error) {
          console.log("Error categoria:", error.message);
        }} else {
            console.log("El nom de la categoria ha de estar complet");
          }
        });
      });