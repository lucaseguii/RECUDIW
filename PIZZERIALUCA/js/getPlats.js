import { getPlatsPerCategoria } from "./firebase.js";

function getCategoriaNom() {
    const params = new URLSearchParams(window.location.search);
    return params.get("nom");
}

document.addEventListener("DOMContentLoaded", async () => {
    const nomCategoria = getCategoriaNom();
    document.getElementById("categoria-title").textContent = nomCategoria;

    const plats = await getPlatsPerCategoria(nomCategoria);
    const container = document.getElementById("plats-container");
    container.innerHTML = "";

    plats.forEach(plat => {
            console.log("imatge:", plat.imatge);
        const article = document.createElement("article");
        article.className = "block h-[250px] w-[180px] relative bg-white rounded shadow p-4";
                article.innerHTML = `
                        <img src="${plat.imatge}" alt="${plat.nom}" class="h-24 w-24 object-cover rounded mb-2" />
            <h3 class="text-xl font-bold mb-2">${plat.nom}</h3>
            <p class="mb-2">${plat.descripcio || ""}</p>
            <span class="font-semibold text-[#A62735]">${plat.preu ? plat.preu + " €" : ""}</span>
        `;
        container.appendChild(article);
    });
});