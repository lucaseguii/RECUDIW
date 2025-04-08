import { createSuperUsuari, iniciarSessio  } from './firebase.js';

$(document).ready(function() {
    createSuperUsuari();

$('#login-btn').on('click', function () {
    const email = $('#email').val();
    const password = $('#password').val();

    iniciarSessio(email, password);
});
});
