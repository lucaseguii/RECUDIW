import { checkIfUserIsLogin } from "./firebase.js";
const paginesBloquetjades = [
  "/views/gestio.html",
  "/views/usuaris.html",
  "/views/plats.html",
  "/views/categories.html"

];

$(document).ready(function () {
    checkIfUserIsLogin((isLoggedIn, user) => {
      if (isLoggedIn) {
        $("#login-menu-btn").hide();
        $("#logout-menu-btn").show();
        $("#gestio-menu-btn").show();
        console.log("Usuari:", user.email);
      } else {
        $("#login-menu-btn").show();
        $("#logout-menu-btn").hide();
        $("#gestio-menu-btn").hide();
        console.log("Ningu ha iniciat sessio");
        if (paginesBloquetjades.includes(window.location.pathname)) {
          window.location.href = "../views/login.html";
        }
      }
    });
});