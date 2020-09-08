// external packages
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

//whatson
const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');

const assistant = new AssistantV2({
    authenticator: new IamAuthenticator({ apikey: process.env.WATSONASSISTANT_APIKEY }),
    serviceUrl: 'https://gateway.watsonplatform.net/assistant/api/',
    version: '2018-09-19'
  });

// Start the webapp
const webApp = express();

// Webapp settings
webApp.use(bodyParser.urlencoded({
    extended: true
}));
webApp.use(bodyParser.json());

// Server Port
const PORT = process.env.PORT;

// Home route
webApp.get('/', (req, res) => {
    res.send(`Hello World.!`);
});

const WA = require('../helper-function/whatsapp-send-message');

let session_id;

// Route for WhatsApp
webApp.post('/whatsapp', async (req, res) => {

    let message = req.body.Body;
    let senderID = req.body.From;

    console.log(message);
    console.log(senderID);

    console.log(req.body);

    const session = async (assistantId) => {
        const response = await assistant.createSession({
            assistantId: assistantId
        })

    return response.result.session_id;
}
    console.log(session_id);
    if(!session_id) 
         session_id = await session(process.env.WATSONASSISTANT_ID);

    const response = await assistant.message({
        input: { text: message },
        assistantId: process.env.WATSONASSISTANT_ID,
        sessionId: session_id,
    });

    WA.sendMessage(JSON.stringify(response.result.output.generic[0].text),senderID);

});

// Start the server
webApp.listen(PORT, () => {
    console.log(`Server is up and running at ${PORT}`);
});
