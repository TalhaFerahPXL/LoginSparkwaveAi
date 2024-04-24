const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: 'http://localhost:63342',
    credentials: true
}));

app.use(session({
    secret: 'jouw_geheime_sleutel',
    resave: false,
    saveUninitialized: true
}));

app.use(bodyParser.json());


const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = '298907679587-e0jaohumttmmfceiqml4q3olpb5ksd2v.apps.googleusercontent.com';

const client = new OAuth2Client(CLIENT_ID);

app.post('/store-token', async (req, res) => {
    const { token } = req.body;
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,
        });
        const payload = ticket.getPayload();

        localStorage.setItem("sessionId", session)
        req.session.token = token;
        req.session.name = payload.name;
        req.session.email = payload.email;
        req.session.profilePicture = payload.picture;


        res.send({status: 'Token en gebruikersinformatie opgeslagen!'});
    } catch (error) {

        console.error('Token verificatie fout:', error);
        res.status(401).send({status: 'Token is ongeldig'});
    }
});






app.get('/dashboard', (req, res) => {
    if (req.session.name && req.session.email) {
        res.json({name: req.session.name, email: req.session.email, profilePicture: req.session.profilePicture });
    } else {
        res.status(404).json({error: 'Geen gebruikersinformatie gevonden'});
    }
});



app.listen(3000, () => {
    console.log('Server draait op port 3000');
});

