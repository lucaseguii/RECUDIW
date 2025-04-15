import { checkIfUserIsLogin } from "./firebase.js";

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
      }
    });
});