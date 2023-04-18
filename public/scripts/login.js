const login = async () => {
    let userInput = document.getElementById('username').value;
    let passInput = document.getElementById('pass').value;
    console.log('login info: ', userInput, passInput);

    const rawResponse = await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userKey: userInput,
            passKey: passInput,
        }),
    });
    const content = await rawResponse.json();

    sessionStorage.setItem('sessionUser', content);
    window.location.href = '/index.html';

    console.log(content);
};

const goToSignUp = () => {
    window.location.href = '/register.html';
};
