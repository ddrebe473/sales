let loggedIn = false;

const getUser = () => {
    const user = sessionStorage.getItem('sessionUser');

    return JSON.parse(user);
};

const toLogin = () => {
    window.location.href = '/login.html';
};

const onLoad = async () => {
    const curUser = getUser();
    console.log('curUser: ', curUser);
    if (!curUser || !curUser.token) {
        toLogin();
    }
    let isValid = await validateToken(curUser.token);
    if (!isValid) {
        toLogin();
        console.log('valid: ', isValid);
    }
};
onLoad();
