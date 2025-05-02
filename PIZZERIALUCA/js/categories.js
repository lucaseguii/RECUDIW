import { getCategories } from "./firebase.js";

$(document).ready(async () => {
    const categories = await getCategories();
  
    if (categories.length > 0) {
        categories.forEach((categoria) => {
        console.log(categoria.id);
        const row = `  
          <tr>
            <td class="px-4 py-2 text-[#1E7040]">${categoria.nom}</td>
        `;
        $("table tbody").append(row);
      });
    } else {
      $("table tbody").append('<tr><td colspan="4" class="text-center">No hi ha categories</td></tr>');
    }
  });