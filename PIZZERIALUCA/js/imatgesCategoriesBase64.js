import { crearCategoria } from "./firebase.js";

$(document).ready(function () {
    $("#create-categoria-btn").on("click", async (e) => {
        e.preventDefault();
        const categoryName = $("#categoria-name").val();
        const fileInput = $("#categoria-imatge")[0];
        const file = fileInput.files[0];
        const missatgeDiv = $(".missatge");

        if (categoryName && file) {
            const tipusImatge = ["image/jpeg", "image/png", "image/jpg"];
            if (!tipusImatge.includes(file.type)) {
                missatgeDiv.text("La imatge ha de ser jpeg-png-jpg").css("color", "red");
                return;
            }
            const reader = new FileReader();
            reader.onload = async function (event) {
                const base64Image = event.target.result;
                try {
                    await crearCategoria(categoryName, base64Image);
                    $("#categoria-name").val("");
                    $("#categoria-imatge").val("");
                    missatgeDiv.text("Categoria creada be").css("color", "green");
                    setTimeout(function () {
                        window.location.href = "../views/categories.html";
                    }, 1500);
                } catch (error) {
                    console.log("Error categoria:", error.message);
                    missatgeDiv.text("Error al crear la categoria").css("color", "red");
                }
            };
            reader.readAsDataURL(file);
        } else {
            missatgeDiv.text("Has de ficar es nom i sa imatge per crear sa categoria").css("color", "red");
        }
    });
});