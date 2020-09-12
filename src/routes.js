const routes = require('express').Router();
const watson = require('./helper-function/watson-assistant');
const whatsapp = require('./helper-function/whatsapp-send-message');

let session_id;

routes.post('/whatsapp', async (req, res) => {

    let message = req.body.Body;
    let senderID = req.body.From;
    
    console.log(req.body);

    session_id = session_id || await watson.session(process.env.WATSONASSISTANT_ID);

    console.log(session_id);

    const response = await watson.assistant.message({
        input: { text: message },
        assistantId: process.env.WATSONASSISTANT_ID,
        sessionId: session_id,
    });
    
    var bot_response = "";

    
    /*
    if (JSON.stringify(response.result.output.generic[0].text) != '""') {
        console.log(response.result.output.generic[0]);
        bot_response += response.result.output.generic[0].text;
    }

    if (JSON.stringify(response.result.output.generic[1].text) != 'null') {
        console.log(response.result.output.generic[1]);
        bot_response += response.result.output.generic[1].text;
    }
    */

    if (response.result.output.generic) {
        if (response.result.output.generic[0].text === '') {
            bot_response = response.result.output.generic[1].text;
        } else {
            bot_response = response.result.output.generic[0].text;
        }
    }


    console.log(JSON.stringify(response.result));
    whatsapp.sendMessage(bot_response,senderID);
});

module.exports = routes;
