const https = require('https');

const data = JSON.stringify({
    email: "test_auto@gmail.com",
    password: "password123",
    prenom: "Test",
    nom: "Auto",
    genre: "femme"
});

const options = {
    hostname: 'hypnotherapy-app.vercel.app',
    port: 443,
    path: '/api/register',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`);

    res.on('data', d => {
        process.stdout.write(d);
    });
});

req.on('error', error => {
    console.error(error);
});

req.write(data);
req.end();
