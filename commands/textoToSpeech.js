const fs = require('fs');
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

module.exports = async (client, message, now, config) => {
	if (message.body !== undefined && message.body.startsWith(`${config.prefix}tts`)) {
        
        const textToSpeech = new TextToSpeechV1({
            authenticator: new IamAuthenticator({ apikey: 'H1Ze8Pxu6M6DLH0h2vc3Y8kTAh63lQBh5F6RY-as0gOe' }),
            serviceUrl: 'https://api.us-south.text-to-speech.watson.cloud.ibm.com/instances/e1469ea5-b26e-4ae3-9912-6a6abd95a6b2'
          });
          
          const params = {
            text: message.body.slice(5).normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
            voice: 'pt-BR_IsabelaVoice', // Optional voice
            accept: 'audio/wav'
          };
            
          textToSpeech
            .synthesize(params)
            .then(async response => {
                const audio =  await response.result;
                return await textToSpeech.repairWavHeaderStream(audio);
            })
            .then(async repairedFile => {
                await fs.writeFileSync('temp/audio.mp3', repairedFile);
                console.log('audio.wav written with a corrected wav header');

                await client.sendFile(message.from, "temp/audio.mp3", message.id, null, true, false, true);
            })
            .catch(err => {
                console.log(err);
            });

          

    }
}