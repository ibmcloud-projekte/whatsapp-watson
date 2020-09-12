//whatson
const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');

const assistant = new AssistantV2({
    authenticator: new IamAuthenticator({ apikey: process.env.WATSONASSISTANT_APIKEY }),
    serviceUrl: 'https://gateway.watsonplatform.net/assistant/api/',
    version: '2018-09-19'
});

const session = async (assistantId) => {
    const response = await assistant.createSession({
        assistantId: assistantId
    })
    return response.result.session_id;
}

module.exports = {
    assistant,
    session
}