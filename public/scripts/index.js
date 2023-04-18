let loggedIn = false;

const getUser = () => {
    const user = sessionStorage.getItem('sessionUser');

    return user;
};

const toLogin = () => {
    window.location.href = '/login.html';
};

const onLoad = () => {
    const curUser = getUser();
    if (
        !curUser ||
        !curUser.token ||
        !curUser.expireDate ||
        new Date(curUser.expireDate) < new Date()
    ) {
        toLogin();
    }
};
onLoad();