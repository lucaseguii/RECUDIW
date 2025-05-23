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
    const article = document.createElement("article");
    article.className = `
        flex flex-col items-center bg-white rounded-xl shadow-lg overflow-hidden p-4
        hover:scale-105 transition-transform duration-200  w-48 max-w-[12rem]
    `;
    article.innerHTML = `
        <img src="${plat.imatge}" alt="${plat.nom}" 
            class="w-28 h-28 object-cover rounded-full mb-4 border-4 border-[#A62735] shadow" />
        <h3 class="text-xl font-bold text-[#A62735] mb-2 text-center">${plat.nom}</h3>
        <p class="text-[#1E7040] mb-2 text-center">${plat.descripcio || ""}</p>
        <span class="text-lg font-semibold text-[#A62735]">${plat.preu ? plat.preu + " €" : ""}</span>
    `;
    container.appendChild(article);
});
});