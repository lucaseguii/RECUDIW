import { getCategories } from "./firebase.js";

$(document).ready(async function () {
    const categorySelect = $("#category");
    try {
        const categoriesList = await getCategories();
        categoriesList.forEach((category) => {
            categorySelect.append(new Option(category.nom, category.id));
        });
    } catch (error) {
        console.error("Error ", error.message);
    }
});