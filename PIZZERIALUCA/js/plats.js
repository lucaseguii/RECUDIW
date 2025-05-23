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
              <button class="material-symbols-outlined buttons-admin edit-plat-btn" data-platid="${plat.id}">edit</button>
              <button class="material-symbols-outlined buttons-admin delete-plat-btn" data-platid="${plat.id}">delete</button>
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
    
    $("table").on("click", ".delete-plat-btn", async function () {
    const platId = $(this).data("platid");
    console.log("Plat ID:", platId);
    if (confirm("Segur que vols eliminar aquest plat?")) {
      try {
        await eliminarPlat(platId);
        alert("Plat eliminat be");
        location.reload();
      } catch (error) {
        console.error("Error eliminant plat", error);
        alert("No s'ha pogut eliminar plat");
      }
    }
  });
  });