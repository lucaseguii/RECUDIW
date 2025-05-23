import { editarCategoria, getCategories } from "./firebase.js";

$(document).ready(async () => {
    const params = new URLSearchParams(window.location.search);
    const categoriaId = params.get("id");
    let categoriaActual = null;

    if (categoriaId) {
        try {
            const categories = await getCategories();
            categoriaActual = categories.find((c) => c.id === categoriaId);
            if (categoriaActual) {
                $("#categoria-name").val(categoriaActual.nom);
            }
        } catch (error) {
            console.error("Error cargant categories:", error);
        }
    }

    $("#categoria-imatge").on("change", function () {
        const file = this.files[0];
        if (file) {
            const tipusImatge = ["image/jpeg", "image/png", "image/jpg"];
            if (!tipusImatge.includes(file.type)) {
                $(".missatge").text("La imatge ha de ser jpeg-png-jpg").css("color", "red");
                $("#imatge-preview").empty();
                return;
            }
            const reader = new FileReader();
            reader.onload = function (event) {
                $("#imatge-preview").html(`<img src="${event.target.result}" alt="Preview" class="w-24 h-24 object-cover rounded">`);
            };
            reader.readAsDataURL(file);
        } else {
            $("#imatge-preview").empty();
        }
    });

    $("#edit-categoria-btn").on("click", async (e) => {
        e.preventDefault();
        const missatgeDiv = $(".missatge");
        const nom = $("#categoria-name").val();
        const fileInput = $("#categoria-imatge")[0];
        const file = fileInput.files[0];

        let imatgeFinal = categoriaActual ? categoriaActual.imatge : "";

        if (file) {
            const tipusImatge = ["image/jpeg", "image/png", "image/jpg"];
            if (!tipusImatge.includes(file.type)) {
                missatgeDiv.text("La imatge ha de ser jpeg-png-jpg").css("color", "red");
                return;
            }
            const reader = new FileReader();
            reader.onload = async function (event) {
                imatgeFinal = event.target.result;
                await guardarCategoria(nom, imatgeFinal, categoriaId, missatgeDiv);
            };
            reader.readAsDataURL(file);
        } else {
            await guardarCategoria(nom, imatgeFinal, categoriaId, missatgeDiv);
        }
    });

    async function guardarCategoria(nom, imatge, categoriaId, missatgeDiv) {
        try {
            await editarCategoria(categoriaId, { nom, imatge });
            missatgeDiv.text("Categoria actualitzada be").css("color", "green");
            setTimeout(() => {
                window.location.href = "../views/categories.html";
            }, 1200);
        } catch (error) {
            console.error("Error", error);
            missatgeDiv.text("Categoria no actualitzada").css("color", "red");
        }
    }
});