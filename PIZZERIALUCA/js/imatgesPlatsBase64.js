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
        const price = parseFloat($("#price").val());
        const category = $("#category").val();
        const fileInput = $("#image")[0];
        const file = fileInput.files[0];
        const missatgeDiv = $("#missatgeDiv");

        missatgeDiv.text("").css("color", "");

        if (!platName) {
            missatgeDiv.text("Has de ficar el nom del plat").css("color", "red");
            return;
        }
        if (!description) {
            missatgeDiv.text("Has de ficar una descripcio").css("color", "red");
            return;
        }
        if (isNaN(price) || price <= 0) {
            missatgeDiv.text("Has de ficar un preu vàlid i positiu").css("color", "red");
            return;
        }
        if (!category) {
            missatgeDiv.text("Has de seleccionar una categoria").css("color", "red");
            return;
        }
        if (!file) {
            missatgeDiv.text("Has de pujar una imatge").css("color", "red");
            return;
        }
        const tipusImatge = ["image/jpeg", "image/png", "image/jpg"];
        if (!tipusImatge.includes(file.type)) {
            missatgeDiv.text("La imatge ha de ser jpeg, png o jpg").css("color", "red");
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
                missatgeDiv.text("Error al crear el plat: " + (error.message || "")).css("color", "red");
            }
        };
        reader.readAsDataURL(file);
    });
});