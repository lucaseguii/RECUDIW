import { auth } from './firebase.js';

export const checkUserIfIsLogin = () => {

    const user = auth.currentUser;

    if (user) {
      $('#logout-menu-btn').show();
      $('#login-menu-btn').hide();
    } else {
      $('#login-menu-btn').hide();
      $('#logout-menu-btn').show();
    }

    onAuthStateChanged(auth, (user) => {
        checkUserIfIsLogin();
    });
};