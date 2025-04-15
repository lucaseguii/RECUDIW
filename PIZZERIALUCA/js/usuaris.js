import { getUsuaris } from "./firebase.js";

$(document).ready(async () => {
    const usuaris = await getUsuaris();
  
    if (usuaris.length > 0) {
      usuaris.forEach((usuari) => {
        const row = `
          <tr>
            <td class="px-4 py-2 text-[#1E7040]">${usuari.email}</td>
            <td class="px-4 py-2 text-[#1E7040] hidden md:table-cell">${usuari.password}</td>
            <td class="px-4 py-2 text-[#1E7040] hidden md:table-cell">${usuari.rol}</td>
            <td class="px-4 py-2">
              <button class="material-symbols-outlined buttons-admin">edit</button>
              <button class="material-symbols-outlined buttons-admin">delete</button>
            </td>
          </tr>
        `;
        $("table tbody").append(row);
      });
    } else {
      $("table tbody").append('<tr><td colspan="4" class="text-center">No hi ha usuaris</td></tr>');
    }
  });