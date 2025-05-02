import { getPlats } from "./firebase.js";

$(document).ready(async () => {
    const plats = await getPlats();
  
    if (plats.length > 0) {
        plats.forEach((plat) => {
        console.log(plat.id);
        const row = `  
          <tr>
            <td class="px-4 py-2 text-[#1E7040]">${plat.nom}</td>
            <td class="px-4 py-2 text-[#1E7040] hidden md:table-cell">${plat.preu}</td>
            <td class="px-4 py-2 text-[#1E7040] hidden md:table-cell">${plat.categoria}</td>
            <td class="px-4 py-2">
              <button class="material-symbols-outlined buttons-admin edit-user-btn" data-userid="${plat.id}">edit</button>
              <button class="material-symbols-outlined buttons-admin " id="delete-user-btn" data-userid="${plat.id}">delete</button>
            </td>
          </tr>
        `;
        $("table tbody").append(row);
      });
      $(".edit-plat-btn").on("click", function () {
        const platId = $(this).data("platid");
        window.location.href = `../views/editarPlat.html?id=${platId}`;
      });
    } else {
      $("table tbody").append('<tr><td colspan="4" class="text-center">No hi ha plats</td></tr>');
    }
  });