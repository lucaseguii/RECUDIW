import { tancarSessio } from "../js/firebase.js";

$(document).ready(function () {
    $("#logout-menu-btn").on("click", function () {
      tancarSessio();
    });
  });