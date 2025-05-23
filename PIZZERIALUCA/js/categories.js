import { getCategories } from "./firebase.js";

$(document).ready(async () => {
    const categories = await getCategories();
  
    if (categories.length > 0) {
        categories.forEach((categoria) => {
        console.log(categoria.id);
        const row = `  
          <tr>
            <td class="px-4 py-2 text-[#1E7040]">${categoria.nom}</td>
              <td class="px-4 py-2">
              <button class="material-symbols-outlined buttons-admin edit-categoria-btn" data-categoriaid="${categoria.id}">edit</button>
              <button class="material-symbols-outlined buttons-admin delete-categoria-btn" data-categoriaid="${categoria.id}">delete</button>
            </td>
        `;
        $("table tbody").append(row);
      });
      $(".edit-categoria-btn").on("click", function () {
        const categoriaId = $(this).data("categoriaid");
        window.location.href = `../views/editarCategoria.html?id=${categoriaId}`;
      });
    } else {
      $("table tbody").append('<tr><td colspan="4" class="text-center">No hi ha categories</td></tr>');
    }

      $("table").on("click", ".delete-categoria-btn", async function () {
    const categoriaId = $(this).data("categoriaid");
    console.log("Categoria ID:", categoriaId);
    if (confirm("Segur que vols eliminar aquesta categoria?")) {
      try {
        await eliminarCategoria(categoriaId);
        alert("Categoria eliminada be");
        location.reload();
      } catch (error) {
        console.error("Error eliminant la categoria", error);
        alert("No s'ha pogut eliminar la ctaegoria");
      }
    }
  });
  });