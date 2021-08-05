const { decryptMedia } = require("@open-wa/wa-decrypt");
const { uploadByBuffer } = require("telegraph-uploader");

const stringFormatter = require("../libs/stringFormatter");

const fetch = require("node-fetch");
const fs = require("fs");
const bt = require("buffer-type");


module.exports = async (client, message, now, config) => {
    if (message.body.startsWith(`${config.prefix}meme`)) {
        if ((message.isMedia || (message.quotedMsgObj !== null && message.quotedMsgObj.type === "image")) && message.body.length >= 2) {
            const messageTrim = message.body.slice(6).normalize("NFD").replace(/[\u0300-\u036f]/g, "");

            const filter = /^[\w|\w_ ]||[#||?||%\w#||?||%|#||?||%\w#||?||%]*$/gi;


            if (messageTrim.length <= 50 && messageTrim.match(filter)) {
                const top = messageTrim.split("|")[0];
                const bottom = messageTrim.split("|")[1];
                const encryptMedia = message.quotedMsgObj.type === "image" ? message.quotedMsgObj : message;
                const mediaData = await decryptMedia(encryptMedia, config.userAgent);
                const getUrl = await uploadImages(mediaData);
                const ImageBase64 = await custom(getUrl, top, bottom);
                client.sendFile(message.from, ImageBase64.url, "image.png", "", null, true);
                console.log("\x1b[32m", `[LOG] Meme gerado em ${Date.now() - now}ms`);
            } else {
                client.reply(message.from, "Texto grande ou inválido", message.id);
            }
        } else {
            client.reply(message.from, "Apenas imagem", message.id);
        }
    }
};

function custom(imageUrl, top, bottom) {
    return new Promise((resolve, reject) => {
        const topText = stringFormatter(top);
        const bottomText = stringFormatter(bottom);
        fetch(`https://api.memegen.link/images/custom/${topText}/${bottomText}.png?background=${imageUrl}`)
            .then(result => resolve(result))
            .catch(err => {
                console.error(err);
                reject(err);
            });
    });
}

function uploadImages(buffData) {
    return new Promise((resolve, reject) => {
        let fileExtension;
        try {
            const { extension } = bt(buffData);
            fileExtension = extension;
        } catch {
            fileExtension = ".jpg";
        }
        const filePath = `${process.cwd()}/src/temp/tmp${fileExtension}`;

        fs.writeFile(filePath, buffData, error => {
            if (error) return reject(error);
            console.log("\x1b[33m", "[LOG] Enviando imagem para o servidor telegra.ph...");
            const fileData = fs.readFileSync(filePath);
            uploadByBuffer(fileData, "image/jpg")
                .then(result => {
                    const { link } = result;
                    resolve(link);
                })
                .catch(error => {
                    console.error(error);
                    reject(error);
                });
        });
    });
}
