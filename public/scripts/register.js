const signUp = async () => {
    //get the data from the inputs
    let userInput = document.getElementById('createUser').value;
    let passInput = document.getElementById('createPassword').value;
    let passInputCheck = document.getElementById('createPasswordTwo').value;

    console.log(userInput, passInput, passInputCheck);
    if (userInput.length < 5) {
        alert('Username must be at least 5 characters long');
        return;
    }
    if (passInput.length < 4) {
        alert('Password must be at least 4 characters long');
        return;
    }

    if (passInputCheck != passInput) {
        alert("passwords don't match");
        return;
    }

    //send data to the backend/server
    const rawResponse = await fetch(
        'http://localhost:8080/api/users/register',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: userInput,
                password: passInput,
            }),
        }
    );
    const response = await rawResponse.json();

    if (rawResponse.status == 200) {
        alert("User was created")
        window.location.href = '/login.html';
        return
    }else{
        alert(response.err ?? "error creating user");
    }
};
