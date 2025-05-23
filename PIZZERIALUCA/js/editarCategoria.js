import { editarCategoria, getCategories} from "./firebase.js";

$(document).ready(async()=>{
const params = new URLSearchParams(window.location.search);
const categoriaId = params.get("id");
if (categoriaId) {
    try{
        const categories = await getCategories();
        const categoria = categories.find((c) => c.id === categoriaId);
        if(categoria){
            $("#categoria-name").val(categoria.nom);
            $("#categoria-imatge").val(categoria.imatge);
        }
        } catch(error){
            console.error("Error cargant categories:", error);
        }
    }
    $("#edit-categoria-btn").on("click", async (e) =>{
        e.preventDefault();
        const updatedcategoria = {
            nom: $("#categoria-name").val(),
            imatge:$("#categoria-imatge").val(),
        };
        try{
            await editarCategoria(categoriaId, updatedcategoria);
            alert("Categoria acutalizada be")
            window.location.href = "../views/categories.html";
        } catch(error){
            console.error("Error", error);
            alert("Categoria no actualitzada");
        }
    })
});