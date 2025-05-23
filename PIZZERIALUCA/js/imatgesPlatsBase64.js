import { crearPlat, getCategories } from "./firebase.js";

$(document).ready(async function () {
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
        const platName = $("#name").val();
        const description = $("#description").val();
        const price = $("#price").val();
        const category = $("#category").val();
        const fileInput = $("#image")[0];
        const file = fileInput.files[0];
        const missatgeDiv = $(".missatge");

        if (platName && description && price && category && file) {
            const tipusImatge = ["image/jpeg", "image/png", "image/jpg"];
            if (!tipusImatge.includes(file.type)) {
                missatgeDiv.text("La imatge ha de ser jpeg-png-jpg").css("color", "red");
                return;
            }
            const reader = new FileReader();
        reader.onload = async function (event) {
    const base64Image = event.target.result;
    try {
        await crearPlat(platName, description, price, base64Image, category);
        $("#name").val("");
        $("#description").val("");
        $("#price").val("");
        $("#category").val("");
        $("#image").val("");
        missatgeDiv.text("Plat creat bé").css("color", "green");
        setTimeout(function () {
            window.location.href = "../views/plats.html";
        }, 1500);
    } catch (error) {
        console.log("Error plat:", error.message);
        missatgeDiv.text("Error al crear el plat").css("color", "red");
    }
};
            reader.readAsDataURL(file);
        } else {
            missatgeDiv.text("Has de ficar es nom, descripció, preu, categoria i imatge per crear es plat").css("color", "red");
        }
    });
});