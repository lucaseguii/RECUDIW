import { iniciarSessio  } from './firebase.js';

$('#login-btn').on('click', function (e) {
    e.preventDefault();
    const email = $('#email').val();
    const password = $('#password').val();

    iniciarSessio(email, password);
});
 