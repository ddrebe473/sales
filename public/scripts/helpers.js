const validateToken = async (token) => {
    const rawResponse = await fetch(
        'http://localhost:8080/api/users/validate?token='+token
    );

    const res = await rawResponse.json();

    console.log('checking token', res);

    return res.isValid
};