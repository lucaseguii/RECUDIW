import { getUsuaris, eliminarUsuari } from "./firebase.js";

$(document).ready(async () => {
    const usuaris = await getUsuaris();
  
    if (usuaris.length > 0) {
      usuaris.forEach((usuari) => {
        console.log(usuari.id);
        const row = `  
          <tr>
            <td class="px-4 py-2 text-[#1E7040]">${usuari.email}</td>
            <td class="px-4 py-2 text-[#1E7040] hidden md:table-cell">${usuari.password}</td>
            <td class="px-4 py-2 text-[#1E7040] hidden md:table-cell">${usuari.rol}</td>
            <td class="px-4 py-2">
              <button class="material-symbols-outlined buttons-admin edit-user-btn" data-userid="${usuari.id}">edit</button>
              <button class="material-symbols-outlined buttons-admin " id="delete-user-btn" data-userid="${usuari.id}">delete</button>
            </td>
          </tr>
        `;
        $("table tbody").append(row);
      });
      $(".edit-user-btn").on("click", function () {
        const userId = $(this).data("userid");
        window.location.href = `../views/editarUsuari.html?id=${userId}`;
      });
    } else {
      $("table tbody").append('<tr><td colspan="4" class="text-center">No hi ha usuaris</td></tr>');
    }

      $("table").on("click", "#delete-user-btn", async function () {
    const userId = $(this).data("userid");
    console.log("User ID:", userId);
    if (confirm("Segur que vols eliminar aquest usuari?")) {
      try {
        await eliminarUsuari(userId);
        alert("Usuari eliminat be");
        location.reload();
      } catch (error) {
        console.error("Error eliminant lusuari", error);
        alert("No sha pogut eliminar usuari");
      }
    }
  });
  });