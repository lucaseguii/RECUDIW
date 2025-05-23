import { getCategories } from "./firebase.js";

document.addEventListener("DOMContentLoaded", async () => {
    const categories = await getCategories();
    const container = document.getElementById("categories-container");
    container.innerHTML = "";

    categories.forEach(categoria => {
        const article = document.createElement("article");
article.className = "block h-[200px] relative cursor-pointer hover:scale-101 transition-transform";            
article.addEventListener("click", () => {
            window.location.href = `categoria.html?nom=${encodeURIComponent(categoria.nom)}`;
        });
        const imgDiv = document.createElement("div");
        imgDiv.className = "h-[200px] w-[100%] bg-cover bg-center absolute -z-10 brightness-50";
        imgDiv.style.backgroundImage = `url('${categoria.imatge}')`;
        const nameDiv = document.createElement("div");
        nameDiv.className = "h-[200px] text-white flex items-center justify-center font-bold";
        nameDiv.textContent = categoria.nom;
        article.appendChild(imgDiv);
        article.appendChild(nameDiv);
        container.appendChild(article);
    });
});