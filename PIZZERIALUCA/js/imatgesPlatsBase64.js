import {} from "./firebase.js";

$(document).ready(function(){
    const fileInput = $("#imatge-plats")[0];
    const file = fileInput.files[0];
    const missatgeDiv = $(".missatge");

    if(platName && file){
        const tipusImatge = ["image/jpeg", "image/png", "image/jpg"];
        if (!tipusImatge.includes(file.type)) {
            missatgeDiv.text("La imatge ha de ser jpeg-png-jpg").css("color", "red");
            return;
        }
        const reader = new FileReader();
        reader.onload = async function(event){
            const base64image = event.target.result;
            try {
                await crearPlat(platName, base64image);
                $("#plat-name").val("");
                $("#imatge-plats").val("");
                missatgeDiv.text("Plat creat be").css("color", "green");
                setTimeout(function(){
                    window.location.href = "../views/plats.html";
                }, 1500);
        } catch (error) {
            console.log("Error plat:", error.message);
            missatgeDiv.text("Error al crear el plat").css("color", "red");
        }
    }
        reader.readAsDataURL(file);
    } else {        
        missatgeDiv.text("Has de ficar es nom i sa imatge per crear sa categoria").css("color", "red");
    }
});
