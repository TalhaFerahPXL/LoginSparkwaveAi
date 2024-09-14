const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();

app.use(cors({
    origin: 'http://localhost:63342',
    credentials: true
}));

app.use(session({
    secret: 'geheime_sleutel',
    resave: false,
    saveUninitialized: true
    //cookie: { httpOnly: true, secure: true }
}));

app.use(bodyParser.json());


const { OAuth2Client } = require('google-auth-library');

//CLIENT DELETED IN GOOGLE CONSOLE
const CLIENT_ID = '';

const client = new OAuth2Client(CLIENT_ID);

app.post('/store-token', async (req, res) => {
    const { token } = req.body;
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,
        });
        const payload = ticket.getPayload();


        let email = payload.email
        let name = payload.name

        req.session.token = token;
        req.session.name = name;
        req.session.email = email;
        req.session.isGoogleUser = true;
        req.session.profilePicture = payload.picture;


        res.send({status: 'succes', email: `${email}`, name: `${name}`});
    } catch (error) {

        console.error('Token verificatie fout:', error);
        res.status(401).send({status: 'Token is ongeldig'});
    }
});



const secretKey = 'sleutelqsqdfqdvqdfqdfqdfqdfsdmldslflskdfnsjlfn';

app.post('/store-apiToken', async (req, res) => {
    const { token } = req.body;

    try {

        const decoded = jwt.verify(token, secretKey);

        if (decoded) {
            req.session.token = token
            req.session.email = decoded.sub;
            req.session.name = decoded.name;
            req.session.isVerified = decoded.isVerified;
            req.session.isGoogleUser = false;

            res.send({status: 'success'});
        } else {
            throw new Error('invalid token');
        }

    } catch (error) {

        res.status(500).send({status: 'Fout bij het opslaan van e-mail in sessie'});
    }
});




app.get('/dashboard', (req, res) => {
    if (req.session.name && req.session.email) {
        res.json({name: req.session.name, email: req.session.email, profilePicture: req.session.profilePicture, isVerified: req.session.isVerified, isGoogleUser: req.session.isGoogleUser });
    } else {
        res.status(404).json({error: 'Geen gebruikersinformatie gevonden'});
    }
});



app.listen(3000, () => {
    console.log('Server draait op port 3000');
});



//check login status
app.get('/loginStatus', (req, res) => {
    console.log('LoginStatus route bereikt, token:', req.session.token);
    if (req.session.token) {
        res.redirect('http://localhost:63342/LoginInAi/Html/Dashboard.html');
    } else {
        res.status(401).send('Gebruiker is niet ingelogd');
    }
});


//Uitloggen
app.get('/logout', (req, res) => {

    // delete req.session.token;
    // delete req.session.name;
    // delete req.session.email;
    // delete req.session.profilePicture;


    req.session.destroy();

    res.redirect('../index.html');
});


app.post('/updateVerification', (req, res) => {
    if (req.session) {
        req.session.isVerified = true;
        res.send({ status: 'success', message: 'Verificatiestatus bijgewerkt.' });
    } else {
        res.status(400).send({ status: 'error', message: 'Sessie niet gevonden.' });
    }
});



// app.get('/dashboard', (req, res) => {
//     if (req.session.token) {
//         // Er is een geldige sessie
//         res.sendFile(__dirname + '/public/dashboard.html');
//     } else {
//         // Geen geldige sessie
//         res.redirect('/');
//     }
// });
